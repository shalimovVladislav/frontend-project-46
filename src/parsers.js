import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import yaml from 'js-yaml';

const filePathtoObject = (filePath) => {
  const fileExtension = path.extname(filePath);
  const correctFilePath = path.resolve(cwd(), filePath);
  const file = fs.readFileSync(correctFilePath, 'utf-8');
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return yaml.load(file);
  }
  return JSON.parse(file);
};

export default filePathtoObject;
