import { ScorecardMigrationStage } from '../../models/scorecard-migration.model';

export function getMessageForMigrationProgressStatus(
  stage: ScorecardMigrationStage,
  customValue?: any
): string {
  let message = '';
  const scorecardName =
    customValue && typeof customValue === 'string' ? customValue : '';
  switch (stage) {
    case ScorecardMigrationStage.CHECK_OLD_SCORECARDS: {
      message = 'Checking for old scorecard data';
      break;
    }
    case ScorecardMigrationStage.ERROR_LOADING_OLD_SCORECARDS: {
      message = 'There was an error while loading old scorecards';
      break;
    }
    case ScorecardMigrationStage.NONE_OLD_SCORECARD_PRESENT: {
      message = 'There is no old scorecard present';
      break;
    }
    case ScorecardMigrationStage.OLD_SCORECARDS_PRESENT: {
      const numberOfOldScorecards =
        customValue && typeof customValue === 'number' ? customValue : 0;
      message = `There are ${numberOfOldScorecards} old scorecards present`;
      break;
    }
    case ScorecardMigrationStage.START_MIGRATION: {
      message = 'Scorecard data migration process has started';
      break;
    }
    case ScorecardMigrationStage.ERROR_MIGRATION: {
      message =
        'Scorecards data for migration are missing, Exiting migration process...';
      break;
    }
    case ScorecardMigrationStage.FORMAT_OLD_SCORECARDS: {
      message = 'Converting old scorecards data to a new format';
      break;
    }
    case ScorecardMigrationStage.FORMAT_SPECIFIC_OLD_SCORECARD: {
      message = `Formatting scorecard ${scorecardName}`;
      break;
    }
    case ScorecardMigrationStage.ERROR_FORMAT_SPECIFIC_OLD_SCORECARD: {
      const id = customValue ? customValue : '';
      message = `There is no data in Scorecard with id ${id}`;
      break;
    }
    case ScorecardMigrationStage.SAVE_LIST_ITEM: {
      message = `Scorecard ${scorecardName} saved in List items`;
      break;
    }
    case ScorecardMigrationStage.SAVE_DETAIL_ITEM: {
      message = `Scorecard ${scorecardName} saved in Detail items`;
      break;
    }
    case ScorecardMigrationStage.ERROR_SAVE_LIST_ITEM: {
      message = `Saving list item '${scorecardName}' failed, migration continues with other scorecards...`;
      break;
    }
    case ScorecardMigrationStage.ERROR_SAVE_DETAIL_ITEM: {
      message = `Saving detail item '${scorecardName}' failed, migration continues with other scorecards...`;
      break;
    }
    case ScorecardMigrationStage.DELETE_OLD_SCORECARD: {
      message = `Deleted scorecard '${scorecardName}' from old scorecard list`;
      break;
    }
    case ScorecardMigrationStage.ERROR_DELETE_OLD_SCORECARD: {
      message = `Deleting scorecard '${scorecardName}' from old scorecard list failed`;
      break;
    }
    case ScorecardMigrationStage.END_MIGRATION: {
      message =
        'The migration process has ended, Please see the process summary';
      break;
    }
    default: {
      message = 'Scorecard data migration is in progress';
      break;
    }
  }
  return message;
}
export function getProgressValueForMigrationProgressStatus(
  stage: ScorecardMigrationStage,
  customValue?: number
): number {
  let progressValue = 0;
  switch (stage) {
    case ScorecardMigrationStage.CHECK_OLD_SCORECARDS: {
      progressValue = 0;
      break;
    }
    case ScorecardMigrationStage.ERROR_LOADING_OLD_SCORECARDS: {
      progressValue = -1;
      break;
    }
    case ScorecardMigrationStage.NONE_OLD_SCORECARD_PRESENT: {
      progressValue = 100;
      break;
    }
    case ScorecardMigrationStage.OLD_SCORECARDS_PRESENT: {
      progressValue = 10;
      break;
    }
    case ScorecardMigrationStage.START_MIGRATION: {
      progressValue = 20;
      break;
    }
    case ScorecardMigrationStage.ERROR_MIGRATION: {
      progressValue = 100;
      break;
    }
    case ScorecardMigrationStage.FORMAT_OLD_SCORECARDS: {
      progressValue = 30;
      break;
    }
    case ScorecardMigrationStage.END_MIGRATION: {
      progressValue = 100;
      break;
    }
    default: {
      progressValue = customValue || 0;
      break;
    }
  }
  return progressValue;
}
