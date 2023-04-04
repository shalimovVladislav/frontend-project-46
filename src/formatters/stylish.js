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

    const lines = nodes.map(({
      type, key, value, children, oldValue, newValue,
    }) => {
      if (type === 'nested') {
        return `${currentIndent}${key}: ${iter(children, depth + 1)}`;
      }
      if (type === 'removed') {
        return `${shiftLeftIndent}- ${key}: ${stringify(value, depth + 1, replacer, spacesCount)}`;
      }
      if (type === 'added') {
        return `${shiftLeftIndent}+ ${key}: ${stringify(value, depth + 1, replacer, spacesCount)}`;
      }
      if (type === 'equal') {
        return `${currentIndent}${key}: ${value}`;
      }
      return `${shiftLeftIndent}- ${key}: ${_.isObject(oldValue) ? stringify(oldValue, depth + 1) : oldValue}
${shiftLeftIndent}+ ${key}: ${_.isObject(newValue) ? stringify(newValue, depth + 1) : newValue}`;
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
