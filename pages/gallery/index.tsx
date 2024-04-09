import MasonryGallery from "@/components/MasonryGallery";
import Gallery from "@/components/Gallery";
import PhoneNumberDropdown from "@/components/PhoneNumberDropdown";
import React from "react";

function getRandomItemsFromArray(arr: any, count: any) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const images = [
  { url: "/images/img1.jpg", alt: "Image 1" },
  { url: "/images/img2.jpg", alt: "Image 2" },
  { url: "/images/img3.jpg", alt: "Image 2" },
  { url: "/images/img4.jpg", alt: "Image 2" },
  { url: "/images/img5.jpg", alt: "Image 2" },
  { url: "/images/img6.jpg", alt: "Image 2" },
  { url: "/images/img7.jpg", alt: "Image 2" },
  { url: "/images/img8.jpg", alt: "Image 2" },
];

const GalleryPage = () => {
  const [items, setItems] = React.useState(images);
  const onChange = (e: any) => {
    console.log("[onChange]", e.target.value);
    if (e.target.value === "") {
      setItems(images);
      return;
    }
    const randomItems = getRandomItemsFromArray(images, 3);
    setItems(randomItems);
  };
  return (
    <div className="m-4">
      <PhoneNumberDropdown onChange={onChange} />
      <MasonryGallery images={items} />
    </div>
  );
};

export default GalleryPage;
