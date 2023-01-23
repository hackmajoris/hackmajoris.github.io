---
layout: post
title: Amazon RDS Start-Stop Scheduler with CDK and TypeScript
author: Alexandru Ilies
---

## Description


Creating a schedule for your Amazon RDS instances and clusters can help you save money on running costs, and also ensure that your database is only running when it's needed.
It applies mostly on not-prod environments, where you have multiple RDS instances and the cost of running them becomes a problem.

There are several ways to schedule your RDS instances, such as using the AWS Management Console, the AWS Command Line Interface (CLI), or a third-party tool. However, one of the most effective ways to schedule your RDS instances is by using AWS Lambda and CloudWatch Events.

In the above example, everything is created via CDK stack in TypeScript. The Lambda will stop all the instances and clusters which will be found in the AWS account and the region specified in the CDK config. The RDS instances and clusters could be filtered using the the DescribeDBInstances/DescribeDBClusters API in order to apply the scheduler on a specific instance/cluster.


First, we need to create an IAM role that has the necessary permissions to interact with the RDS service. We can do this using the CDK by creating a new IAM role and attaching a policy that grants access to the RDS service.
Next, we will create a Lambda function using the CDK. In the function, we will use the AWS SDK for JavaScript in Node.js to interact with the RDS service. We will use the describeDBInstances and describeDBClusters methods to get a list of all available RDS instances and clusters, and then we will use the startDBInstance, startDBCluster, stopDBInstance methods to start or stop the instances and clusters.
After that, we need to create a CloudWatch Event that triggers the Lambda function. We can do this by creating a new CloudWatch Event and defining a schedule for when the event should trigger. For example, we can set the event to trigger every day at 7 am, except on weekends.
Finally, we will deploy the CDK stack, and the Lambda function, IAM role, and CloudWatch Event will be created and configured in your AWS account.

By following this process, you can ensure that your RDS instances and clusters are only running when they are needed, thus reducing your running costs. It's important to test the function before applying it to production, also to monitor the function's performance and to make sure that it's working correctly.
In summary, using AWS Lambda and CloudWatch Events to schedule your RDS instances and clusters is an effective and cost-efficient way to manage your RDS instances. It also allows you to take advantage of the scalability and flexibility of the AWS Lambda service, and easily automate the process of starting and stopping your RDS instances.

Here is the CDK stack:

```typescript
    import * as cdk from 'aws-cdk-lib';
    import * as lambda from 'aws-cdk-lib/aws-lambda';
    import * as events from 'aws-cdk-lib/aws-events';
    import { aws_events_targets, CfnOutput, NestedStack } from "aws-cdk-lib";
    import { Construct } from "constructs";
    import * as iam from 'aws-cdk-lib/aws-iam';

    export class StartStopRdsStack extends cdk.NestedStack {
      constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create the Lambda function to start RDS
        const startRdsInstancesLambda = new lambda.Function(this, 'psb-rds-start-lambda', {
          runtime: lambda.Runtime.NODEJS_14_X,
          functionName: 'psb-rds-start-stop-lambda',
          code: lambda.Code.fromAsset("./lib/assets/functions/start-stop-rds-lambda"),
          handler: "index.handler",
          environment: {
            "tag": "some-tag",
            "info": "Shared function for starting-stopping RDS instances"
          }
        });

       // Assign role to lambda to access RDS
        startRdsInstancesLambda.addToRolePolicy(new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            "rds:DescribeDBInstances",
            "rds:DescribeDBClusters",
            "rds:StartDBInstance",
            "rds:StartDBCluster",
            "rds:StopDBInstance",
            "rds:StopDBCluster"
          ],
          resources: ["*"]
        }));


        // Create the CloudWatch Event rule for starting RDS every day at 7 AM
        const startRdsInstancesRule = new events.Rule(this, 'psb-start-rds-instances-rule', {
          schedule: events.Schedule.cron({
            minute: '0',
            hour: '7',
            day: '1-5',
            month: '*'
          }),
        });
        startRdsInstancesRule.addTarget(new aws_events_targets.LambdaFunction(startRdsInstancesLambda));

        // Create  the CloudWatch Event rule for stopping RDS every day at 18 PM
        const stopRdsInstancesRule = new events.Rule(this, 'psb-stop-rds-instances-rule', {
          schedule: events.Schedule.cron({
            minute: '0',
            hour: '18',
            day: '1-5',
            month: '*'
          }),
        });
        stopRdsInstancesRule.addTarget(new aws_events_targets.LambdaFunction(startRdsInstancesLambda));
      }
    }

```
  
  
  Here is the Lambda function
  
  ```typescript
  import { Handler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const rds = new AWS.RDS();

enum InstanceStatus {
    STOPPED = 'stopped',
    AVAILABLE = 'available',
}

export const handler: Handler = async () => {
  try {
    const instances = await rds.describeDBInstances().promise();
    console.log('Found instances: ', instances.DBInstances);

    if (instances.DBInstances) {
      for (const instance of instances.DBInstances) {
        const identifier = instance.DBInstanceIdentifier!;
        const instanceStatus = instance.DBInstanceStatus!;

        console.log(`${identifier} status: `, instanceStatus);

        if (instanceStatus === InstanceStatus.STOPPED) {
          console.log(`Starting DB Instance with identifier:  ${identifier}`);
          await rds.startDBInstance({ DBInstanceIdentifier: identifier }).promise();
        } else {
          console.log(`Stopping  DB Instance with identifier:  ${identifier}`);
          await rds.stopDBInstance({ DBInstanceIdentifier: identifier }).promise();
        }
      }
    }

    const describeClusters = await rds.describeDBClusters().promise();
    console.log('Found clusters: ', describeClusters.DBClusters);

    if (describeClusters.DBClusters) {
      for (const cluster of describeClusters.DBClusters) {
        const identifier = cluster.DBClusterIdentifier!;
        const instanceStatus = cluster.Status!;

        console.log(`${cluster.DBClusterIdentifier} status: `, cluster.Status);

        if (cluster.Status === InstanceStatus.STOPPED) {
          console.log(`Starting DB Cluster with identifier:  ${identifier}`);
          await rds.startDBCluster({ DBClusterIdentifier: identifier }).promise();
        } else {
          console.log(`Stopping  DB Cluster with identifier:  ${identifier}`);
          await rds.stopDBCluster({ DBClusterIdentifier: identifier }).promise();
        }
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true }),
      isBase64Encoded: false,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: error }),
      isBase64Encoded: false,
    };
  }
};
  ```
  
