import getPixels from 'get-pixels';
import Analyzer from './Analyzer';
import { crop } from './crop';

const parseAndCrop = (src, foundImage) => {
  getPixels(src, (err, pixels) => {
    if (err) {
      console.error('Bad image path');
      return;
    }

    const analyzer = new Analyzer(pixels);
    const foundShapes = analyzer.parse();

    foundShapes.forEach(shape =>
      crop({
        src,
        shape,
        finishCallback: (src, width, height) => {
          foundImage({
            src,
            width,
            height,
          });
        },
      }),
    );
  });
};

export { parseAndCrop };
export default parseAndCrop;
