import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      return stylish(tree);
  }
};

export default formatter;
