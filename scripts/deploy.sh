set -ex

targetCommit=$1
cd infrastructure/
aws s3 cp s3://oh-hell-scorecard-artifacts/$GITHUB_SHA.zip artifact.zip
unzip artifact.zip

sudo npm i -g aws-cdk
cdk synth
cdk deploy