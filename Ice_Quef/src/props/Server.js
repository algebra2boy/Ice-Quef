import Env from 'react-native-config';

function ServerAddress() {
  // Access the server hostname using Env
  const hostname = Env.SERVER_HOSTNAME;
  return `${hostname}/`;
}

export default ServerAddress;
