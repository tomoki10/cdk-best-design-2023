import { Environment } from "aws-cdk-lib";

export interface AppParameter {
  env?: Environment;
  envName: string;
}
export const devParameter: AppParameter = {
  envName: "Development",
  env: { account: "123456789012", region: "ap-northeast-1" },
};

export const prdParameter: AppParameter = {
  envName: "Production",
  env: { account: "012345678901", region: "ap-northeast-1" },
};
