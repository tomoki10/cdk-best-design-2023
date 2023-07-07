import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaConstruct } from "../construct/lambda";
import { DataStoreConstruct } from "../construct/data-store";

interface CdkBestDesign2023StackProps extends cdk.StackProps {
  envName: string;
}

export class CdkBestDesign2023Stack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: CdkBestDesign2023StackProps
  ) {
    super(scope, id, props);

    const dataStore = new DataStoreConstruct(this, "DataStoreConstruct", {
      envName: props.envName,
    });

    new LambdaConstruct(this, "LambdaConstruct", {
      envName: props.envName,
      tableName: dataStore.itemTableName,
    });
  }
}
