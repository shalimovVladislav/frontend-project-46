import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const readFile = (file) => fs.readFileSync(path.resolve(cwd(), `./__tests__/${file}`), 'utf-8');
const casesWithFormat = [
  ['./__fixtures__/file3.json', './__fixtures__/file4.json', 'stylish-result.txt', ''],
  ['./__fixtures__/file3.yml', './__fixtures__/file4.yml', 'stylish-result.txt', ''],
  ['./__fixtures__/file3.json', './__fixtures__/file4.json', 'stylish-result.txt', 'stylish'],
  ['./__fixtures__/file3.yml', './__fixtures__/file4.yml', 'stylish-result.txt', 'stylish'],
  ['./__fixtures__/file3.json', './__fixtures__/file4.json', 'plain-result.txt', 'plain'],
  ['./__fixtures__/file3.yml', './__fixtures__/file4.yml', 'plain-result.txt', 'plain'],
  ['./__fixtures__/file3.json', './__fixtures__/file4.json', 'json-result.txt', 'json'],
  ['./__fixtures__/file3.yml', './__fixtures__/file4.yml', 'json-result.txt', 'json'],
];

test.each(casesWithFormat)('genDiff main functional', (filepath1, filepath2, resultFile, format) => {
  const result = readFile(resultFile);
  expect(genDiff(filepath1, filepath2, format)).toEqual(result);
});
