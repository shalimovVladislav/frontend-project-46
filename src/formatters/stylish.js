import _ from 'lodash';

const stringify = (initialNode, initialDepth, replacer = ' ', spacesCount = 4) => {
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

const stylish = (nodesArray, replacer = ' ', spacesCount = 4) => {
  const iter = (nodes, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const shiftLeftIndent = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = nodes.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return `${currentIndent}${node.key}: ${iter(node.children, depth + 1)}`;
        case 'removed':
          return `${shiftLeftIndent}- ${node.key}: ${stringify(node.value, depth + 1, replacer, spacesCount)}`;
        case 'added':
          return `${shiftLeftIndent}+ ${node.key}: ${stringify(node.value, depth + 1, replacer, spacesCount)}`;
        case 'equal':
          return `${currentIndent}${node.key}: ${node.value}`;
        case 'modified':
          return [
            `${shiftLeftIndent}- ${node.key}: ${_.isObject(node.oldValue) ? stringify(node.oldValue, depth + 1) : node.oldValue}`,
            `${shiftLeftIndent}+ ${node.key}: ${_.isObject(node.newValue) ? stringify(node.newValue, depth + 1) : node.newValue}`,
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
