import multiply from '../../Default/DefaultFunction.js';

import {test_multiply_a, test_multiply_b, test_multiply_result} from './DefaultFunction.mock.js';

test('test multiply', () => {
    expect(multiply(test_multiply_a, test_multiply_b)).toEqual(test_multiply_result);
});

