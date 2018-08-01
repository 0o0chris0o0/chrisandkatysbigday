import React from 'react';

import images from '../utils/importAllImages';

export default function Plane() {
  return (
    <div className="plane">
      <img src={images['./plane.svg']} />
    </div>
  );
}
