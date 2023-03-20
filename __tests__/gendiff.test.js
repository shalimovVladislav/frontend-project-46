import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('nested comparisons in stylish format', () => {
  const fullFilePath = path.resolve(cwd(), './__tests__/stylish-result.txt');
  const result = fs.readFileSync(fullFilePath, 'utf-8');
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json')).toEqual(result);
});

test('nested comparisons in stylish format', () => {
  const fullFilePath = path.resolve(cwd(), './__tests__/stylish-result.txt');
  const result = fs.readFileSync(fullFilePath, 'utf-8');
  expect(genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml')).toEqual(result);
});

test('nested json comparisons in plain format', () => {
  const fullFilePath = path.resolve(cwd(), './__tests__/plain-result.txt');
  const result = fs.readFileSync(fullFilePath, 'utf-8');
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'plain')).toEqual(result);
});

test('nested yml comparisons in plain format', () => {
  const fullFilePath = path.resolve(cwd(), './__tests__/plain-result.txt');
  const result = fs.readFileSync(fullFilePath, 'utf-8');
  expect(genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml', 'plain')).toEqual(result);
});

test('nested json comparisons in json format', () => {
  const fullFilePath = path.resolve(cwd(), './__tests__/json-result.txt');
  const result = fs.readFileSync(fullFilePath, 'utf-8');
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'json')).toEqual(result);
});

test('nested yml comparisons in json format', () => {
  const fullFilePath = path.resolve(cwd(), './__tests__/json-result.txt');
  const result = fs.readFileSync(fullFilePath, 'utf-8');
  expect(genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml', 'json')).toEqual(result);
});
