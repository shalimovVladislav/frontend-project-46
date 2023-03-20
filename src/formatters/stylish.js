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
          return `${shiftLeftIndent}- ${node.key}: ${_.isObject(node.val[0]) ? stringify(node.val[0], depth + 1) : node.val[0]}
${shiftLeftIndent}+ ${node.key}: ${_.isObject(node.val[1]) ? stringify(node.val[1], depth + 1) : node.val[1]}`;
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
