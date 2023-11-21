# testing-code-challenge

## Setup

Use the recommended engine version if your are not running on Docker. Anyway the engine version is configured at `package.json` -> `engines`.
```bash
pnpm env use --global 20
```

Install dependencies by running:

```bash
pnpm install
```

Start all the containers for external services:
```bash
pnpm run infra:up
```

Test that everything is working as expected by running unit tests `(Current coverage is about 98%)`:

```bash
pnpm run test
```

End to end tests are also available:

```bash
pnpm run test:e2e
```

## Debug

Running just some tests based on name pattern:
```bash
pnpm run test --testNamePattern "should fail"
```

## Good to know

- Instad of using `got` library for performing http requests I have been using `axios` since the methods for this POC are the same.
- All the exercises inside `src/` folder contains mocked unit tests and the file `issue.md` giving an answer for the challenge asked question.
- You would notice that different solutions has been used for fixing same issues during the errors resolutions of this exercises. Is just a way to show different approaches.
- Also the unit tests has been made using different approaches for obtaining the same objective. Like using `toEqual` and `toMatchSnapshot`
- For more complex tests I prefere to use Node `assert` native library.
- The docker image is based on `linux/amd64`. This is not prepared for running on `ARM` based systemd.
- In case there was an `.env` file needed I would have used `dotenv` solution for encrypting and sharing the content of it with the team members.
- For simulating dates from the tests `date-fns` has been used making us things easier. Using Jest fake timers is another solution but more complex for this use case.
- Using a Docker registry for uploading the production image currently being build is something I had not enough time on this occasion.

## Build

The build right now does not contain what is considered development features. So you only have code that will be used in production. That is, the tests are not available in the final build.

Locally:
```bash
pnpm build
```
Docker context:
```bash
docker-compose build
```

There is a Github action avilable at `.github/workflows/node.js.yml`

This is responsible for building the project code. It is not yet able to run the tests due to dependencies on mongo.

The output of the actions triggered by any commit are available on there: https://github.com/Bounteous17/testing-code-challenge/actions

## Visual proof

![image](https://github.com/Bounteous17/testing-code-challenge/assets/16175933/849703ed-1ad3-4f99-b307-6b5c77daf80c)

