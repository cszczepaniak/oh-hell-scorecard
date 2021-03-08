set -ex

targetCommit=$1
cd infrastructure/
aws s3 cp s3://oh-hell-scorecard-artifacts/$GITHUB_SHA.zip artifact.zip
unzip artifact.zip -d artifact

sudo npm i -g aws-cdk
npm i
cdk synth
cdk deploy --require-approval=never