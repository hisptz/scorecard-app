import { z } from "zod";


const oldLegendSet = z.object({
	color: z.string(),
	max: z.union([z.string(), z.number()]),
	min: z.union([z.string(), z.number()])
});

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

const oldIndicatorHolder = z.object({
	holder_id: z.union([z.string(), z.number()]),
	indicators: z.array(oldIndicator)
});

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

const oldDataSourceSchema = z.object({
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

export const oldScorecardSchema = z.object({
	id: z.string(),
	header: z.object({
		title: z.string(),
		sub_title: z.string(),
		description: z.string(),
		template: z.object({
			content: z.string(),
			display: z.boolean().optional()
		})
	}),
	legendset_definitions: z.array(z.object({
		color: z.string(),
		definition: z.string(),
		default: z.boolean().optional()
	})),
	empty_rows: z.boolean().optional(),
	show_average_in_row: z.boolean().optional(),
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
});
