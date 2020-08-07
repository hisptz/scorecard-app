import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { getSanitizedScorecard } from '../helpers/get-sanitized-scorecard.helper';
import { getScorecardListItem } from '../helpers/get-scorecard-list-item.helper';
import { ScorecardService } from './scorecard.service';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { updateMigrationStatus } from '../../store/actions/scorecard-data-migration.actions';
import {
  getMessageForMigrationProgressStatus,
  getProgressValueForMigrationProgressStatus,
} from '../helpers/conversion/get-data-for-migration-progress-status.helper';
import {
  ItemSavedResponse,
  ScorecardMigrationStage,
  ScorecardMigrationSummary,
} from '../models/scorecard-migration.model';

@Injectable({
  providedIn: 'root',
})
export class ScorecardMigrationService {
  constructor(
    private http$: HttpClient,
    private scorecardService: ScorecardService,
    private store: Store<State>
  ) {}
  getOldScorecards() {
    return this.http$
      .get('/api/dataStore/scorecards')
      .pipe(catchError((error) => throwError(error)));
  }

  createScorecardListItem(scorecard) {
    const item = getScorecardListItem(scorecard);
    return new Promise((resolve, reject) => {
      this.scorecardService
        .createScorecardListItem(item)
        .pipe(take(1))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  deleteOldScorecard(id) {
    return new Promise((resolve, reject) => {
      this.scorecardService
        .deleteOldScorecard(id)
        .pipe(take(1))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  createScorecardDetailsItem(scorecard) {
    return new Promise((resolve, reject) => {
      this.scorecardService
        .createScorecardDetailsItem(scorecard)
        .pipe(take(1))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  getOldScorecardPromise(id: string): any {
    return new Promise((resolve, reject) => {
      this.scorecardService
        .getOldScorecardById(id)
        .pipe(take(1))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  // Format all scorecard to a new format
  async getFormattedScorecard(ids: any[]) {
    // Update Progress Status on starting Format process
    this.store.dispatch(
      updateMigrationStatus({
        notificationType: 'PROGRESS',
        message: getMessageForMigrationProgressStatus(
          ScorecardMigrationStage.FORMAT_OLD_SCORECARDS
        ),
        progressValue: getProgressValueForMigrationProgressStatus(
          ScorecardMigrationStage.FORMAT_OLD_SCORECARDS
        ),
      })
    );
    const scorecardArr = [];
    const processProgressValue = Math.floor(30 / ids.length) || 0; // Calculate value to add on progress value
    let counter = 30;
    if (ids && ids.length) {
      for (const id of ids) {
        counter += processProgressValue;
        try {
          // Get Old Scorecard by ID
          const oldScorecard = await this.getOldScorecardPromise(id)
            .then((card) => card)
            .catch((err) => {
              this.updateErrorFormatSpecificScorecard(err, id, counter); // Update error status when request fails
            });
          // Get Scorecard name
          const oldScorecardName =
            oldScorecard && oldScorecard.header && oldScorecard.header.title
              ? oldScorecard.header.title
              : '';
          // Update progress on format of current scorecard
          this.store.dispatch(
            updateMigrationStatus({
              notificationType: 'PROGRESS',
              message: getMessageForMigrationProgressStatus(
                ScorecardMigrationStage.FORMAT_SPECIFIC_OLD_SCORECARD,
                oldScorecardName
              ),
              progressValue: getProgressValueForMigrationProgressStatus(
                ScorecardMigrationStage.FORMAT_SPECIFIC_OLD_SCORECARD,
                counter
              ),
            })
          );
          // Get Formatted scorecard/ new scorecard
          const newScorecard = getSanitizedScorecard(oldScorecard, id);
          if (newScorecard) {
            scorecardArr.push(newScorecard); // Add scorecard in a list of new scorecard if it's perfectly formatted
          }
        } catch (e) {
          // Update error status when there is an error in the process
          this.updateErrorFormatSpecificScorecard(e, id, counter);
        }
      }
    }
    return scorecardArr;
  }

  async formatOldScorecard(ids: any[]) {
    const summary: ScorecardMigrationSummary = {
      message: '',
      listItemsResponses: [],
      detailItemsResponses: [],
    };
    const formattedScorecards = await this.getFormattedScorecard(ids); // Get list of scorecards in a new format
    let scorecardListResponses = [];
    let scorecardDetailsResponses = [];
    if (formattedScorecards && formattedScorecards.length) {
      const processProgressValue = Math.floor(30 / (ids.length * 3)) || 0; // Calculate value to add on progress value
      let counter = 60;
      for (const scorecard of formattedScorecards) {
        const scorecardName = scorecard && scorecard.name ? scorecard.name : '';
        // Create a List Item
        const listResponse = await this.createScorecardListItem(scorecard)
          .then((item: any) => {
            const message = item && item.message ? item.message : '';
            const itemResponse: ItemSavedResponse = {
              name: scorecardName,
              status: 'SUCCESS',
              message
            };
            counter += processProgressValue;
            this.updateSaveListItemStatus(
              'PROGRESS',
              ScorecardMigrationStage.SAVE_LIST_ITEM,
              counter,
              item,
              scorecardName
            );
            summary.listItemsResponses.push(itemResponse);
            return item;
          })
          .catch((error) => {
            const message = error && error.message ? error.message : '';
            const itemResponse: ItemSavedResponse = {
              name: scorecardName,
              status: 'FAILED',
              message
            };
            counter += processProgressValue;
            this.updateSaveListItemStatus(
              'ERROR',
              ScorecardMigrationStage.ERROR_SAVE_LIST_ITEM,
              counter,
              error,
              scorecardName
            );
            summary.listItemsResponses.push(itemResponse);
            return error;
          });
          // Create a detail item
        const detailResponse = await this.createScorecardDetailsItem(scorecard)
          .then((item: any) => {
            const message = item && item.message ? item.message : '';
            const itemResponse: ItemSavedResponse = {
              name: scorecardName,
              status: 'SUCCESS',
              message
            };
            counter += processProgressValue;
            this.updateSaveDetailItemStatus(
              'PROGRESS',
              ScorecardMigrationStage.SAVE_DETAIL_ITEM,
              counter,
              item,
              scorecardName
            );
            summary.detailItemsResponses.push(itemResponse);
            return item;
          })
          .catch((error) => {
            const message = error && error.message ? error.message : '';
            const itemResponse: ItemSavedResponse = {
              name: scorecardName,
              status: 'FAILED',
              message
            };
            counter += processProgressValue;
            this.updateSaveDetailItemStatus(
              'PROGRESS',
              ScorecardMigrationStage.SAVE_DETAIL_ITEM,
              counter,
              error,
              scorecardName
            );
            summary.detailItemsResponses.push(itemResponse);
            return error;
          });


          await this.deleteOldScorecard(scorecard?.id).then((result: any) => {
            const message = result && result.message ? result.message : '';
            const itemResponse: ItemSavedResponse = {
              name: scorecardName,
              status: 'SUCCESS',
              message
            };
            counter += processProgressValue;
            this.updateSaveDetailItemStatus(
              'PROGRESS',
              ScorecardMigrationStage.DELETE_OLD_SCORECARD,
              counter,
              result,
              scorecardName
            );
            summary.detailItemsResponses.push(itemResponse);
            return result;
          }).catch((error) => {
            const message = error && error.message ? error.message : '';
            const itemResponse: ItemSavedResponse = {
              name: scorecardName,
              status: 'FAILED',
              message
            };
            counter += processProgressValue;
            this.updateSaveDetailItemStatus(
              'PROGRESS',
              ScorecardMigrationStage.ERROR_DELETE_OLD_SCORECARD,
              counter,
              error,
              scorecardName
            );
            summary.detailItemsResponses.push(itemResponse);
            return error;

          });
        scorecardListResponses = [...scorecardListResponses, listResponse];
        scorecardDetailsResponses = [
          ...scorecardDetailsResponses,
          detailResponse,
        ];
      }
    } else {
      this.updateErrorMigrationProcess();
    }
    return summary;
  }
  private updateErrorFormatSpecificScorecard(
    error: any,
    messageCustomValue?: any,
    processProgressValue?: number
  ): void {
    const message =
      error && error.message
        ? error.message
        : getMessageForMigrationProgressStatus(
            ScorecardMigrationStage.ERROR_FORMAT_SPECIFIC_OLD_SCORECARD,
            messageCustomValue
          );
    this.store.dispatch(
      updateMigrationStatus({
        notificationType: 'ERROR',
        message,
        progressValue: getProgressValueForMigrationProgressStatus(
          ScorecardMigrationStage.ERROR_FORMAT_SPECIFIC_OLD_SCORECARD,
          processProgressValue
        ),
      })
    );
  }
  private updateErrorMigrationProcess(): void {
    this.store.dispatch(
      updateMigrationStatus({
        notificationType: 'ERROR',
        message: getMessageForMigrationProgressStatus(
          ScorecardMigrationStage.ERROR_MIGRATION
        ),
        progressValue: getProgressValueForMigrationProgressStatus(
          ScorecardMigrationStage.ERROR_MIGRATION
        ),
      })
    );
  }

  updateSaveListItemStatus(
    type: string,
    stage: ScorecardMigrationStage,
    progressValue: number,
    response?: any,
    scorecardName?: string
  ) {
    if (ScorecardMigrationStage.SAVE_LIST_ITEM) {
      this.store.dispatch(
        updateMigrationStatus({
          notificationType: type,
          message: getMessageForMigrationProgressStatus(stage, scorecardName),
          progressValue: getProgressValueForMigrationProgressStatus(
            stage,
            progressValue
          ),
        })
      );
    } else {
      const message =
        response && response.message
          ? response.message
          : getMessageForMigrationProgressStatus(stage, scorecardName);
      this.store.dispatch(
        updateMigrationStatus({
          notificationType: type,
          message,
          progressValue: getProgressValueForMigrationProgressStatus(
            stage,
            progressValue
          ),
        })
      );
    }
  }
  updateSaveDetailItemStatus(
    type: string,
    stage: ScorecardMigrationStage,
    progressValue: number,
    response?: any,
    scorecardName?: string
  ) {
    if (ScorecardMigrationStage.SAVE_DETAIL_ITEM) {
      this.store.dispatch(
        updateMigrationStatus({
          notificationType: type,
          message: getMessageForMigrationProgressStatus(stage, scorecardName),
          progressValue: getProgressValueForMigrationProgressStatus(
            stage,
            progressValue
          ),
        })
      );
    } else {
      const message =
        response && response.message
          ? response.message
          : getMessageForMigrationProgressStatus(stage, scorecardName);
      this.store.dispatch(
        updateMigrationStatus({
          notificationType: type,
          message,
          progressValue: getProgressValueForMigrationProgressStatus(
            stage,
            progressValue
          ),
        })
      );
    }
  }



  private updateDeleteScorecardStatus(
    type: string,
    stage: ScorecardMigrationStage,
    progressValue: number,
    response?: any,
    scorecardName?: string
  ) {
    if (ScorecardMigrationStage.DELETE_OLD_SCORECARD) {
      this.store.dispatch(
        updateMigrationStatus({
          notificationType: type,
          message: getMessageForMigrationProgressStatus(stage, scorecardName),
          progressValue: getProgressValueForMigrationProgressStatus(
            stage,
            progressValue
          ),
        })
      );
    } else {
      const message =
        response && response.message
          ? response.message
          : getMessageForMigrationProgressStatus(stage, scorecardName);
      this.store.dispatch(
        updateMigrationStatus({
          notificationType: type,
          message,
          progressValue: getProgressValueForMigrationProgressStatus(
            stage,
            progressValue
          ),
        })
      );
    }
  }
}
