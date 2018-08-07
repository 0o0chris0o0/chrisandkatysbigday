import React from 'react';
import PropTypes from 'prop-types';

import styles from './Venue.scss';
import images from '../../../utils/importAllImages';

import Taxi from './Taxi';

export default class Venue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.venueContainer}>
        <div className={styles.textBlock}>
          <div className={styles.balloonContainer}>
            <img src={images['./balloons_1.svg']} className={styles.leftBalloon} />
            <img src={images['./balloons_2.svg']} className={styles.rightBalloon} />
          </div>
          <div className={`text-center ${styles.textContainer}`}>
            <div className="grid-x grid-margin-x grid-margin-y align-middle">
              <div className="cell small-12 medium-6">
                <h2 className={styles.heading}>Venue Information</h2>
                <div className={styles.address}>
                  <span>The Tudor Barn</span>
                  <span>Belstead Hall</span>
                  <span>Belstead</span>
                  <span>Ipswich</span>
                  <span>IP8 3JT</span>
                </div>
                <p className={styles.extraText}>
                  Guests can leave their cars at the barn overnight if they find themselves unable
                  to walk in a straight line.
                </p>
              </div>
              <div className="cell small-12 medium-6">
                <img src={images['./map.svg']} className={styles.image} />
              </div>
            </div>
          </div>
        </div>
        <Taxi images={images} />
      </div>
    );
  }
}

Venue.propTypes = {
  name: PropTypes.string
};
