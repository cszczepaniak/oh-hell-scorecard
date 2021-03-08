#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { InfrastructureStack } from "../lib/infrastructure-stack";

const app = new cdk.App();
new InfrastructureStack(app, "oh-hell-scorecard", {
  env: { account: process.env.AWS_ACCOUNT_NUMBER, region: "us-east-2" },
});
