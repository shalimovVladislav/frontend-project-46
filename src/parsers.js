import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import yaml from 'js-yaml';

const filePathtoObject = (filePath) => {
  const fileExtension = path.extname(filePath);
  const correctFilePath = path.resolve(cwd(), filePath);
  const file = fs.readFileSync(correctFilePath, 'utf-8');
  let object;
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    object = yaml.load(file);
  }
  if (fileExtension === '.json') {
    object = JSON.parse(file);
  }
  return object;
};

export default filePathtoObject;
