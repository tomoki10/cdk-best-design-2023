import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as CdkBestDesign2023 from "../lib/stack/cdk-best-design-2023-stack";

import { devParameter } from "../bin/parameter";

test("Unit Test", () => {
  const app = new cdk.App();
  const stack = new CdkBestDesign2023.CdkBestDesign2023Stack(
    app,
    "CdkBestDesign2023Stack",
    {
      ...devParameter,
    }
  );
  // Snapshot Test
  expect(Template.fromStack(stack)).toMatchSnapshot();

  // Fine-grained assertions
  const template = Template.fromStack(stack);
  template.hasResourceProperties("AWS::Lambda::Function", {
    Runtime: "nodejs18.x",
  });
});
