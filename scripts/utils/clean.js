import fs from 'fs-extra';
import paths from '../../config/paths';

async function clean() {
  return new Promise((resolve, reject) => {
    fs.remove(`${paths.appPublic}`, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export default clean;
