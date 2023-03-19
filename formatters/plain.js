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
    const lines = nodes.map((node) => {
      switch (node.type) {
        case 'nested':
          return iter(node.children, [...path, node.key]);
        case 'remove':
          return `Property '${[...path, node.key].join('.')}' was removed`;
        case 'add': {
          const value = stringifyPlain(node.val);
          return `Property '${[...path, node.key].join('.')}' was added with value: ${value}`;
        }
        case 'equal':
          return '';
        case 'not equal': {
          const value0 = stringifyPlain(node.val[0]);
          const value1 = stringifyPlain(node.val[1]);
          return `Property '${[...path, node.key].join('.')}' was updated. From ${value0} to ${value1}`;
        }
        default:
          throw new Error('plain switch exception.');
      }
    });
    return [
      ...lines,
    ].filter((line) => line !== '').join('\n');
  };
  return iter(nodesArray, []);
};

export default plain;
