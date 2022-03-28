const systemSettingsKeys = ["keyCalendar"];

const systemSettingsQuery = {
  system: {
    resource: "systemSettings",
    params: ({ keys }) => ({
      keys: keys?.map((key) => `key=${key}`),
    }),
  },
};

export default async function getSystemSettings(engine) {
  const { system } = await engine.query(systemSettingsQuery, {
    variables: { keys: systemSettingsKeys },
  });
  const { keyCalendar } = system ?? {};
  return {
    calendar: keyCalendar,
  };
}
