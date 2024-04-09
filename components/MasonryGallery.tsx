// components/MasonryGallery.js

import Masonry from "react-masonry-css";

const MasonryGallery = ({ images }: any) => {
  return (
    <Masonry
      breakpointCols={{ default: 4, 1100: 2, 700: 1 }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((image: any, index: Number) => (
        <div key={image.url} className="my-masonry-grid_item">
          <img src={image.url} alt={image.alt} className="w-full rounded-lg" />
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGallery;
