import { migrateScorecard } from "./migrate";

describe("Given old scorecard model", () => {
  const oldScorecard = {
    id: "eJGL6Aa3K7n",
    user: {
      id: "YXz40ijLGJr",
    },
    footer: {
      template: null,
      sub_title: null,
      description: null,
      display_title: false,
      display_generated_date: false,
    },
    header: {
      title: "My Scorecard",
      template: {
        content: "",
        display: false,
      },
      sub_title: "",
      description: "Routine data",
      show_arrows_definition: true,
      show_legend_definition: true,
    },
    show_rank: false,
    empty_rows: true,
    periodType: "Quarterly",
    show_score: false,
    user_groups: [
      {
        id: "ji3bRmgKwkS",
        see: true,
        name: "Administrator",
      },
      {
        id: "all",
        see: true,
        name: "Public",
        title:
          "This will be accessible to everyone in the system accessing the scorecard",
      },
    ],
    data_settings: {
      indicator_holders: [
        {
          holder_id: 2,
          indicators: [
            {
              id: "BvG8P80QxqZ",
              name: "Access to ANC Services",
              title: "Access to ANC Services",
              value: 87,
              weight: 100,
              legendset: [
                {
                  max: 4000,
                  min: 67,
                  color: "#008000",
                },
                {
                  max: 67,
                  min: 34,
                  color: "#FFFF00",
                },
                {
                  max: 34,
                  min: 1,
                  color: "#FF0000",
                },
              ],
              calculation: "analytics",
              high_is_good: true,
              showTopArrow: true,
              arrow_settings: {
                display: true,
                effective_gap: 5,
              },
              label_settings: {
                display: true,
                font_size: "",
              },
              legend_display: true,
              function_to_use: "",
              showBottomArrow: false,
              bottleneck_indicators: [],
              use_bottleneck_groups: true,
              additional_label_values: {},
              bottleneck_indicators_groups: [],
            },
          ],
        },
      ],
      indicator_holder_groups: [
        {
          id: 1,
          name: "Default",
          holder_style: null,
          background_color: "#ffffff",
          indicator_holder_ids: [2],
        },
      ],
    },
    shown_records: "all",
    show_hierarchy: false,
    orgunit_settings: {
      type: "report",
      user_orgunits: [
        {
          id: "P8hBn1kPPau",
          name: "Cat District",
          level: 3,
        },
      ],
      orgunit_groups: [
        {
          id: "Z2iBR6hRXHS",
          name: "Districts",
        },
        {
          id: "sQXBR6nw3Vt",
          name: "Facility",
        },
        {
          id: "kCNqefF1kq8",
          name: "Regions",
        },
      ],
      orgunit_levels: [
        {
          id: "ZqI1kKnH7ve",
          name: "Country",
          level: 1,
        },
        {
          id: "BNQIkbGlA00",
          name: "Region",
          level: 2,
        },
        {
          id: "P0QFTFfTl2X",
          name: "District",
          level: 3,
        },
        {
          id: "VJJOhuBJSJe",
          name: "Facility",
          level: 4,
        },
      ],
      selection_mode: "orgUnit",
      selected_groups: [],
      selected_levels: [],
      selected_orgunits: [
        {
          id: "P8hBn1kPPau",
          name: "Cat District",
          level: 3,
          parent: {
            id: "zj9LoeErgkP",
            name: "Animal Region",
          },
          children: [
            {
              id: "RI95HQRHbKc",
              name: "Cheetah Health Centre",
              level: 4,
              parent: {
                id: "P8hBn1kPPau",
                name: "Cat District",
              },
            },
            {
              id: "uxeKkkTXQBJ",
              name: "Feral Primary Health Centre",
              level: 4,
              parent: {
                id: "P8hBn1kPPau",
                name: "Cat District",
              },
            },
            {
              id: "Ec0GNLtOnoS",
              name: "Ginger Dispensary",
              level: 4,
              parent: {
                id: "P8hBn1kPPau",
                name: "Cat District",
              },
            },
            {
              id: "VkxNyvaLtoz",
              name: "Leopard Health Centre",
              level: 4,
              parent: {
                id: "P8hBn1kPPau",
                name: "Cat District",
              },
            },
            {
              id: "gsTTPvFXTAk",
              name: "Lion District Hospital",
              level: 4,
              parent: {
                id: "P8hBn1kPPau",
                name: "Cat District",
              },
            },
            {
              id: "NR9TAx2SccV",
              name: "Panther Health Centre",
              level: 4,
              parent: {
                id: "P8hBn1kPPau",
                name: "Cat District",
              },
            },
            {
              id: "q4u5ODUDUrF",
              name: "Pussy Dispensary",
              level: 4,
              parent: {
                id: "P8hBn1kPPau",
                name: "Cat District",
              },
            },
            {
              id: "ZO8O9OgCJJ6",
              name: "Siamese Primary Health Centre",
              level: 4,
              parent: {
                id: "P8hBn1kPPau",
                name: "Cat District",
              },
            },
            {
              id: "lQPIAjJ8J47",
              name: "Tiger Hospital Gateway PHC",
              level: 4,
              parent: {
                id: "P8hBn1kPPau",
                name: "Cat District",
              },
            },
            {
              id: "opRst8Kk7VU",
              name: "Wildcat Primary Health Centre",
              level: 4,
              parent: {
                id: "P8hBn1kPPau",
                name: "Cat District",
              },
            },
          ],
          isExpanded: true,
        },
      ],
      show_update_button: true,
      selected_user_orgunit: [],
    },
    selected_periods: [
      {
        id: "2018Q4",
        name: "October 2018 - December 2018",
        type: "Quarterly",
        monthly: [
          {
            id: "201812",
            name: "December 2018",
            type: "Monthly",
          },
          {
            id: "201811",
            name: "November 2018",
            type: "Monthly",
          },
          {
            id: "201810",
            name: "October 2018",
            type: "Monthly",
          },
        ],
        lastPeriod: {
          id: "2018Q3",
          name: "July 2018 - September 2018",
        },
      },
    ],
    additional_labels: [],
    average_selection: "all",
    show_league_table: false,
    rank_position_last: true,
    show_average_in_row: false,
    show_data_in_column: false,
    legendset_definitions: [
      {
        color: "#008000",
        definition: "Target achieved / on track",
      },
      {
        color: "#FFFF00",
        definition: "Progress, but more effort required",
      },
      {
        color: "#FF0000",
        definition: "Not on track",
      },
      {
        color: "#D3D3D3",
        default: true,
        definition: "N/A",
      },
      {
        color: "#FFFFFF",
        default: true,
        definition: "No data",
      },
    ],
    show_league_table_all: false,
    highlighted_indicators: {
      ou: "P8hBn1kPPau",
      display: false,
      definitions: [
        {
          id: "BvG8P80QxqZ",
          name: "Access to ANC Services",
          title: "Access to ANC Services",
          value: 87,
          weight: 100,
          legendset: [
            {
              max: 4000,
              min: 67,
              color: "#008000",
            },
            {
              max: 67,
              min: 34,
              color: "#FFFF00",
            },
            {
              max: 34,
              min: 1,
              color: "#FF0000",
            },
          ],
          calculation: "analytics",
          high_is_good: true,
          showTopArrow: true,
          arrow_settings: {
            display: true,
            effective_gap: 5,
          },
          label_settings: {
            display: true,
            font_size: "",
          },
          legend_display: true,
          function_to_use: "",
          showBottomArrow: false,
          bottleneck_indicators: [],
          use_bottleneck_groups: true,
          additional_label_values: {},
          bottleneck_indicators_groups: [],
        },
      ],
    },
    show_average_in_column: false,
    indicator_dataElement_reporting_rate_selection: "Indicators",
  };

  const newScorecard = migrateScorecard(oldScorecard);

  it("should migrate scorecard to new model", () => {
    expect(newScorecard).toEqual({
      id: "eJGL6Aa3K7n",
      name: "My Scorecard",
      user: {
        id: "YXz40ijLGJr",
      },
      title: "My Scorecard",
      options: {
        title: true,
        legend: true,
        emptyRows: true,
        averageRow: false,
        itemNumber: true,
        averageColumn: false,
        showHierarchy: false,
        averageDisplayType: "ALL",
        highlightedIndicators: false,
      },
      subtitle: "",
      periodType: "Quarterly",
      description: "Routine data",
      customHeader: "",
      publicAccess: {
        id: "public",
        type: "public",
        access: "r-----",
        displayName: "Public",
      },
      userAccesses: [],
      dataSelection: {
        dataGroups: [
          {
            id: 1,
            style: {
              color: "#000000",
              backgroundColor: "#ffffff",
            },
            title: "Default",
            dataHolders: [
              {
                id: 2,
                dataSources: [
                  {
                    id: "BvG8P80QxqZ",
                    type: "indicator",
                    label: "Access to ANC Services",
                    weight: 100,
                    legends: [
                      {
                        id: "",
                        name: "",
                        color: "#008000",
                        endValue: 4000,
                        startValue: 67,
                      },
                      {
                        id: "",
                        name: "",
                        color: "#FFFF00",
                        endValue: 67,
                        startValue: 34,
                      },
                      {
                        id: "",
                        name: "",
                        color: "#FF0000",
                        endValue: 34,
                        startValue: 1,
                      },
                    ],
                    highIsGood: true,
                    showColors: true,
                    effectiveGap: 5,
                    displayArrows: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      targetOnLevels: false,
      periodSelection: {},
      additionalLabels: [],
      orgUnitSelection: {
        group: "",
        level: "",
        orgUnits: [
          {
            id: "P8hBn1kPPau",
          },
        ],
        userOrgUnit: false,
        userSubUnit: false,
        userSubX2Unit: false,
      },
      legendDefinitions: [
        {
          color: "#008000",
          name: "Target achieved / on track",
        },
        {
          color: "#FFFF00",
          name: "Progress, but more effort required",
        },
        {
          color: "#FF0000",
          name: "Not on track",
        },
        { color: "#D3D3D3", default: true, name: "N/A" },
        {
          color: "#FFFFFF",
          default: true,
          name: "No data",
        },
      ],
      userGroupAccesses: [
        {
          id: "ji3bRmgKwkS",
          type: "userGroup",
          access: "r-----",
          displayName: "Administrator",
        },
      ],
      highlightedIndicators: [
        {
          id: "BvG8P80QxqZ",
          type: "indicator",
          label: "Access to ANC Services",
          weight: 100,
          legends: [
            {
              id: "",
              name: "",
              color: "#008000",
              endValue: 4000,
              startValue: 67,
            },
            {
              id: "",
              name: "",
              color: "#FFFF00",
              endValue: 67,
              startValue: 34,
            },
            {
              id: "",
              name: "",
              color: "#FF0000",
              endValue: 34,
              startValue: 1,
            },
          ],
          highIsGood: true,
          showColors: true,
          effectiveGap: 5,
          displayArrows: true,
        },
      ],
    });
  });
});
