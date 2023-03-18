import filePathtoObject from './parsers.js';
import createTree from './createTree.js';
import stylish from './stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = filePathtoObject(filepath1);
  const obj2 = filePathtoObject(filepath2);
  const tree = createTree(obj1, obj2);
  let result;
  switch (format) {
    case 'stylish':
      result = stylish(tree);
      break;
    case 'plain':
      break;
    case 'json':
      break;
    default:
      throw new Error('genDiff switch exception.');
  }
  return result;
};
export default genDiff;
