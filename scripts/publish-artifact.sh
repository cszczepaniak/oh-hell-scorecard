set -ex

cd app/build/
zip -r $GITHUB_SHA.zip .
aws s3 cp $GITHUB_SHA.zip s3://oh-hell-scorecard-artifacts/