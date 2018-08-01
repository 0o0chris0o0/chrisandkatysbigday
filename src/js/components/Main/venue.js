import React from 'react';
import PropTypes from 'prop-types';

import styles from './main.scss';
import images from '../../utils/importAllImages';

export default function Venue({ id }) {
  return (
    <div className={styles.textBlock} id={id}>
      <div className={styles.balloonContainer}>
        <img src={images['./balloons_1.svg']} className={styles.leftBalloon} />
        <img src={images['./balloons_2.svg']} className={styles.rightBalloon} />
      </div>
      <div className={styles.textContainer}>
        <h2>Venue Information</h2>
        <p>
          hello this is some content, lorem ipsum dolor sit amet consectetur
          adipisicing elit. Vero possimus cumque omnis asperiores odio
          cupiditate voluptate dignissimos accusamus quibusdam error eveniet eos
          doloribus repudiandae dolore sint veritatis quis, deserunt illum?
        </p>
      </div>
    </div>
  );
}

Venue.defaultProps = {
  id: null
};

Venue.propTypes = {
  id: PropTypes.string
};
