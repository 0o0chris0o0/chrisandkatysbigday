import Handlebars from 'handlebars';
import fs from 'fs-extra';

import paths from '../../config/paths';

function getPartialFilenames() {
  return new Promise(resolve => {
    // read all filenames from 'src/partials'
    fs.readdir('src/partials', (err, files) => {
      resolve(files);
    });
  });
}

function readPartial(file, cb) {
  // reads each partial and returns the source
  fs.readFile(`src/partials/${file}`, 'utf-8', (error, source) => {
    cb(source);
  });
}

function getPartials(filenames) {
  return new Promise(resolve => {
    const requests = filenames.map(filename => {
      return new Promise(resolve2 => {
        readPartial(filename, resolve2);
      });
    });

    Promise.all(requests).then(partials => {
      resolve(partials);
    });
  });
}

function createHtml(metadata) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      paths[process.env.PHP ? 'templatePhp' : 'templateHtml'],
      'utf-8',
      (error, source) => {
        if (error) {
          reject(error);
        } else {
          const template = Handlebars.compile(source);
          const compiledHtml = template(metadata);

          resolve(compiledHtml);
        }
      }
    );
  });
}

export default async function buildIndex() {
  const filenames = await getPartialFilenames();
  const partials = await getPartials(filenames);

  // register all partials with Handlebars
  const partialObj = {};
  partials.forEach((partial, i) => {
    partialObj[filenames[i].replace('.handlebars', '')] = partial;
  });
  Handlebars.registerPartial(partialObj);

  createHtml()
    .then(compiledHtml => {
      fs.writeFile(paths.appHtml, compiledHtml, err => {
        if (err) {
          throw err;
        }
      });
    })
    .catch(error => {
      throw error;
    });
}
