import { scorecardDataMigrationReducer, initialState } from './scorecard-data-migration.reducer';

xdescribe('ScorecardDataMigration Reducer', () => {
  describe('an unknown action', () => {
    xit('should return the previous state', () => {
      const action = {} as any;

      const result = scorecardDataMigrationReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
