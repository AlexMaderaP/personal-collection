export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Personal Collection",
  description:
    "Web app for managing personal custom collections such as books, post-stamps, coins, and more.",
  locales: ["en", "es"],
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],

  links: {
    github: "https://github.com/AlexMaderaP/personal-collection",
  },
};
