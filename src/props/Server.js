import config from '../../config.json';

function ServerAddress() {
  const { hostname } = config.server;
  return `${hostname}/`;
}

export default ServerAddress;
