import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

test('flat json comparisons', () => {
  expect(genDiff('/home/vladislav_shalimov/frontend-project-46/__fixtures__/file1.json', '/home/vladislav_shalimov/frontend-project-46/__fixtures__/file2.json')).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
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
