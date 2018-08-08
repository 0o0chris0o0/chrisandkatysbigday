import React from 'react';
import PropTypes from 'prop-types';

import styles from './Taxi.scss';

export default function Taxi({ images }) {
  return (
    <div className={`grid-x grid-margin-x grid-margin-y align-middle ${styles.taxiContainer}`}>
      <div className="cell small-6 large-shrink text-center">
        <div className={styles.taxi}>
          <div className={styles.taxiInner}>
            <img src={images['./string.svg']} className={styles.stringa} />
            <img src={images['./string.svg']} className={styles.stringb} />
            <span>Ipswich Taxis</span>
            <span>07794 536867</span>
          </div>
        </div>
      </div>
      <div className="cell small-6 large-auto text-center">
        <div className={styles.taxi}>
          <div className={styles.taxiInner}>
            <img src={images['./string.svg']} className={styles.stringa} />
            <img src={images['./string.svg']} className={styles.stringb} />
            <span>JR Executive Travel</span>
            <span>01473 255050</span>
          </div>
        </div>
      </div>
      <div className="cell small-6 large-shrink text-center">
        <div className={styles.taxi}>
          <div className={styles.taxiInner}>
            <img src={images['./string.svg']} className={styles.stringa} />
            <img src={images['./string.svg']} className={styles.stringb} />
            <span>Avenue Taxis</span>
            <span>01473 888888</span>
          </div>
        </div>
      </div>
      <div className="cell small-6 large-shrink text-center">
        <div className={styles.taxi}>
          <div className={styles.taxiInner}>
            <img src={images['./string.svg']} className={styles.stringa} />
            <img src={images['./string.svg']} className={styles.stringb} />
            <span>Cabs Smart</span>
            <span>01473 404142</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Taxi.propTypes = {
  name: PropTypes.string
};
