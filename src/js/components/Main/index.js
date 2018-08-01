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
        <div className="grid-container" data-sticky-container>
          <img
            src={images['./balloons.svg']}
            id="katyandchris"
            className="katyandchris hide-for-large"
            alt="Katy and Chris"
            data-sticky-wrap
            data-margin-top="100"
          />
          <div className="grid-x grid-margin-x align-center">
            <div className="cell show-for-large large-4 text-center">
              <img
                src={images['./balloons.svg']}
                id="katyandchris"
                className="katyandchris_desktop"
                alt="Katy and Chris"
                data-sticky-wrap
                data-margin-top="100"
              />
            </div>
            <div className="cell small-11 large-7 large-offset-1">
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
