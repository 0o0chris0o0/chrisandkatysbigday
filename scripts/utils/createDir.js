import fs from 'fs';
import paths from '../../config/paths';

async function createDir() {
  return new Promise((resolve, reject) => {
    fs.mkdir(`${paths.appPublic}`, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export default createDir;
