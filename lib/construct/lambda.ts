import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_lambda_nodejs as node_lambda } from "aws-cdk-lib";
import { aws_logs as logs } from "aws-cdk-lib";
import * as path from "path";

export interface LambdaConstructProps extends cdk.StackProps {
  tableName: string;
  envName: string;
}

export class LambdaConstruct extends Construct {
  constructor(scope: Construct, id: string, props: LambdaConstructProps) {
    super(scope, id);

    // Good Pattern
    const getItemFunction = new node_lambda.NodejsFunction(this, "getItem", {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../../src/lambda/get-item/index.ts"),
      handler: "getItem",
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
      tracing: lambda.Tracing.ACTIVE,
      insightsVersion: lambda.LambdaInsightsVersion.VERSION_1_0_98_0,
      environment: {
        DDB_TABLE: props.tableName,
      },
      logRetention: logs.RetentionDays.THREE_MONTHS,
    });

    // Bad Pattern
    const putItemFunction = lambdaGenerate(
      this,
      "putItem",
      "../../src/lambda/put-item/index.ts",
      "hoge-table"
    );
    const postItemFunction = lambdaGenerate(
      this,
      "postItem",
      "../../src/lambda/post-item/index.ts",
      "hoge-table"
    );

    // Bad Pattern
    if (props.envName === "prd") {
      const getUserFunction = new node_lambda.NodejsFunction(this, "getUser", {
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: path.join(__dirname, "../../src/lambda/get-user/index.ts"),
        handler: "getUser",
        memorySize: 1024,
      });
    }

    // Good Pattern
    const getUserFunction = new node_lambda.NodejsFunction(this, "getUser", {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../../src/lambda/get-user/index.ts"),
      handler: "getUser",
      // memorySize: props.memorysize,
    });
  }
}

const lambdaGenerate = (
  scope: Construct,
  handler: string,
  entrypoint: string,
  tableName: string
) => {
  new node_lambda.NodejsFunction(scope, handler, {
    runtime: lambda.Runtime.NODEJS_18_X,
    entry: path.join(__dirname, entrypoint),
    handler: handler,
    memorySize: 256,
    timeout: cdk.Duration.seconds(30),
    tracing: lambda.Tracing.ACTIVE,
    insightsVersion: lambda.LambdaInsightsVersion.VERSION_1_0_98_0,
    environment: {
      DDB_TABLE: tableName,
    },
    // Specifying the following creates a custom resource (*LogRetention*) within the stack.
    // See: https://github.com/aws/aws-cdk/issues/11878
    logRetention: logs.RetentionDays.THREE_MONTHS,
  });
};
