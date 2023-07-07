import * as cdk from "aws-cdk-lib";
import {
  CdkBestDesign2023Stack,
  // CdkBestDesign2023Stack as DevCdkBestDesign2023Stack,
  // CdkBestDesign2023Stack as PrdCdkBestDesign2023Stack,
} from "../lib/stack/cdk-best-design-2023-stack";

import { devParameter, prdParameter, AppParameter } from "./parameter";
const app = new cdk.App();

// Dynamic ID Pattern
const argContext = "environment";
const envKey = app.node.tryGetContext(argContext);
const parameters = [devParameter, prdParameter];
const appParameter: AppParameter = parameters.filter(
  (obj: AppParameter) => obj.envName === envKey
)[0];

new CdkBestDesign2023Stack(
  app,
  `${appParameter.envName}CdkBestDesign2023Stack`,
  {
    ...appParameter,
  }
);

// Static ID Pattern 1:
// new CdkBestDesign2023Stack(app, `DevCdkBestDesign2023Stack`, {
//   ...devParameter,
// });
// new CdkBestDesign2023Stack(app, `PrdCdkBestDesign2023Stack`, {
//   ...prdParameter,
// });

// // Static ID Pattern 2:
// new DevCdkBestDesign2023Stack(app, `DevCdkBestDesign2023Stack`, {
//   ...devParameter,
// });

// new PrdCdkBestDesign2023Stack(app, `PrdCdkBestDesign2023Stack`, {
//   ...prdParameter,
// });
