import yaml from 'js-yaml';

const parsers = {
  '.yml': yaml.load,
  '.yaml': yaml.load,
  '.json': JSON.parse,
};

const parseData = (data, extension) => {
  const parser = parsers[extension];
  if (!parser) {
    throw new Error(`Unsupported file extension: ${extension}`);
  }
  return parser(data);
};

export default parseData;
