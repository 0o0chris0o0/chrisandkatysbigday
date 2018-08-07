import React from 'react';
import PropTypes from 'prop-types';

import styles from './Hotels.scss';
import images from '../../../utils/importAllImages';

export default function Hotels() {
  return (
    <div className={styles.textBlock}>
      <div className={styles.balloonContainer}>
        <img src={images['./balloons_1.svg']} className={styles.leftBalloon} />
        <img src={images['./balloons_2.svg']} className={styles.rightBalloon} />
      </div>
      <div className={`text-center ${styles.textContainer}`}>
        <h2>Hotel Information</h2>
        <div className="grid-x grid-margin-x grid-margin-y">
          <div className="cell small-6">
            <p className={styles.line}>
              <span>Hintlesham Hall Hotel</span>
              <span>IP8 3NS</span>
              <span>01473 652334</span>
            </p>
          </div>
          <div className="cell small-6">
            <p className={styles.line}>
              <span>Best Western Ipswich Hotel</span>
              <span>IP8 3JD</span>
              <span>01473 209988</span>
            </p>
          </div>
          <div className="cell small-6">
            <p>
              <span>Premier Inn, Chantry Park </span>
              <span>IP8 3AR</span>
              <a
                href="https://www.premierinn.com/gb/en/hotels/england/suffolk/ipswich/ipswich-chantry-park.html"
                target="_blank"
              >
                www.premierinn.com
              </a>
            </p>
          </div>
          <div className="cell small-6">
            <p>
              <span>Holiday Inn Ipswich</span>
              <span>IP2 0UA</span>
              <a
                href="https://www.ihg.com/holidayinn/hotels/gb/en/ipswich/ipwwe/hoteldetail"
                target="_blank"
              >
                www.holidayinn.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Hotels.propTypes = {
  name: PropTypes.string
};
