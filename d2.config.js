/**
 * @type {import("@dhis2/cli-app-scripts").D2Config}
 */
const config = {
	id: "6e3af2e6-6dac-49b8-baa1-40019a684252",
	author: "HISP Tanzania",
	type: "app",
	name: "hisptz-scorecard",
	title: "Scorecard",
	pluginType: "DASHBOARD",
	entryPoints: {
		app: "./src/App.tsx",
		plugin: "./src/Plugin.tsx"
	},
	dataStoreNamespace: "hisptz-scorecard",
	minDHIS2Version: "2.40",
	maxDHIS2Version: "2.42",
	direction: "auto",
	viteConfigExtensions: "./viteConfigExtensions.mts"
};
module.exports = config;
