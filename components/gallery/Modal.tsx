import { X } from "lucide-react";
import Image from "next/image";
type ModalProps = {
  onClose: () => void;
  src: string;
};
import { useRef } from "react";
const Modal: React.FC<ModalProps> = ({ onClose, src }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed bg-primaryColor/90 inset-0 items-center justify-center flex backdrop-blur-sm z-20 "
      onClick={handleClick}
    >
      <div className="relative bg-black/75 w-[80%] h-[80%]  ">
        <Image
          src={src}
          alt="gallery image"
          width={1500}
          height={1500}
          className="w-full h-full object-contain  "
        />
        <X
          className="cursor-pointer absolute right-2 top-2 text-white"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Modal;
