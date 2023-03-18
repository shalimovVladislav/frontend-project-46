const stylish = (nodesArray, replacer = ' ', spacesCount = 4) => {
  const iter = (nodes, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const shiftLeftIndent = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = nodes.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${currentIndent}${node.key}: ${iter(node.children, depth + 1)}`;
        case 'remove':
          return `${shiftLeftIndent}- ${node.key}: ${node.val}`;
        case 'add':
          return `${shiftLeftIndent}+ ${node.key}: ${node.val}`;
        case 'equal':
          return `${currentIndent}${node.key}: ${node.val}`;
        case 'not equal':
          return `${shiftLeftIndent}- ${node.key}: ${node.val[0]}\n${shiftLeftIndent}+ ${node.key}: ${node.val[1]}`;
        default:
          throw new Error('Stylish switch exception.');
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(nodesArray, 1);
};

export default stylish;
