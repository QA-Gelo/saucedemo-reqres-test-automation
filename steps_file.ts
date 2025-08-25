const { I } = inject()

declare namespace CodeceptJS {
  interface I {
    loginAs(userType: string): void;
  }
}

// For the sake of the assessment, credentials will not be stored in a separate file.
const credentials: Record<string, string> = {
  standard_user: 'secret_sauce',
  problem_user: 'secret_sauce',
  locked_out_user: 'secret_sauce',
  performance_glitch_user: 'secret_sauce',
};

export = function() {
  return actor({

  async loginAs(userType: string) {
    I.amOnPage('/');
    I.fillField('[id=user-name]', userType);
    I.fillField('[id=password]', credentials[userType] || '');
    I.click('[id=login-button]');
    I.seeInTitle('Swag Labs');
    I.see('Products')
  }

  });
}