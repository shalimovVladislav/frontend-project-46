import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

test('flat json comparisons in stylish format', () => {
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

test('flat yaml comparisons in stylish format', () => {
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

test('nested json comparisons in stylish format', () => {
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

test('nested yml comparisons in stylish format', () => {
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

test('nested json comparisons in plain format', () => {
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'plain')).toEqual(
    `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
  );
});

test('nested yml comparisons in plain format', () => {
  expect(genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml', 'plain')).toEqual(
    `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
  );
});

test('nested json comparisons in json format', () => {
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'json')).toEqual(
    '[{"type":"nested","key":"common","children":[{"type":"add","key":"follow","val":false},{"type":"equal","key":"setting1","val":"Value 1"},{"type":"remove","key":"setting2","val":200},{"type":"not equal","key":"setting3","val":[true,null]},{"type":"add","key":"setting4","val":"blah blah"},{"type":"add","key":"setting5","val":{"key5":"value5"}},{"type":"nested","key":"setting6","children":[{"type":"nested","key":"doge","children":[{"type":"not equal","key":"wow","val":["","so much"]}]},{"type":"equal","key":"key","val":"value"},{"type":"add","key":"ops","val":"vops"}]}]},{"type":"nested","key":"group1","children":[{"type":"not equal","key":"baz","val":["bas","bars"]},{"type":"equal","key":"foo","val":"bar"},{"type":"not equal","key":"nest","val":[{"key":"value"},"str"]}]},{"type":"remove","key":"group2","val":{"abc":12345,"deep":{"id":45}}},{"type":"add","key":"group3","val":{"deep":{"id":{"number":45}},"fee":100500}}]',
  );
});

test('nested yml comparisons in json format', () => {
  expect(genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml', 'json')).toEqual(
    '[{"type":"nested","key":"common","children":[{"type":"add","key":"follow","val":false},{"type":"equal","key":"setting1","val":"Value 1"},{"type":"remove","key":"setting2","val":200},{"type":"not equal","key":"setting3","val":[true,null]},{"type":"add","key":"setting4","val":"blah blah"},{"type":"add","key":"setting5","val":{"key5":"value5"}},{"type":"nested","key":"setting6","children":[{"type":"nested","key":"doge","children":[{"type":"not equal","key":"wow","val":["","so much"]}]},{"type":"equal","key":"key","val":"value"},{"type":"add","key":"ops","val":"vops"}]}]},{"type":"nested","key":"group1","children":[{"type":"not equal","key":"baz","val":["bas","bars"]},{"type":"equal","key":"foo","val":"bar"},{"type":"not equal","key":"nest","val":[{"key":"value"},"str"]}]},{"type":"remove","key":"group2","val":{"abc":12345,"deep":{"id":45}}},{"type":"add","key":"group3","val":{"deep":{"id":{"number":45}},"fee":100500}}]',
  );
});
