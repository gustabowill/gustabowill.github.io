import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
	author: "Gustavo Oliveira",
	date: {
		locale: "en-US",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	description: "My personal blog where I talk about whatever.",
	lang: "en-US",
	ogLocale: "en_US",
	sortPostsByUpdatedDate: false,
	title: "Gustavo Oliveira",
	hideThemeCredit: true,
	profile: {
		name: "Gustavo Oliveira",
		email: "gustavowilliam0805@gmail.com",
		github: "https://github.com/gustabowill",
		linkedin: "https://www.linkedin.com/in/gustavo-william",
		jobTitle: "Software Engineer",
		employer: "EnterpriseDB",
		employerUrl: "https://www.enterprisedb.com/",
		alumni: "Federal Institute of Brasília",
		avatar: "/avatar.jpeg",
	},
	// Uncomment & fill in to enable Giscus comments on every post.
	// comments: {
	// 	repo: "your-handle/your-repo",
	// 	repoId: "...",
	// 	category: "General",
	// 	categoryId: "...",
	// },
	// Uncomment to enable analytics. Both providers load via Partytown.
	// analytics: {
	// 	googleAnalyticsId: "G-XXXXXXX",
	// 	goatcounterUrl: "https://your-handle.goatcounter.com/count",
	// },
};

export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/",
		title: "Home",
	},
	{
		path: "/posts/",
		title: "Posts",
	},
	{
		path: "/talks/",
		title: "Talks",
	},
	{
		path: "/about/",
		title: "About",
	},
];

export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeBackground: ({ theme }) => (theme.type === "light" ? "#f0e9d6" : "#1e1e1e"),
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			editorActiveTabBackground: ({ theme }) => (theme.type === "light" ? "#f0e9d6" : "#1e1e1e"),
			editorTabBarBackground: ({ theme }) => (theme.type === "light" ? "#ebe3cd" : "#121212"),
			frameBoxShadowCssValue: "none",
			terminalBackground: ({ theme }) => (theme.type === "light" ? "#f0e9d6" : "#1e1e1e"),
			terminalTitlebarBackground: ({ theme }) => (theme.type === "light" ? "#ebe3cd" : "#121212"),
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		return `[data-theme="${theme.name}"]`;
	},
	themes: ["min-dark", "min-light"],
	useThemedScrollbars: false,
};
