import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const stringify = (initialNode, initialDepth) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .keys(node)
      .map((key) => `${currentIndent}${key}: ${iter(node[key], depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(initialNode, initialDepth);
};

const getIndent = (depth) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize - 2);
};

const getBracketIndent = (depth) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize - spacesCount);
};

const stylish = (nodesArray) => {
  const iter = (nodes, depth) => {
    const indent = getIndent(depth);
    const lines = nodes.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return `${indent}  ${node.key}: ${iter(node.children, depth + 1)}`;
        case 'removed':
          return `${indent}- ${node.key}: ${stringify(node.value, depth + 1, replacer, spacesCount)}`;
        case 'added':
          return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1, replacer, spacesCount)}`;
        case 'equal':
          return `${indent}  ${node.key}: ${node.value}`;
        case 'modified':
          return [
            `${indent}- ${node.key}: ${_.isObject(node.oldValue) ? stringify(node.oldValue, depth + 1) : node.oldValue}`,
            `${indent}+ ${node.key}: ${_.isObject(node.newValue) ? stringify(node.newValue, depth + 1) : node.newValue}`,
          ];
        default:
          throw new Error(`Unknown type of data: ${node.type}`);
      }
    });
    return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
  };

  return iter(nodesArray, 1);
};

export default stylish;
