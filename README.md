# oh-hell-scorecard

![](https://github.com/cszczepaniak/oh-hell-scorecard/workflows/Unit%20Tests/badge.svg)
![](https://github.com/cszczepaniak/oh-hell-scorecard/workflows/eslint/badge.svg)

A web app to score a game of Oh Hell (aka Up and Down the River, Oh Heck, etc.)
The purpose of this project is to create a web app to score a game of [Oh Hell](https://www.pagat.com/exact/ohhell.html) (aka Up and Down the River, Oh Heck, etc.). It's also serving as a way for me to learn about and explore a few web technologies:

- [TypeScript](https://www.typescriptlang.org/) and associated tooling
- Other devops tools ([Husky](https://www.npmjs.com/package/husky), [lint-staged](https://github.com/okonet/lint-staged), [eslint](https://eslint.org/), CI/CD strategies ([Docker](https://www.docker.com/)), etc.)
- [React context API](https://reactjs.org/docs/context.html) vs. [Redux](https://redux.js.org/) for state management (it seems like Redux gets ubiquitously applied to any React project, which can lead to many values being in an app's global state which don't belong there, and many people on the internet agree. I want to learn to use the correct tool for a job.)

---

To run the app, simply run `npm start` and navigate to `localhost:3000` in a browser.
