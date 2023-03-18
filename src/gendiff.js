import filePathtoObject from './parsers.js';
import createTree from './createTree.js';
import stylish from './stylish.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = filePathtoObject(filepath1);
  const obj2 = filePathtoObject(filepath2);
  const tree = createTree(obj1, obj2);
  return stylish(tree);
};
export default genDiff;
