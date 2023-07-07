import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_dynamodb as dynamodb } from "aws-cdk-lib";

export interface DataStoreConstructProps extends cdk.StackProps {
  envName: string;
}

export class DataStoreConstruct extends Construct {
  public itemTableName: string;
  constructor(scope: Construct, id: string, props: DataStoreConstructProps) {
    super(scope, id);

    // Create table
    const itemTable = new dynamodb.Table(this, "ItemTable", {
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "name",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      contributorInsightsEnabled: true,
      deletionProtection: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    this.itemTableName = itemTable.tableName;
  }
}
