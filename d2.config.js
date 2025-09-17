const config = {
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
	direction: "auto",
	pwa: {
		enabled: true,
		caching: {
			patternsToOmitFromAppShell: [/.*/]
		}
	},
	viteConfigExtensions: "./viteConfigExtensions.mts"
};
module.exports = config;
