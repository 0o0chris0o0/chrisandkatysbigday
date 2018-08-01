// function to import all images

const images = {};

function importAll(r, obj) {
  r.keys().forEach(key => obj[key] = r(key));
}

// At build-time cache will be populated with all required images.
importAll(
  require.context('../../assets/img/', true, /\.(jpg|jpeg|svg|png)$/),
  images
);

export default images;
