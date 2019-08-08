import imageClipper from 'image-clipper';
import Shape from './Shape';

// Fake declaration - image-clipper does not have own
interface Clipper {
  crop: Function;
}

interface CropInput {
  src: string;
  shape: Shape;
  finishCallback: (dataUrl: string, wifth: number, height: number) => any;
}

const crop = ({ src, shape, finishCallback }: CropInput) => {
  imageClipper(src, function(this: Clipper) {
    this.crop(
      shape.topLeft.x,
      shape.topLeft.y,
      Math.abs(shape.topRight.x - shape.topLeft.x),
      Math.abs(shape.bottomLeft.y - shape.topLeft.y),
    ).toDataURL(dataUrl => {
      finishCallback(
        dataUrl,
        Math.abs(shape.topRight.x - shape.topLeft.x),
        Math.abs(shape.bottomLeft.y - shape.topLeft.y),
      );
    });
  });
};

export { crop };
