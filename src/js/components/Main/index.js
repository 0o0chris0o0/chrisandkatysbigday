import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'sticky-js';

import styles from './main.scss';
import images from '../../utils/importAllImages';
import copy from '../../../assets/copy.json';

import RSVP from './RSVP';
import Venue from './venue';
import Footer from './Footer';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.sticky = new Sticky('.katyandchris_desktop');
  }

  render() {
    return (
      <div className={styles.main}>
        <div data-sticky-container>
          <img
            src={images['./balloons.svg']}
            id="katyandchris"
            className="katyandchris is-hidden-desktop"
            alt="Katy and Chris"
            data-sticky-wrap
            data-margin-top="100"
          />
          <div className="columns is-centered">
            <div className="column is-hidden-touch desktop-4 is-centered">
              <img
                src={images['./balloons.svg']}
                id="katyandchris"
                className="katyandchris_desktop"
                alt="Katy and Chris"
                data-sticky-wrap
                data-margin-top="100"
              />
            </div>
            <div className="column is-11 desktop-7 is-offset-1">
              <RSVP />
              <Venue />
              <Venue />
              <Venue />
              <Venue id="bottom" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  name: PropTypes.string
};
