import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

test('flat json comparisons', () => {
  expect(genDiff('./__fixtures__/file1.json', './/__fixtures__/file2.json')).toEqual(
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
  expect(genDiff('./__fixtures__/file1.yml', './/__fixtures__/file2.yml')).toEqual(
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
