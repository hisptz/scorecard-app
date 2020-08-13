import { getSanitizedScorecard } from './get-sanitized-scorecard.helper';
const oldScorecardSample: any = require('../samples/scorecard.sample.json');
fdescribe('Get Sanitized Scorecard Helper', () => {
  it('should return an object with a key id with a value equal to the old scorecard', () => {
    expect(
      getSanitizedScorecard(oldScorecardSample, oldScorecardSample.id).id
    ).toEqual(oldScorecardSample.id);
  });
  it('should return an object with a key name with a value equal to the old scorecard header title', () => {
    expect(
      getSanitizedScorecard(oldScorecardSample, oldScorecardSample?.id).name
    ).toEqual(oldScorecardSample?.header?.title);
  });
  it('should return an object with a key title with a value equal to the old scorecard header title', () => {
    expect(
      getSanitizedScorecard(oldScorecardSample, oldScorecardSample?.id).title
    ).toEqual(oldScorecardSample?.header?.title);
  });
  it('should return an object with a key description with a value equal to the old scorecard description', () => {
    expect(
      getSanitizedScorecard(oldScorecardSample, oldScorecardSample?.id)
        .description
    ).toEqual(oldScorecardSample?.header?.description);
  });
  it('should return an object with a key description with a value equal to the old scorecard description', () => {
    expect(
      getSanitizedScorecard(oldScorecardSample, oldScorecardSample?.id)
        .description
    ).toEqual(oldScorecardSample?.header?.description);
  });
  it('should return an object key customHeader with a value equal to empty string if it is not present in old scorecard', () => {
    expect(
      getSanitizedScorecard(oldScorecardSample, oldScorecardSample?.id)
        .customHeader
    ).toEqual('');
  });
  it('should return an object  key legendDefinitions which is Array', () => {
    expect(
      getSanitizedScorecard(oldScorecardSample, oldScorecardSample?.id)
        .legendDefinitions.length
    ).toBeGreaterThanOrEqual(0);
  });
  it('should return an object  key legendDefinitions which has array of objects which contains these keys(id,color, name, default)', () => {
    const legendDefinitions = getSanitizedScorecard(
      oldScorecardSample,
      oldScorecardSample?.id
    )?.legendDefinitions;
    if (legendDefinitions.length) {
      for (const defn of legendDefinitions) {
        expect(defn.id).toBeDefined();
        expect(defn.color).toBeDefined();
        expect(defn.name).toBeDefined();
        expect(defn.default).toBeDefined();
      }
    } else {
      expect(legendDefinitions.length).toEqual(0);
    }
  });
  it('should return an object  key dataSelection which has indicatorGroups which is array', () => {
    expect(
      getSanitizedScorecard(oldScorecardSample, oldScorecardSample?.id)
        .dataSelection.indicatorGroups.length
    ).toBeGreaterThanOrEqual(0);
  });
  it('should return indicatorGroups which has array of objects contain these keys id, title, sortOrder, style, indicatorHolders', () => {
    const indicatorGroups = getSanitizedScorecard(
      oldScorecardSample,
      oldScorecardSample?.id
    )?.dataSelection.indicatorGroups;
    if (indicatorGroups.length) {
      for (const group of indicatorGroups) {
        expect(group.id).toBeDefined();
        expect(group.title).toBeDefined();
        expect(group.sortOrder).toBeDefined();
        expect(group.style).toBeDefined();
        expect(group.indicatorHolders).toBeDefined();
      }
    } else {
      expect(indicatorGroups.length).toEqual(0);
    }
  });
  it('should return an object  key orgUnitSelection which has items which is array', () => {
    expect(
      getSanitizedScorecard(oldScorecardSample, oldScorecardSample?.id)
        .orgUnitSelection.items.length
    ).toBeGreaterThanOrEqual(0);
  });
  it('should return items in orgUnitSelection which has array of objects contain these keys id, name, type', () => {
    const items = getSanitizedScorecard(
      oldScorecardSample,
      oldScorecardSample?.id
    )?.orgUnitSelection.items;
    if (items.length) {
      for (const item of items) {
        expect(item.id).toBeDefined();
        expect(item.name).toBeDefined();
        expect(item.type).toBeDefined();
      }
    } else {
      expect(items.length).toEqual(0);
    }
  });
  it(`should return an object  key options which has
     isEditable, displayOptions, isRankPositionLast, footerOptions, averageDisplayType`, () => {
    const options = getSanitizedScorecard(
      oldScorecardSample,
      oldScorecardSample?.id
    ).options;
    expect(options.isEditable).toBeDefined();
    expect(options.isRankPositionLast).toBeDefined();
    expect(options.displayOptions).toBeDefined();
    expect(options.footerOptions).toBeDefined();
    expect(options.averageDisplayType).toBeDefined();
  });
  it('should return an object  key periodSelection which has items which is array', () => {
    expect(
      getSanitizedScorecard(oldScorecardSample, oldScorecardSample?.id)
        .periodSelection.items.length
    ).toBeGreaterThanOrEqual(0);
  });
  it('should return items in periodSelection which has array of objects contain these keys id, name, type', () => {
    const items = getSanitizedScorecard(
      oldScorecardSample,
      oldScorecardSample?.id
    )?.periodSelection.items;
    if (items.length) {
      for (const item of items) {
        expect(item.id).toBeDefined();
        expect(item.name).toBeDefined();
        expect(item.type).toBeDefined();
      }
    } else {
      expect(items.length).toEqual(0);
    }
  });
  it('should return an object with a key publicAccess which is string', () => {
    const publicAccess = getSanitizedScorecard(
      oldScorecardSample,
      oldScorecardSample.id
    ).publicAccess;
    expect(typeof publicAccess).toEqual('string');
  });
  it('should return an object with a key user which has id', () => {
    const user = getSanitizedScorecard(
      oldScorecardSample,
      oldScorecardSample.id
    ).user;
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
  });
});
