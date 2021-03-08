import * as cdk from "@aws-cdk/core";
import { SPADeploy } from "cdk-spa-deploy";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new SPADeploy(this, id).createSiteWithCloudfront({
      indexDoc: "index.html",
      websiteFolder: "artifact",
    });

    // The code that defines your stack goes here
  }
}
