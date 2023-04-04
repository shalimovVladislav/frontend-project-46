import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import parseData from './parsers.js';
import createTree from './createTree.js';
import formatter from './formatters/index.js';

const genDiff = (filePath1, filePath2, format) => {
  const fileExtension1 = path.extname(filePath1);
  const fileExtension2 = path.extname(filePath2);
  const fullFilePath1 = path.resolve(cwd(), filePath1);
  const fullFilePath2 = path.resolve(cwd(), filePath2);
  const file1 = fs.readFileSync(fullFilePath1, 'utf-8');
  const file2 = fs.readFileSync(fullFilePath2, 'utf-8');
  const obj1 = parseData(file1, fileExtension1);
  const obj2 = parseData(file2, fileExtension2);
  const tree = createTree(obj1, obj2);
  const result = formatter(tree, format);
  return result;
};

export default genDiff;
