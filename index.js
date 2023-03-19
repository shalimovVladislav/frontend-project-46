import filePathtoObject from './src/parsers.js';
import createTree from './src/createTree.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const obj1 = filePathtoObject(filepath1);
  const obj2 = filePathtoObject(filepath2);
  const tree = createTree(obj1, obj2);
  const result = formatter(tree, format);
  return result;
};

export default genDiff;
