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

export default stringify;
