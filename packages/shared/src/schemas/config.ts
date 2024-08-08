import { z } from "zod";
import i18n from "@dhis2/d2-i18n";

export const supportedDataSources = z.enum([
	"indicator",
	"dataElement",
	"dataSet",
	"",
]);

export type SupportedDataSources = z.infer<typeof supportedDataSources>;

export const legendDefinitionSchema = z.object({
	id: z.string(),
	color: z.string(),
	name: z.string(),
	isDefault: z.boolean().optional(),
});

export type LegendDefinition = z.infer<typeof legendDefinitionSchema>;

export const scorecardViewOptionsSchema = z.object({
	averageColumn: z.boolean(),
	averageDisplayType: z.enum(["ALL"]),
	averageRow: z.boolean(),
	emptyRows: z.boolean(),
	highlightedIndicators: z.boolean(),
	itemNumber: z.boolean(),
	legend: z.boolean(),
	showHierarchy: z.boolean(),
	title: z.boolean(),
	arrows: z.boolean(),
	showDataInRows: z.boolean(),
});

export type ScorecardViewOptions = z.infer<typeof scorecardViewOptionsSchema>;

export const organisationUnitSelectionSchema = z.object({
	userOrgUnit: z.boolean().optional(),
	userSubUnit: z.boolean().optional(),
	userSubX2Unit: z.boolean().optional(),
	orgUnits: z.array(
		z.object({
			id: z.string(),
		}),
	),
	groups: z.array(z.string()),
	levels: z.array(z.string()),
});

export type ScorecardOrgUnitSelection = z.infer<
	typeof organisationUnitSelectionSchema
>;

export const periodSelectionSchema = z.object({
	periods: z.array(
		z.object(
			{
				id: z.string(),
			},
			{
				invalid_type_error: i18n.t(
					"Period should be an object with an id property",
				),
				required_error: i18n.t("This field is required"),
			},
		),
	),
});

export type ScorecardPeriodSelection = z.infer<typeof periodSelectionSchema>;

export const legendSchema = z.object({
	legendDefinitionId: z.string(),
	id: z.string(),
	startValue: z.number(),
	endValue: z.number(),
});

export type ScorecardNewLegend = z.infer<typeof legendSchema>;

export const dataSourceSchema = z.object({
	id: z.string(),
	label: z.string().optional(),
	type: supportedDataSources,
	displayArrows: z.boolean(),
	highIsGood: z.boolean(),
	effectiveGap: z.number(),
	showColors: z.boolean(),
	weight: z.number(),
	legends: z.union([z.array(legendSchema), z.object({})]),
	description: z.string().optional(),
});

export type ScorecardDataSource = z.infer<typeof dataSourceSchema>;

export const dataHolderSchema = z.object({
	id: z.union([z.number(), z.string()]),
	dataSources: z.array(dataSourceSchema),
});

export type ScorecardDataHolder = z.infer<typeof dataHolderSchema>;

export const dataGroupSchema = z.object({
	id: z.union([z.number(), z.string()]),
	dataHolders: z
		.array(dataHolderSchema)
		.min(1, i18n.t("A group needs to have at least one data item")),
	style: z.object({}),
	title: z.string(),
});

export type ScorecardDataGroup = z.infer<typeof dataGroupSchema>;

export const scorecardConfigSchema = z.object({
	id: z.string(),
	title: z.string(),
	subtitle: z.string().optional(),
	customHeader: z.string().optional(),
	description: z.string().optional(),
	legendDefinitions: z.array(legendDefinitionSchema),
	options: scorecardViewOptionsSchema,
	orgUnitSelection: organisationUnitSelectionSchema,
	periodSelection: periodSelectionSchema,
	dataSelection: z.object({
		dataGroups: z
			.array(dataGroupSchema)
			.min(1, i18n.t("There should be at least one data group")),
	}),
	highlightedIndicators: z.array(dataSourceSchema),
	additionalLabels: z.array(z.string()),
});

export type ScorecardConfig = z.infer<typeof scorecardConfigSchema>;

const scorecardStateSchema = z.object({
	orgUnitSelection: organisationUnitSelectionSchema,
	periodSelection: periodSelectionSchema,
	options: scorecardViewOptionsSchema,
	nested: z.boolean().optional(),
});

export type ScorecardState = z.infer<typeof scorecardStateSchema>;

export const scorecardTableData = z.object({
	label: z.string(),
	count: z.number(),
	dataValues: z.array(z.object({})),
});

export enum ScorecardTableOrientation {
	ORG_UNIT_VS_DATA = "orgUnitsVsData",
	DATA_VS_ORG_UNIT = "dataVsOrgUnits",
}

export enum ScorecardTableDimension {
	GROUP = "group",
	ORG_UNITS = "orgUnits",
	PERIODS = "periods",
	DATA = "data",
}
