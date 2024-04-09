import Image from "next/image";

const Gallery = ({ images }: any) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image: any, index: Number) => (
        <div key={image.url} className="p-2">
          <Image
            src={image.url}
            alt={image.alt}
            width={400}
            height={300}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
