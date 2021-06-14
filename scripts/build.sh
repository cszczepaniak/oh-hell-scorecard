set -ex

cd app/
yarn
yarn lint
yarn test --coverage
yarn build