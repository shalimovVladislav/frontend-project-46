import _ from 'lodash';

const excludeСaseEqual = (nodeArray) => {
  const iter = (nodes) => {
    const result = nodes.reduce((acc, {
      type, key, value, children, newValue, oldValue,
    }) => {
      if (type === 'equal') {
        return acc;
      }
      if (type === 'modified') {
        return [...acc, {
          type, key, newValue, oldValue,
        }];
      }
      if (type === 'nested') {
        return [...acc, { type, key, children: iter(children) }];
      }
      return [...acc, { type, key, value }];
    }, []);
    return result;
  };
  return iter(nodeArray);
};
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
  const filteredNodesArray = excludeСaseEqual(nodesArray);
  const iter = (nodes, path) => {
    const lines = nodes.map((node) => {
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
          const stringifyOldValue = stringifyPlain(node.oldValue);
          const stringifyNewValue = stringifyPlain(node.newValue);
          return `Property '${[...path, node.key].join('.')}' was updated. From ${stringifyOldValue} to ${stringifyNewValue}`;
        }
        default:
          throw new Error('plain switch exception.');
      }
    });
    return lines.join('\n');
  };
  return iter(filteredNodesArray, []);
};

export default plain;
