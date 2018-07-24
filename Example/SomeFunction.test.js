import {plus} from './SomeFunction';

import {minus} from './SomeFunction';

import {test_plus_a,test_plus_b,test_plus_result} from './SomeFunction.mock';

import {test_minus_a,test_minus_b,test_minus_result} from './SomeFunction.mock';

test('test plus', () => {
    expect(plus(1,2)).toEqual(3);
});

test('test minus', () => {
    expect(minus(1,2)).toEqual(-1);
});

