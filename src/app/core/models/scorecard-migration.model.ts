export interface ScorecardMigrationNotification {
    notificationType: string;
    message: string;
    progressValue: number;
}
export enum ScorecardMigrationStage {
    CHECK_OLD_SCORECARDS = 'CHECK_OLD_SCORECARDS',
    ERROR_LOADING_OLD_SCORECARDS = 'ERROR_LOADING_OLD_SCORECARDS',
    OLD_SCORECARDS_PRESENT = 'OLD_SCORECARDS_PRESENT',
    NONE_OLD_SCORECARD_PRESENT = 'NONE_OLD_SCORECARD_PRESENT',
    START_MIGRATION = 'START_MIGRATION',
    ERROR_MIGRATION = 'ERROR_MIGRATION',
    FORMAT_OLD_SCORECARDS = 'FORMAT_OLD_SCORECARDS',
    FORMAT_SPECIFIC_OLD_SCORECARD = 'FORMAT_SPECIFIC_OLD_SCORECARD',
    ERROR_FORMAT_SPECIFIC_OLD_SCORECARD = 'ERROR_FORMAT_SPECIFIC_OLD_SCORECARD',
    SAVE_LIST_ITEM = 'SAVE_LIST_ITEM',
    ERROR_SAVE_LIST_ITEM = 'ERROR_SAVE_LIST_ITEM',
    SAVE_DETAIL_ITEM = 'SAVE_DETAIL_ITEM',
    ERROR_SAVE_DETAIL_ITEM = 'ERROR_DETAIL_ITEM',
}
export interface ScorecardMigrationSummary {
    message: string;
    listItemsResponses?: ItemSavedResponse[];
    detailItemsResponses?: ItemSavedResponse[];
}
export interface ItemSavedResponse {
    name: string;
    status: string;
}
