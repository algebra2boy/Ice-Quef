import * as React from 'react';
import { Asset } from 'expo-asset';

/**
 * Loads and caches images from bundles
 *
 * @return { boolean } Returns true if all images were successfully loaded,
 * returns false otherwise.
 */
const images = [require('../../assets/images/3D_Logo.png')];

function loadImages() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const cacheResources = async () => {
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  React.useEffect(() => {
    const loadResources = async () => {
      await cacheResources();
      setIsLoaded(true);
    };

    loadResources();
  }, []);

  return isLoaded;
}

export default loadImages;