set -ex

cd app/
zip -r $GITHUB_SHA.zip build
aws s3 cp $GITHUB_SHA.zip s3://oh-hell-scorecard-artifacts/