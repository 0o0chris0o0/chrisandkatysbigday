import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import styles from './RSVP.scss';
import images from '../../../utils/importAllImages';

export default class RSVP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [],
      formStatus: 'idle',
      authKey: null,
      rsvpValue: null,
      formErrors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateRsvp = this.updateRsvp.bind(this);
  }

  componentWillMount() {
    this.formLogin();
  }

  formLogin() {
    axios
      .post('https://formio.form.io/user/login', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: 'chrismartin5691@gmail.com',
          password: 'formJastg5'
        }
      })
      .then(response => {
        this.setState({
          authKey: response.headers['x-jwt-token']
        });
      });
  }

  componentDidMount() {
    this.getFormData();
  }

  getFormData() {
    axios.get('https://ztnimjwnxkytfhj.form.io/rsvp').then(response => {
      this.setState({
        formData: response.data.components
      });
    });
  }

  updateRsvp(value) {
    this.setState({
      rsvpValue: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { rsvpValue, authKey } = this.state;
    const names = document.getElementById('form-names').value;
    const dietary = document.getElementById('form-dietary').value;
    const dancefloor = document.getElementById('form-dancefloor').value;

    this.setState({
      formErrors: []
    });

    axios({
      url: 'https://ztnimjwnxkytfhj.form.io/rsvp/submission',
      method: 'post',
      headers: {
        'x-jwt-token': authKey,
        'Content-Type': 'application/json'
      },
      data: {
        data: {
          rsvp: rsvpValue,
          names,
          dietary,
          dancefloor
        }
      }
    })
      .then(() => {
        this.setState({
          formStatus: 'success'
        });
      })
      .catch(error => {
        const errors = error.response.data.details;
        const keys = [];

        for (let i = 0; i < errors.length; i++) {
          const key = errors[i].context.key;
          keys.push(key);
        }

        this.setState({
          formErrors: keys
        });
      });
  }

  render() {
    const { formData, rsvpValue, formStatus, formErrors } = this.state;

    const nameError = formErrors.indexOf('names') !== -1;
    const rsvpError = formErrors.indexOf('rsvp') !== -1;

    const formElems = formData.map(component => {
      let inputField;

      if (component.key === 'names') {
        inputField = (
          <label key={component.key} className={nameError ? styles.formError : ''}>
            {nameError ? (
              <span className={styles.errorMsg}>Please let us know who you are.</span>
            ) : 
              ''
            }
            {component.label}
            <input
              type="text"
              placeholder={component.placeholder}
              name={component.key}
              id={`form-${component.key}`}
            />
          </label>
        );
      } else if (component.key === 'rsvp') {
        inputField = (
          <div
            className={`${styles.rsvp} ${rsvpError ? styles.formError : ''}`}
            key={component.key}
          >
            {rsvpError ? (
              <span className={styles.errorMsg}>Please let us know either way.</span>
            ) : 
              ''
            }
            <div>
              <label
                htmlFor={`${component.key}-${component.values[0].value}`}
                className={rsvpValue === 'yes' ? styles.active : ''}
              >
                <input
                  className="is-hidden"
                  type="radio"
                  id={`${component.key}-${component.values[0].value}`}
                  name={component.key}
                  onChange={() => this.updateRsvp('yes')}
                />
                <img src={images[`./checkbox_${rsvpValue === 'yes' ? '' : 'un'}tick.svg`]} />
                {component.values[0].label}
              </label>
            </div>
            <div>
              <label
                htmlFor={`${component.key}-${component.values[1].value}`}
                className={rsvpValue === 'no' ? styles.active : ''}
              >
                <input
                  className="is-hidden"
                  type="radio"
                  id={`${component.key}-${component.values[1].value}`}
                  name={component.key}
                  onChange={() => this.updateRsvp('no')}
                />
                <img src={images[`./checkbox_${rsvpValue === 'no' ? '' : 'un'}tick.svg`]} />
                {component.values[1].label}
              </label>
            </div>
          </div>
        );
      } else {
        inputField = (
          <label key={component.key}>
            {component.label}
            <textarea name={component.key} id={`form-${component.key}`} cols="10" rows="4" />
          </label>
        );
      }

      return inputField;
    });

    return (
      <div className={styles.textBlock}>
        <div className={styles.balloonContainer}>
          <img src={images['./balloons_1.svg']} className={styles.leftBalloon} />
          <img src={images['./balloons_2.svg']} className={styles.rightBalloon} />
        </div>
        <div className={styles.textContainer}>
          <h2>RSVP</h2>
          {formStatus !== 'success' ? (
            <form className={styles.form} onChange={this.handleChange} onSubmit={this.handleSubmit}>
              {formElems}
              <div className="text-center">
                <button type="submit" className={`button ${styles.submitButton}`}>
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <p>Thanks for letting us know 🤓</p>
          )}
        </div>
      </div>
    );
  }
}

RSVP.propTypes = {
  name: PropTypes.string
};
