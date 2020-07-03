import appConfig from "@/config";

export const indexPageMeta = () => ({ title: appConfig.appName });

export const searchPageMeta = (query: string) => ({
  title: `${query} — ${appConfig.appName}`,
});
