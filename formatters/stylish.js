import _ from 'lodash';
import stringify from '../src/stringify.js';

const stylish = (nodesArray, replacer = ' ', spacesCount = 4) => {
  const iter = (nodes, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const shiftLeftIndent = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = nodes.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${currentIndent}${node.key}: ${iter(node.children, depth + 1)}`;
        case 'remove':
          return `${shiftLeftIndent}- ${node.key}: ${stringify(node.val, depth + 1, replacer, spacesCount)}`;
        case 'add':
          return `${shiftLeftIndent}+ ${node.key}: ${stringify(node.val, depth + 1, replacer, spacesCount)}`;
        case 'equal':
          return `${currentIndent}${node.key}: ${node.val}`;
        case 'not equal':
          return `${shiftLeftIndent}- ${node.key}: ${_.isObject(node.val[0]) ? stringify(node.val[0], depth + 1) : node.val[0]}\n${shiftLeftIndent}+ ${node.key}: ${_.isObject(node.val[1]) ? stringify(node.val[1], depth + 1) : node.val[1]}`;
        default:
          throw new Error('stylish switch exception.');
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(nodesArray, 1);
};

export default stylish;
