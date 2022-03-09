import {getLegend} from "../../../../../shared/utils/src/utils";

const defaultLegends = [
    {
        color: "#D3D3D3",
        name: "N/A",
        isDefault: true,
    },
    {
        color: "#FFFFFF",
        name: "No Data",
        isDefault: true,
    },
];

const data = {
    top: {
        id: "GSae40Fyppf",
        name: "",
        type: "programIndicator",
        label: "Age at visit",
        weight: 100,
        legends: [
            {
                id: "SY4tuTddbCM",
                name: "Target Reached",
                color: "#417505",
                endValue: "100",
                startValue: "66",
            },
            {
                id: "bkxF00ckdGJ",
                name: "Average",
                color: "#f8e71c",
                endValue: "66",
                startValue: "33",
            },
            {
                id: "IUxld2dBVwE",
                name: "Poor Performance",
                color: "#d0021b",
                endValue: "33",
                startValue: "0",
            },
        ],
        highIsGood: true,
        showColors: true,
        displayName: "Age at visit",
        effectiveGap: 5,
        displayArrows: true,
    },
};

const targetOnLevelsData = {
    id: "Uvn6LCg7dVU",
    name: "ANC 1 Coverage",
    type: "indicator",
    label: "ANC 1 Coverage",
    weight: 100,
    legends: {
        H1KlN4QIauv: [
            {
                id: "Target Reached/ On Track",
                name: "Target Reached/ On Track",
                color: "",
                endValue: "100",
                startValue: "90",
            },
            {
                id: "Progress, but more effort required",
                name: "Progress, but more effort required",
                color: "",
                endValue: "90",
                startValue: "60",
            },
            {
                id: "Not on track",
                name: "Not on track",
                color: "",
                endValue: "60",
                startValue: "0",
            },
        ],
        m9lBJogzE95: [
            {
                id: "Target Reached/ On Track",
                name: "Target Reached/ On Track",
                color: "",
                endValue: "100",
                startValue: "50",
            },
            {
                id: "Progress, but more effort required",
                name: "Progress, but more effort required",
                color: "",
                endValue: "50",
                startValue: "20",
            },
            {
                id: "Not on track",
                name: "Not on track",
                color: "",
                endValue: "20",
                startValue: "0",
            },
        ],
        tTUf91fCytl: [
            {
                id: "Target Reached/ On Track",
                name: "Target Reached/ On Track",
                color: "",
                endValue: "100",
                startValue: "66",
            },
            {
                id: "Progress, but more effort required",
                name: "Progress, but more effort required",
                color: "",
                endValue: "66",
                startValue: "33",
            },
            {
                id: "Not on track",
                name: "Not on track",
                color: "",
                endValue: "33",
                startValue: "0",
            },
        ],
        wjP19dkFeIk: [
            {
                id: "Target Reached/ On Track",
                name: "Target Reached/ On Track",
                color: "",
                endValue: "100",
                startValue: "70",
            },
            {
                id: "Progress, but more effort required",
                name: "Progress, but more effort required",
                color: "",
                endValue: "70",
                startValue: "45",
            },
            {
                id: "Not on track",
                name: "Not on track",
                color: "",
                endValue: "45",
                startValue: "0",
            },
        ],
    },
    highIsGood: true,
    showColors: true,
    displayName: "ANC 1 Coverage",
    effectiveGap: 5,
    displayArrows: true,
};

const orgUnitLevels = [
    {level: 3, id: "tTUf91fCytl", displayName: "Chiefdom"},
    {level: 2, id: "wjP19dkFeIk", displayName: "District"},
    {level: 4, id: "m9lBJogzE95", displayName: "Facility"},
    {level: 1, id: "H1KlN4QIauv", displayName: "National"},
];

describe("getLegends tests", () => {
    it("Includes the lower boundary of the last legend", () => {
        const legends = getLegend(0, data.top.legends, {
            defaultLegends,
            max: 100,
        });
        expect(legends.id).to.eq("IUxld2dBVwE");
    });
    it("Includes the higher boundary of the first legend", () => {
        const legends = getLegend(100, data.top.legends, {
            defaultLegends,
            max: 100,
        });
        expect(legends.id).to.eq("SY4tuTddbCM");
    });
    it("Observes boundaries", () => {
        let legends = getLegend(32.4, data.top.legends, {
            defaultLegends,
            max: 100,
        });
        expect(legends.id).to.eq("IUxld2dBVwE");
        legends = getLegend(32.5, data.top.legends, {defaultLegends, max: 100});
        expect(legends.id).to.eq("bkxF00ckdGJ");
        legends = getLegend(65.4, data.top.legends, {defaultLegends, max: 100});
        expect(legends.id).to.eq("bkxF00ckdGJ");
        legends = getLegend(65.5, data.top.legends, {defaultLegends, max: 100});
        expect(legends.id).to.eq("SY4tuTddbCM");
    });

    it("Returns No Data legend if value is undefined or null", () => {
        let legends = getLegend(undefined, data.top.legends, {
            defaultLegends,
            max: 100,
        });
        expect(legends.name).to.eq("No Data");
        legends = getLegend(null, data.top.legends, {defaultLegends, max: 100});
        expect(legends.name).to.eq("No Data");
    });
    it("Returns N/A legend if the value is not of type number", () => {
        const legends = getLegend("something", data.top.legends, {
            defaultLegends,
            max: 100,
        });
        expect(legends.name).to.eq("N/A");
    });

    it("Should return undefined if the value is out of given range", () => {
        const legends = getLegend(1000, data.top.legends, {
            defaultLegends,
            max: 100,
        });
        expect(legends).to.be.undefined;
    });
    it("Assigns legends based on national org unit level", () => {
        const nationalLegend = getLegend(50, targetOnLevelsData.legends, {
            max: 100,
            defaultLegends,
            orgUnitLevels,
            dataOrgUnitLevel: 1,
        });
        expect(nationalLegend?.id).to.eq("Not on track");
    });
    it("Assigns legends based on district org unit level", () => {
        const districtLegend = getLegend(50, targetOnLevelsData.legends, {
            max: 100,
            defaultLegends,
            orgUnitLevels,
            dataOrgUnitLevel: 2,
        });
        expect(districtLegend?.id).to.eq("Progress, but more effort required");
    });
    it("Assigns legends based on chiefdom org unit level", () => {
        const chiefdomLegend = getLegend(50, targetOnLevelsData.legends, {
            max: 100,
            defaultLegends,
            orgUnitLevels,
            dataOrgUnitLevel: 3,
        });
        expect(chiefdomLegend?.id).to.eq("Progress, but more effort required");
    });
    it("Assigns legends based on facility org unit level", () => {
        const facilityLegend = getLegend(50, targetOnLevelsData.legends, {
            max: 100,
            defaultLegends,
            orgUnitLevels,
            dataOrgUnitLevel: 4,
        });
        expect(facilityLegend?.id).to.eq("Target Reached/ On Track");
    });
});
