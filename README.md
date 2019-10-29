Welcome,

This is a simple test framework built with Node/JavaScript, Selenium, and Cucumber. It's purpose is to show basic practical competency of testing best practices.

# Steps to run tests

1. Download Node.js/NPM on your machine
   https://blog.teamtreehouse.com/install-node-js-npm-windows
   https://blog.teamtreehouse.com/install-node-js-npm-mac
2. Clone test repository
3. Add the webdriver to your path
   3a. The firefox driver can be found in the repro at features/drivers/geckodriver
   3b. Edit your .bash_profile or .zshrc file. Add export to your path. (e.g. `export PATH=$PATH:/Users/reast/development/interview_tests/WSECU/features/drivers`)
4. run `npm install`
5. run `npm run test`

# Next todos

- // TODO (reast): Pull data from spreadsheet instead of data object
- // TODO (reast): Make page locators more dynamic and not default to className in parent class
- // TODO (reast): Get mobile size testing working because landing login element disapears in this view
- //TODO (reast): Chrome tests fail in between sceanrios for unknown reason

Cheers :0)
