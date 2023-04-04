import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const readingFiles = (format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return fs.readFileSync(path.resolve(cwd(), './__tests__/stylish-result.txt'), 'utf-8');
    case 'plain':
      return fs.readFileSync(path.resolve(cwd(), './__tests__/plain-result.txt'), 'utf-8');
    case 'json':
      return fs.readFileSync(path.resolve(cwd(), './__tests__/json-result.txt'), 'utf-8');
    default:
      throw new Error('readingFiles switch exception.');
  }
};

test('nested comparisons in default format', () => {
  const result = readingFiles();
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json')).toEqual(result);
  expect(genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml')).toEqual(result);
});

test('nested comparisons in stylish format', () => {
  const result = readingFiles('stylish');
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'stylish')).toEqual(result);
  expect(genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml', 'stylish')).toEqual(result);
});

test('nested comparisons in plain format', () => {
  const result = readingFiles('plain');
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'plain')).toEqual(result);
  expect(genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml', 'plain')).toEqual(result);
});

test('nested comparisons in json format', () => {
  const result = readingFiles('json');
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'json')).toEqual(result);
  expect(genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml', 'json')).toEqual(result);
});
