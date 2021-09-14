import {getLegend} from "../../../src/shared/utils/utils";


const defaultLegends = [
    {
        color: "#D3D3D3",
        name: "N/A",
        isDefault: true,
    },
    {
        color: "#FFFFFF",
        name: "No Data",
        isDefault: true
    }
]

const data = {
    "top": {
        "id": "GSae40Fyppf",
        "name": "",
        "type": "programIndicator",
        "label": "Age at visit",
        "weight": 100,
        "legends": [
            {
                "id": "SY4tuTddbCM",
                "name": "Target Reached",
                "color": "#417505",
                "endValue": "100",
                "startValue": "66"
            },
            {
                "id": "bkxF00ckdGJ",
                "name": "Average",
                "color": "#f8e71c",
                "endValue": "66",
                "startValue": "33"
            },
            {
                "id": "IUxld2dBVwE",
                "name": "Poor Performance",
                "color": "#d0021b",
                "endValue": "33",
                "startValue": "0"
            }
        ],
        "highIsGood": true,
        "showColors": true,
        "displayName": "Age at visit",
        "effectiveGap": 5,
        "displayArrows": true
    }
}

describe("getLegends tests", () => {

    it("Includes the lower boundary of the last legend", () => {
        const legends = getLegend(0, data.top.legends, {defaultLegends, max: 100})
        expect(legends.id).to.eq('IUxld2dBVwE')
    })

    it("Includes the higher boundary of the first legend", () => {
        const legends = getLegend(100, data.top.legends, {defaultLegends, max: 100})
        expect(legends.id).to.eq('SY4tuTddbCM')
    })

    it("Observes boundaries", () => {
        let legends = getLegend(32.4, data.top.legends, {defaultLegends, max: 100})
        expect(legends.id).to.eq('IUxld2dBVwE')
        legends = getLegend(32.5, data.top.legends, {defaultLegends, max: 100})
        expect(legends.id).to.eq('bkxF00ckdGJ')
        legends = getLegend(65.4, data.top.legends, {defaultLegends, max: 100})
        expect(legends.id).to.eq('bkxF00ckdGJ')
        legends = getLegend(65.5, data.top.legends, {defaultLegends, max: 100})
        expect(legends.id).to.eq('SY4tuTddbCM')
    })

    it("Returns No Data legend if value is undefined or null", () => {
        let legends = getLegend(undefined, data.top.legends, {defaultLegends, max: 100})
        expect(legends.name).to.eq('No Data')
        legends = getLegend(null, data.top.legends, {defaultLegends, max: 100})
        expect(legends.name).to.eq('No Data')
    })
    it("Returns N/A legend if the value is not of type number", () => {
        const legends = getLegend('something', data.top.legends, {defaultLegends, max: 100})
        expect(legends.name).to.eq('N/A')
    })
    it("Should return undefined if the value is out of given range", () => {
        const legends = getLegend(1000, data.top.legends, {defaultLegends, max: 100})
        expect(legends).to.be.undefined
    })

})
