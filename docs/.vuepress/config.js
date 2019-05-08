module.exports = {
	base: "/BrendanUICombination/",
	host: "localhost",
	themeConfig: {
		nav: [{ text: "主页", link: "/" }],
		sidebar: [
			{ title: "入门", children: ["/install/", "/get-started/"] },
			{
				title: "组件",
				children: [
					"/components/button",
					"/components/tabs",
					"/components/input",
					"/components/grid",
					"/components/layout",
					"/components/toast",
					"/components/popover",
				],
			},
		],
	},
	title: "Zealot-UI",
	description: "一个轻量的 UI 框架",
}
