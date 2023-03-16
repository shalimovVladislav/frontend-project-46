import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const correctFilepath1 = path.resolve(cwd());
  console.log(correctFilepath1);
  const correctFilepath2 = path.resolve(cwd());
  console.log(correctFilepath1);
  const file1 = fs.readFileSync(correctFilepath1, 'utf-8');
  const file2 = fs.readFileSync(correctFilepath2, 'utf-8');
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const spacesCount = 2;
  const replacer = ' ';
  const iter = (node1, node2, depth) => {
    const keys = _.uniq([...Object.keys(node1), ...Object.keys(node2)].sort());

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = keys.reduce((acc, key) => {
      if (_.isObject(node1[key]) && _.isObject(node2[key])) {
        return [...acc, `${currentIndent.repeat(2)}${key}: ${iter(node1[key], node2[key], depth + 2)}`];
      }

      /* if (_.isObject(node1[key])) {

      }
      if (_.isObject(node2[key])) {

      } */

      if (node1[key] === node2[key]) {
        return [...acc, `${currentIndent}  ${key}: ${node1[key]}`];
      }
      if (_.has(node1, key)) {
        acc.push(`${currentIndent}- ${key}: ${node1[key]}`);
      }
      if (_.has(node2, key)) {
        acc.push(`${currentIndent}+ ${key}: ${node2[key]}`);
      }
      return acc;
    }, []);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(obj1, obj2, 1);
};

export default genDiff;