import _ from 'lodash';

const createTree = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));
  const result = keys.sort().map((key) => {
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return { type: 'nested', key, children: createTree(before[key], after[key]) };
    }
    if (before[key] === after[key]) {
      return { type: 'equal', key, value: before[key] };
    }
    if (!_.has(before, key) && _.has(after, key)) {
      return { type: 'added', key, value: after[key] };
    }
    if (_.has(before, key) && !_.has(after, key)) {
      return { type: 'removed', key, value: before[key] };
    }
    return {
      type: 'modified', key, oldValue: before[key], newValue: after[key],
    };
  });

  return result;
};

export default createTree;
