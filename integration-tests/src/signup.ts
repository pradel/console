import Chromeless from 'chromeless'
const cuid = require('cuid')
import { config, CONSOLE_URL } from './config'

export default async (): Promise<any> =>  {
  const chromeless = new Chromeless(config)

  const cookies = await chromeless
    .goto(CONSOLE_URL + '/signup')
    .wait(1000)
    .wait('button[type="submit"]')
    .type(`test-${cuid()}@graph.cool`, 'input[type="email"]')
    .type(`asdfasdf`, 'input[type="password"]')
    .type(`Bob`, 'input[type="text"]')
    .click('button[type="submit"]')
    .wait(3000)
    // done with signup
    .wait('input[data-test="source"]')
    // THIS IS CRITICAL AS IT IS USED IN NILANS SCRIPTS
    .type('I am a Test', 'input[data-test="source"]')
    .click('div[data-test="open-console"]')
    // done with giving signup data
    .cookiesGet()

  return cookies
}
