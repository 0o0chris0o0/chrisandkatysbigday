import React from 'react';
import PropTypes from 'prop-types';

import styles from './Gifts.scss';
import images from '../../../utils/importAllImages';

export default function Gifts() {
  return (
    <div className={styles.textBlock}>
      <div className={styles.balloonContainer}>
        <img src={images['./balloons_1.svg']} className={styles.leftBalloon} />
        <img src={images['./balloons_2.svg']} className={styles.rightBalloon} />
      </div>
      <div className={`text-center ${styles.textContainer}`}>
        <h2>Gifts</h2>
        <p>
          <span>The most important thing is having you share our day</span>
          <span>No gifts are expected or needed to come our way</span>
          <span>But if you would like to help us after tying the knot</span>
          <span>You can contribute to our Disney honeymoon pot...</span>
          <a target="_blank" href="https://www.prezola.com/wishlists/10192357">
            prezola.com/wishlists/10192357
          </a>
        </p>
      </div>
    </div>
  );
}

Gifts.propTypes = {
  name: PropTypes.string
};
