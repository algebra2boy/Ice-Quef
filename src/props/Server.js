import config from '../../config.json';
/**
 * The server's address
 *
 * @returns { string } The server's address
 */
function ServerAddress() {
  const { hostname } = config.server;
  return `${hostname}/`;
}

export default ServerAddress;
