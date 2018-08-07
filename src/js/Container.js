import React from 'react';

import preloader from './utils/imagePreloader';

import Loader from './components/Loader';
import Clouds from './components/clouds';
import Plane from './components/plane';
import Main from './components/Main';

export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'idle'
    };
  }

  componentWillMount() {
    const ctx = this;
    preloader(['plane.svg', 'balloons.svg', 'clouds.png']).then(() => {
      ctx.setState({
        status: 'ready'
      });
    });
  }

  render() {
    const { status } = this.state;

    return (
      <div>
        {status === 'ready' ? (
          <div className="--fade-in">
            <div className="cloud-container">
              <Clouds />
            </div>
            <Plane />
            <Main />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
