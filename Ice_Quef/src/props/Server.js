import config from '../../config.json'

function ServerAddress() {
  //TODO replace with the backend url in the future
  const { hostname } = config.server;
  return `${hostname}/`;
}

export default ServerAddress;
