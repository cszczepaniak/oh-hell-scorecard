set -ex

cd app/
npm run lint
npm run test -- --coverage
npm run build