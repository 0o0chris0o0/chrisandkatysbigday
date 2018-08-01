import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import styles from './RSVP.scss';

export default class RSVP extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        RSVP<button>SEND</button>
      </div>
    );
  }
}

RSVP.propTypes = {
  name: PropTypes.string
};
