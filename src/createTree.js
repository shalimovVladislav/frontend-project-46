import _ from 'lodash';

const createTree = (node1, node2) => {
  const keys = _.uniq([...Object.keys(node1), ...Object.keys(node2)].sort());
  const tree = keys.map((key) => {
    if (_.isObject(node1[key]) && _.isObject(node2[key])) {
      return { type: 'nested', key, children: createTree(node1[key], node2[key]) };
    }
    if (_.isObject(node1[key])) {
      return { type: 'remove', key, val: node1[key] };
    }
    if (_.isObject(node2[key])) {
      return { type: 'add', key, val: node2[key] };
    }
    if (node1[key] === node2[key]) {
      return { type: 'equal', key, val: node1[key] };
    }
    if (node1[key] === node2[key]) {
      return { type: 'equal', key, val: node1[key] };
    }
    if (_.has(node1, key) && _.has(node2, key)) {
      return { type: 'not equal', key, val: [node1[key], node2[key]] };
    }
    if (_.has(node1, key)) {
      return { type: 'remove', key, val: node1[key] };
    }
    return { type: 'add', key, val: node2[key] };
  });

  return tree;
};

export default createTree;
