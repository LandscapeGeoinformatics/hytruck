import { assert, describe, expect, test, it } from 'vitest'


// Example payload file
import maplayer_data from './data/maplayers-response.json';


// test files can have basic unit tests like this
test('Basic test: JSON', () => {

    expect(maplayer_data).toHaveProperty('layers');
})

// test files can have "suites" of tests like so
describe('parse maplayers response', () => {
  it('should have title', () => {
    const first_layer = maplayer_data.layers[0];
    expect(first_layer).toHaveProperty('title');
    console.debug(JSON.stringify(first_layer))
  })

})





