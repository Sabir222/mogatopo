import Image from "next/image";
import Container from "@/components/Container";
import { useTranslations } from "next-intl";
type AboutSectionProps = {};

const AboutSection: React.FC<AboutSectionProps> = ({ }) => {
  const t = useTranslations("aboutPage");
  return (
    <div className="py-20 bg-white ">
      <Container>
        <div className="flex flex-col md:flex-row w-full p-4 gap-20 ">
          <div className="flex-1 flex flex-col gap-4 items-center text-center justify-center relative">
            <p className="text-3xl text-primaryColor font-bold">
              {t("heading2")}
            </p>
            {/* <p className="text-xl text-primaryColor"></p> */}
            <p className="text-primaryColor/80">{t("text")}</p>
          </div>
          <div className="flex-1  ">
            <div className=" relative h-[550px]">
              <Image
                src="/mogatopo/topographe.jpg"
                width={700}
                height={700}
                alt="about image"
                className="h-[550px] object-cover z-10 absolute image-placeholder"
              />
              <div className="bg-transparent border-double border-8 border-secondaryColor right-10 absolute w-full h-full bottom-[-50px] z hidden md:block "></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutSection;
