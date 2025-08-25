import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  name: 'msg_Technical_Assessment',
  tests: './tests/**/*.feature',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://www.saucedemo.com',
      show: true,
      // Added strict execution delay for visual inspection, comment in/out depending on need
      // waitForAction: 500,
      windowSize: null,
      waitForNavigation: 'load'
    },
    REST: {
      endpoint: 'https://reqres.in',
      prettyPrintJson: true,
      defaultHeaders: {
        'x-api-key': 'reqres-free-v1',
      },
      // onRequest: (request) => {
      //   request.headers.auth = 'token';
      // },
    },
    JSONResponse: {},
  },
  include: {
    I: './steps_file'
  },
  gherkin: {
    features: [
      './tests/Web/features/*.feature',
      './tests/API/features/*.feature'
    ],
    steps: [
      './tests/Web/steps/saucedemo_steps_definition.ts',
      './tests/API/steps/reqres_steps_definition.ts'
    ]
  },
  plugins: {
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
      outputDir: 'output',
    },
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  }
}