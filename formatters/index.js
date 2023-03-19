import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (tree, format = 'stylish') => {
  let result;
  switch (format) {
    case 'stylish':
      result = stylish(tree);
      break;
    case 'plain':
      result = plain(tree);
      break;
    case 'json':
      break;
    default:
      throw new Error('formatter switch exception.');
  }
  return result;
};

export default formatter;
