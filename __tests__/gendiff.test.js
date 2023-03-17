import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

test('flat json comparisons', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
});

test('flat yaml comparisons', () => {
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
});

test('nested json comparisons', () => {
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json')).toEqual(
    `{
    common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
        key5: value5
      }
      setting6: {
        doge: {
        - wow: 
        + wow: so much
        }
        key: value
      + ops: vops
      }
    }
    group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
        key: value
      }
    + nest: str
    }
  - group2: {
      abc: 12345
      deep: {
        id: 45
      }
    }
  + group3: {
      deep: {
        id: {
          number: 45
        }
      }
      fee: 100500
    }
}`,
  );
});

test('nested yml comparisons', () => {
  expect(genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml')).toEqual(
    `{
    common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
        key5: value5
      }
      setting6: {
        doge: {
        - wow: 
        + wow: so much
        }
        key: value
      + ops: vops
      }
    }
    group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
        key: value
      }
    + nest: str
    }
  - group2: {
      abc: 12345
      deep: {
        id: 45
      }
    }
  + group3: {
      deep: {
        id: {
          number: 45
        }
      }
      fee: 100500
    }
}`,
  );
});
