import dotenv from "dotenv";

type GithubConfiguration = {
  GITHUB_ACCESS_TOKEN: string;
};

const parsedConfig: unknown = dotenv.config().parsed || {};
export const configuration = parsedConfig as GithubConfiguration;
