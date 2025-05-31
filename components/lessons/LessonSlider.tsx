"use client";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useTranslations } from "next-intl";
import LessonCard from "./LessonCard";

type LessonSliderProps = {};

const LessonSlider: React.FC<LessonSliderProps> = ({ }) => {
  const t = useTranslations("Services");

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="px-[32px]">
        <LessonCard
          src="/mogatopo/service/Travaux d’implantation d’ouvrages de tout type.jpeg"
          title={t("t1")}
          description={t("d1")}
          bookNow={t("b1")}
        />
      </div>
      <div className="px-[32px]">
        <LessonCard
          src="/mogatopo/service/Études foncières.webp"
          title={t("t2")}
          description={t("d2")}
          bookNow={t("b1")}
        />
      </div>
      <div className="px-[32px]">
        <LessonCard
          src="/mogatopo/service/Travaux et études topographiques 3D.jpeg"
          title={t("t3")}
          description={t("d3")}
          bookNow={t("b1")}
        />
      </div>
      <div className="px-[32px]">
        <LessonCard
          src="/mogatopo/service/Lotissement - Morcellement.jpg"
          title={t("t4")}
          description={t("d4")}
          bookNow={t("b1")}
        />
      </div>
      <div className="px-[32px]">
        <LessonCard
          src="/mogatopo/service/travaux+de+routes+et+de+voirie.png"
          title={t("t5")}
          description={t("d5")}
          bookNow={t("b1")}
        />
      </div> <div className="px-[32px]">
        <LessonCard
          src="/mogatopo/service/Travaux de bâtiments.webp"
          title={t("t6")}
          description={t("d6")}
          bookNow={t("b1")}
        />
      </div> <div className="px-[32px]">
        <LessonCard
          src="/mogatopo/service/Prestations topographiques et administratives.jpg"
          title={t("t7")}
          description={t("d7")}
          bookNow={t("b1")}
        />
      </div> <div className="px-[32px]">
        <LessonCard
          src="/mogatopo/service/Etudes techniques et ingénierie.png"
          title={t("t8")}
          description={t("d8")}
          bookNow={t("b1")}
        />
      </div> <div className="px-[32px]">
        <LessonCard
          src="/mogatopo/service/expertise.jpg"
          title={t("t9")}
          description={t("d9")}
          bookNow={t("b1")}
        />
      </div>
    </Slider>
  );
};

export default LessonSlider;
