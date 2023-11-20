# dimaticasoftware-code-challenge

## Setup

Use the recommended engine version if your are not running on Docker:
```bash
pnpm env use --global 20
```

Install dependencies by running:

```bash
pnpm install
```

Test that everything is working as expected by running unit tests:

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