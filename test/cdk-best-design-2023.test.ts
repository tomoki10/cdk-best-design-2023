import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as CdkBestDesign2023 from "../lib/stack/cdk-best-design-2023-stack";

import { devParameter } from "../bin/parameter";

test("Snapshot Test", () => {
  const app = new cdk.App();
  const stack = new CdkBestDesign2023.CdkBestDesign2023Stack(
    app,
    "CdkBestDesign2023Stack",
    {
      ...devParameter,
    }
  );
  expect(Template.fromStack(stack)).toMatchSnapshot();
});
