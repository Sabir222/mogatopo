"use client";
import Container from "../Container";
import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react";
type GalleryProps = {};

const Gallery: React.FC<GalleryProps> = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const handleClose = () => {
    setShowModal(false);
  };
  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setShowModal(true);
  };
  return (
    <div className="bg-primaryColor  ">
      <Container>
        <div className="grid grid-cols-3 gap-4 p-5">
          <div
            className="image-placeholder font-bold   row-span-2 cursor-pointer relative overflow-hidden group"
            onClick={() => handleImageClick("/gallery/image4.jpg")}
          >
            <Image
              src="/gallery/image4.jpg"
              alt="gallery image"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
            <div className="bg-primaryColor/40 w-full h-32 absolute  -bottom-32 group-hover:bottom-0 ease-in-out duration-500 flex justify-center items-center text-white text-2xl font-semibold">
              Image 1
            </div>
          </div>
          <div
            className="image-placeholder font-bold aspect-square cursor-pointer relative overflow-hidden group"
            onClick={() => handleImageClick("/gallery/image2.jpg")}
          >
            <Image
              src="/gallery/image2.jpg"
              alt="gallery image"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
            <div className="bg-primaryColor/40 w-full h-32 absolute  -bottom-32 group-hover:bottom-0 ease-in-out duration-500 flex justify-center items-center text-white text-2xl font-semibold">
              Image 2
            </div>
          </div>
          <div
            className="image-placeholder font-bold  row-span-2 cursor-pointer relative overflow-hidden group"
            onClick={() => handleImageClick("/gallery/image3.jpg")}
          >
            <Image
              src="/gallery/image3.jpg"
              alt="gallery image"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
            <div className="bg-primaryColor/40 w-full h-32 absolute  -bottom-32 group-hover:bottom-0 ease-in-out duration-500 flex justify-center items-center text-white text-2xl font-semibold">
              Image 3
            </div>
          </div>
          <div
            className="image-placeholder font-bold aspect-square cursor-pointer relative overflow-hidden group"
            onClick={() => handleImageClick("/gallery/image1.jpg")}
          >
            <Image
              src="/gallery/image1.jpg"
              alt="gallery image"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
            <div className="bg-primaryColor/40 w-full h-32 absolute  -bottom-32 group-hover:bottom-0 ease-in-out duration-500 flex justify-center items-center text-white text-2xl font-semibold">
              Image 4
            </div>
          </div>
          <div
            className="image-placeholder font-bold  cursor-pointer relative overflow-hidden group"
            onClick={() => handleImageClick("/gallery/image5.jpg")}
          >
            <Image
              src="/gallery/image5.jpg"
              alt="gallery image"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
            <div className="bg-primaryColor/40 w-full h-32 absolute  -bottom-32 group-hover:bottom-0 ease-in-out duration-500 flex justify-center items-center text-white text-2xl font-semibold">
              Image 5
            </div>
          </div>
          <div
            className="image-placeholder font-bold cursor-pointer relative overflow-hidden group col-span-2"
            onClick={() => handleImageClick("/gallery/image6.jpg")}
          >
            <Image
              src="/gallery/image6.jpg"
              alt="gallery image"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
            <div className="bg-primaryColor/40 w-full h-32 absolute  -bottom-32 group-hover:bottom-0 ease-in-out duration-500 flex justify-center items-center text-white text-2xl font-semibold">
              Image 6
            </div>
          </div>
          <div
            className="image-placeholder font-bold aspect-square cursor-pointer relative overflow-hidden group col"
            onClick={() => handleImageClick("/gallery/image7.jpg")}
          >
            <Image
              src="/gallery/image7.jpg"
              alt="gallery image"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
            <div className="bg-primaryColor/40 w-full h-32 absolute  -bottom-32 group-hover:bottom-0 ease-in-out duration-500 flex justify-center items-center text-white text-2xl font-semibold">
              Image 7
            </div>
          </div>
          <div
            className="image-placeholder font-bold aspect-square cursor-pointer relative overflow-hidden group"
            onClick={() => handleImageClick("/gallery/image8.jpg")}
          >
            <Image
              src="/gallery/image8.jpg"
              alt="gallery image"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
            <div className="bg-primaryColor/40 w-full h-32 absolute  -bottom-32 group-hover:bottom-0 ease-in-out duration-500 flex justify-center items-center text-white text-2xl font-semibold">
              Image 8
            </div>
          </div>
          <div
            className="image-placeholder font-bold aspect-square cursor-pointer relative overflow-hidden group"
            onClick={() => handleImageClick("/gallery/image10.jpg")}
          >
            <Image
              src="/gallery/image10.jpg"
              alt="gallery image"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
            <div className="bg-primaryColor/40 w-full h-32 absolute  -bottom-32 group-hover:bottom-0 ease-in-out duration-500 flex justify-center items-center text-white text-2xl font-semibold">
              Image 9
            </div>
          </div>
          <div
            className="image-placeholder font-bold  cursor-pointer relative overflow-hidden group"
            onClick={() => handleImageClick("/gallery/image9.jpg")}
          >
            <Image
              src="/gallery/image9.jpg"
              alt="gallery image"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
            <div className="bg-primaryColor/40 w-full h-32 absolute  -bottom-32 group-hover:bottom-0 ease-in-out duration-500 flex justify-center items-center text-white text-2xl font-semibold">
              Image 10
            </div>
          </div>
          <div
            className="image-placeholder font-bold  cursor-pointer relative overflow-hidden group col-span-2 aspect-square"
            onClick={() => handleImageClick("/gallery/image11.jpg")}
          >
            <Image
              src="/gallery/image11.jpg"
              alt="gallery image"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
            <div className="bg-primaryColor/40 w-full h-32 absolute  -bottom-32 group-hover:bottom-0 ease-in-out duration-500 flex justify-center items-center text-white text-2xl font-semibold ">
              Image 11
            </div>
          </div>
        </div>
      </Container>
      {showModal && <Modal onClose={handleClose} src={selectedImage} />}
    </div>
  );
};

export default Gallery;
