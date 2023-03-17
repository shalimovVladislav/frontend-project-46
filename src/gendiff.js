import _ from 'lodash';
import filePathtoObject from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = filePathtoObject(filepath1);
  const obj2 = filePathtoObject(filepath2);
  const spacesCount = 2;
  const replacer = ' ';
  const iter = (node1, node2, depth) => {
    const keys = _.uniq([...Object.keys(node1), ...Object.keys(node2)].sort());

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = keys.reduce((acc, key) => {
      if (_.isObject(node1[key]) && _.isObject(node2[key])) {
        return [...acc, `${currentIndent}${currentIndent}${key}: ${iter(node1[key], node2[key], depth + 2)}`];
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
