import _ from 'lodash';

const stringifyPlain = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};
const plain = (nodesArray) => {
  const iter = (nodes, path) => {
    const lines = nodes.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return iter(node.children, [...path, node.key]);
        case 'removed':
          return `Property '${[...path, node.key].join('.')}' was removed`;
        case 'added': {
          const stringifyValue = stringifyPlain(node.value);
          return `Property '${[...path, node.key].join('.')}' was added with value: ${stringifyValue}`;
        }
        case 'modified': {
          return `Property '${[...path, node.key].join('.')}' was updated. From ${stringifyPlain(node.oldValue)} to ${stringifyPlain(node.newValue)}`;
        }
        case 'equal': {
          return [];
        }
        default:
          throw new Error('plain switch exception.');
      }
    });
    return lines.join('\n');
  };
  return iter(nodesArray, []);
};

export default plain;
