import { z } from "zod";


const oldLegendSet = z.object({
	color: z.string(),
	max: z.union([z.string(), z.number()]),
	min: z.union([z.string(), z.number()])
});

export type OldLegendSet = z.infer<typeof oldLegendSet>;

const oldIndicator = z.object({
	id: z.string(),
	title: z.string(),
	type: z.string().optional(),
	weight: z.number().optional(),
	legendset: z.array(oldLegendSet),
	high_is_good: z.boolean().optional(),
	legend_display: z.boolean().optional(),
	arrow_settings: z.object({
		effective_gap: z.number().optional(),
		display: z.boolean().optional()
	})

});

export type OldIndicator = z.infer<typeof oldIndicator>;

const oldIndicatorHolder = z.object({
	holder_id: z.union([z.string(), z.number()]),
	indicators: z.array(oldIndicator)
});

export type OldIndicatorHolder = z.infer<typeof oldIndicatorHolder>;

const oldIndicatorGroup = z.object({
	id: z.string(),
	style: z.object({
		color: z.string().optional(),
		backgroundColor: z.string().optional()
	}).optional(),
	name: z.string().optional(),
	title: z.string().optional(),
	indicator_holder_ids: z.array(z.number())
});

export type OldIndicatorGroup = z.infer<typeof oldIndicatorGroup>;

export const oldDataSourceSchema = z.object({
	title: z.string(),
	id: z.string(),
	weight: z.number(),
	legends: z.array(z.object({
		min: z.union([z.string(), z.number()]),
		max: z.union([z.string(), z.number()]),
		color: z.string()
	})),
	high_is_good: z.boolean().optional(),
	legend_display: z.boolean().optional(),
	arrow_settings: z.object({
		display: z.boolean().optional(),
		effective_gap: z.boolean().optional()
	})

});

export type OldDataSourceSchema = z.infer<typeof oldDataSourceSchema>;

export const oldUserGroup = z.object({
	id: z.string(),
	name: z.string(),
	see: z.boolean().optional(),
	edit: z.boolean().optional(),
	delete: z.boolean().optional()
});

export const orgUnitSettings = z.object({
	selected_groups: z.array(z.object({
		id: z.string(),
		level: z.number().optional(),
		name: z.string().optional()
	})),
	selected_levels: z.array(z.object({
		id: z.string()
	})),
	selected_orgunits: z.array(z.object({
		id: z.string()
	})),
	selected_user_orgunit: z.array(z.string())

});


export const oldLegendDefinition = z.object({
	color: z.string(),
	definition: z.string(),
	default: z.boolean().optional()
});

export type OldLegendDefinition = z.infer<typeof oldLegendDefinition>;

export type OrgUnitSettings = z.infer<typeof orgUnitSettings>;

export type OldUserGroup = z.infer<typeof oldUserGroup>;

export const oldScorecardSchema = z.object({
		id: z.string(),
		header: z.object({
			title: z.string(),
			sub_title: z.string(),
			description: z.string(),
			template: z.object({
				content: z.string(),
				display: z.boolean().optional()
			}),
			show_arrows_definition: z.boolean().optional(),
			show_legend_definition: z.boolean().optional()
		}),
		legendset_definitions: z.array(oldLegendDefinition),
		empty_rows: z.boolean().optional(),
		show_average_in_row: z.boolean().optional(),
		show_average_in_column: z.boolean().optional(),
		show_hierarchy: z.boolean().optional(),
		average_selection: z.string().optional(),
		highlighted_indicators: z.object({
			display: z.boolean().optional(),
			definitions: z.array(oldDataSourceSchema).optional()
		}),
		data_settings: z.object({
			indicator_holder_groups: oldIndicatorGroup,
			indicator_holders: z.array(oldIndicatorHolder)
		}),
		user: z.object({
			id: z.string()
		}),
		user_groups: z.array(oldUserGroup),
		periodType: z.string().optional(),
		selected_periods: z.object({
			id: z.string()
		}),
		orgunit_settings: orgUnitSettings,
		additional_labels: z.array(z.string()).optional()
	})
;

export type OldScorecardSchema = z.infer<typeof oldScorecardSchema>;
