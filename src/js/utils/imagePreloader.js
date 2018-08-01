// import imagesLoaded from 'imagesloaded';

import images from './importAllImages';

export default function Preload(targets) {
  return new Promise(resolve => {
    const preloadedImages = [];
    const promises = [];
    for (let i = 0; i < targets.length; i++) {
      if (images[`./${targets[i]}`]) {
        preloadedImages[i] = new Image();
        promises[i] = new Promise(resolve1 => {
          preloadedImages[i].onload = resolve1;
        });
        preloadedImages[i].src = images[`./${targets[i]}`];
      } else {
        console.error(`error preloading image "./${targets[i]}"`);
      }
    }
    Promise.all(promises).then(() => resolve());
  });
}
