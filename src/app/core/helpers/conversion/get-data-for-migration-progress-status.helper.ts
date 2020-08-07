import {ScorecardMigrationStage} from '../../models/scorecard-migration.model';

export function getMessageForMigrationProgressStatus(stage: ScorecardMigrationStage, customValue?: any): string {
    switch (stage) {
        case ScorecardMigrationStage.CHECK_OLD_SCORECARDS: {
            return 'Checking for old scorecard data';
        }
        case ScorecardMigrationStage.ERROR_LOADING_OLD_SCORECARDS: {
            return 'There was an error while loading old scorecards';
        }
        case ScorecardMigrationStage.NONE_OLD_SCORECARD_PRESENT: {
            return 'There is no old scorecard present';
        }
        case ScorecardMigrationStage.OLD_SCORECARDS_PRESENT: {
            const numberOfOldScorecards = customValue && typeof customValue === 'number' ? customValue : 0;
            return `There are ${numberOfOldScorecards} old scorecards present`;
        }
        case ScorecardMigrationStage.START_MIGRATION: {
            return 'Scorecard data migration process has started';
        }
        case ScorecardMigrationStage.ERROR_MIGRATION: {
            return 'Scorecards data for migration are missing, Exiting migration process...';
        }
        case ScorecardMigrationStage.FORMAT_OLD_SCORECARDS: {
            return 'Converting old scorecards data to a new format';
        }
        case ScorecardMigrationStage.FORMAT_SPECIFIC_OLD_SCORECARD: {
            const scorecardName = customValue && typeof customValue === 'string' ? customValue : '';
            return `Formatting scorecard ${scorecardName}`;
        }
        case ScorecardMigrationStage.ERROR_FORMAT_SPECIFIC_OLD_SCORECARD: {
            const id = customValue ? customValue : '';
            return `There is no data in Scorecard with id ${id}`;
        }
        case ScorecardMigrationStage.SAVE_LIST_ITEM: {
            const scorecardName = customValue && typeof customValue === 'string' ? customValue : '';
            return `Scorecard ${scorecardName} saved in List items`;
        }
        case ScorecardMigrationStage.SAVE_DETAIL_ITEM: {
            const scorecardName = customValue && typeof customValue === 'string' ? customValue : '';
            return `Scorecard ${scorecardName} saved in Detail items`;
        }
        case ScorecardMigrationStage.ERROR_SAVE_LIST_ITEM: {
            const scorecardName = customValue && typeof customValue === 'string' ? customValue : '';
            return `Saving list item '${scorecardName}' failed, migration continues with other scorecards...`;
        }
        case ScorecardMigrationStage.ERROR_SAVE_DETAIL_ITEM: {
            const scorecardName = customValue && typeof customValue === 'string' ? customValue : '';
            return `Saving detail item '${scorecardName}' failed, migration continues with other scorecards...`;
        }
        case ScorecardMigrationStage.DELETE_OLD_SCORECARD: {
            const scorecardName = customValue && typeof customValue === 'string' ? customValue : '';
            return `Deleted scorecard '${scorecardName}' from old scorecard list`;
        }
        case ScorecardMigrationStage.ERROR_DELETE_OLD_SCORECARD: {
            const scorecardName = customValue && typeof customValue === 'string' ? customValue : '';
            return `Deleting scorecard '${scorecardName}' from old scorecard list failed`;
        }
        case ScorecardMigrationStage.END_MIGRATION: {
            return 'The migration process has ended, Please see the process summary';
        }
        default: {
            return 'Scorecard data migration is in progress';
        }
    }
}
export function getProgressValueForMigrationProgressStatus(stage: ScorecardMigrationStage, customValue?: number ): number {
    switch (stage) {
        case ScorecardMigrationStage.CHECK_OLD_SCORECARDS: {
            return 0;
        }
        case ScorecardMigrationStage.ERROR_LOADING_OLD_SCORECARDS: {
            return -1;
        }
        case ScorecardMigrationStage.NONE_OLD_SCORECARD_PRESENT: {
            return 100;
        }
        case ScorecardMigrationStage.OLD_SCORECARDS_PRESENT: {
            return 10;
        }
        case ScorecardMigrationStage.START_MIGRATION: {
            return 20;
        }
        case ScorecardMigrationStage.ERROR_MIGRATION: {
            return 100;
        }
        case ScorecardMigrationStage.FORMAT_OLD_SCORECARDS: {
            return 30;
        }
        case ScorecardMigrationStage.END_MIGRATION: {
            return 100;
        }
        default: {
            return customValue || 0;
        }
    }
}
