const systemSettingsKeys = ["keyCalendar"];

const systemSettingsQuery = {
	system: {
		resource: "systemSettings",
		params: ({ keys }: any) => ({
			keys: keys?.map((key: any) => `key=${key}`),
		}),
	},
};

export default async function getSystemSettings(engine: any) {
	const { system } = await engine.query(systemSettingsQuery, {
		variables: { keys: systemSettingsKeys },
	});
	const { keyCalendar } = system ?? {};
	return {
		calendar: keyCalendar,
	};
}
