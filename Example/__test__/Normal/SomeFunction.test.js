import {plus} from '../../Normal/SomeFunction.js';

import {minus} from '../../Normal/SomeFunction.js';

import {test_plus_a, test_plus_b, test_plus_result} from './SomeFunction.mock.js';

import {test_minus_a, test_minus_b, test_minus_result} from './SomeFunction.mock.js';

test('test plus', () => {
    expect(plus(test_plus_a, test_plus_b)).toEqual(test_plus_result);
});

test('test minus', () => {
    expect(minus(test_minus_a, test_minus_b)).toEqual(test_minus_result);
});

