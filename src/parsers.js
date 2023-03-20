import yaml from 'js-yaml';

const parsers = (data, fileExtension) => {
  switch (fileExtension) {
    case '.yml' || '.yaml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      throw new Error('parsers switch exception.');
  }
};

export default parsers;
