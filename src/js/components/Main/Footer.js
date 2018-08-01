import React from 'react';

import images from '../../utils/importAllImages';
import styles from './Footer.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <img src={images['./footer.jpg']} />
    </div>
  );
}
