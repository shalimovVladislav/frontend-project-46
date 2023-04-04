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

const getIndentSize = (depth) => depth * spacesCount;

const getCurrentIndent = (indentSize) => replacer.repeat(indentSize - 2);

const getBracketIndent = (indentSize) => replacer.repeat(indentSize - spacesCount);

const stylish = (nodesArray) => {
  const iter = (nodes, depth) => {
    const indentSize = getIndentSize(depth);
    const currentIndent = getCurrentIndent(indentSize);
    const bracketIndent = getBracketIndent(indentSize);
    const lines = nodes.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return `${currentIndent}  ${node.key}: ${iter(node.children, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${node.key}: ${stringify(node.value, depth + 1, replacer, spacesCount)}`;
        case 'added':
          return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth + 1, replacer, spacesCount)}`;
        case 'equal':
          return `${currentIndent}  ${node.key}: ${node.value}`;
        case 'modified':
          return [
            `${currentIndent}- ${node.key}: ${_.isObject(node.oldValue) ? stringify(node.oldValue, depth + 1) : node.oldValue}`,
            `${currentIndent}+ ${node.key}: ${_.isObject(node.newValue) ? stringify(node.newValue, depth + 1) : node.newValue}`,
          ];
        default:
          throw new Error(`Unknown type of data: ${node.type}`);
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(nodesArray, 1);
};

export default stylish;
