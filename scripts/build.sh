set -ex

cd app/
npm install
npm run lint
npm run test -- --coverage
npm run build