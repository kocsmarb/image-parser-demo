import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import { parseAndCrop } from './lib';

interface Image {
  src: string;
  width: number;
  height: number;
}

interface State {
  images: Image[];
}
class App extends React.Component<any, State>{
  state: State = {
    images: []
  };

  addImage = (img: Image) => {
    const images = [
      ...this.state.images,
      img,
    ].sort((i, j) => i.width - j.width);
    this.setState({
      ...this.state,
      images,
    });
  }

  componentDidMount() {
    parseAndCrop(require('./lib/source.jpg'), this.addImage);
  }

  render() {

    const loading = (
      <React.Fragment>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Parse source image and crop the pictures.
        </p>
      </React.Fragment>
    );

    const images = (
      <div className="Image-list">
        {
          this.state.images.map((image, i) => (
            <img key={i} src={image.src} alt="" />
          ))
        }
      </div>
    );


    return (
      <div className="App-header">
        {
          this.state.images.length
            ? images
            : loading
        }
      </div>
    );
  }
}

export default App;
