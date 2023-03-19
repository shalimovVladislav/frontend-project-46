import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error('formatter switch exception.');
  }
};

export default formatter;
