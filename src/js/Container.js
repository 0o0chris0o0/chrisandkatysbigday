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
      <div className="container">
        {status === 'ready' ? (
          <div className="--fade-in">
            <Clouds />
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
