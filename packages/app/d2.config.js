const config = {
	type: "app",
	name: "hisptz-scorecard",
	title: "Interactive Scorecard",
	entryPoints: {
		app: "./src/App.tsx",
		plugin: "./src/Plugin.tsx",
	},
	dataStoreNamespace: "hisptz-scorecard",
};

module.exports = config;
