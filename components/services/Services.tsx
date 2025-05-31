import Container from "@/components/Container";
import ServiceCard from "./ServiceCard";
import QandA from "./QandA";
import { useTranslations } from "next-intl";

type ServicesProps = {};

const Services: React.FC<ServicesProps> = ({ }) => {
  const t = useTranslations("ImplantationOuvrages");
  const t1 = useTranslations("EtudesFoncieres");
  const t2 = useTranslations("Topographie3D");
  const t3 = useTranslations("LotissementMorcellement");
  const t4 = useTranslations("RoutesVoirie");
  const t5 = useTranslations("TravauxBatiments");
  const t6 = useTranslations("PrestationsAdmin");
  const t7 = useTranslations("EtudesIngenierie");
  const t8 = useTranslations("ExpertiseTopographique");

  const translations = [
    { t, src: "/mogatopo/service/Travaux d’implantation d’ouvrages de tout type.jpeg" },
    { t: t1, src: "/mogatopo/service/Études foncières.webp" },
    { t: t2, src: "/mogatopo/service/Travaux et études topographiques 3D.jpeg" },
    { t: t3, src: "/mogatopo/service/Lotissement - Morcellement.jpg" },
    { t: t4, src: "/mogatopo/service/travaux+de+routes+et+de+voirie.png" },
    { t: t5, src: "/mogatopo/service/Travaux de bâtiments.webp" },
    { t: t6, src: "/mogatopo/service/Prestations topographiques et administratives.jpg" },
    { t: t7, src: "/mogatopo/service/Etudes techniques et ingénierie.png" },
    { t: t8, src: "/mogatopo/service/expertise.jpg" },
  ];

  return (
    <div className="rounded-2xl bg-white mx-2 md:mx-5 pb-10">
      <Container>
        <div className="flex flex-col">
          <div className="py-10 flex items-center gap-3 justify-center">
            <p className="text-center text-primaryColor text-xl lg:w-[70%]">
              {t("title")}
            </p>
          </div>
          <div className="gap-8 pb-10 pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {translations.map(({ t, src }, index) => (
              <ServiceCard
                key={index}
                imageSrc={src}
                title={t("t")}
                price={t("price")}
                description={t("d1")}
                services={[
                  {
                    service: t("t0"),
                    details: [
                      t("d01"),
                      t("d02"),
                      t("d03"),
                      t("d04"),
                      t("d05"),
                      t("d06"),
                      t("d07"),
                    ],
                  },
                  {
                    service: t("t1"),
                    details: [t("d11")],
                  },
                  {
                    service: t("t2"),
                    details: [t("d21")],
                  },
                  {
                    service: t("t3"),
                    details: [t("d31")],
                  },
                  {
                    service: t("t4"),
                    details: [t("d41")],
                  },
                  {
                    service: t("t5"),
                    details: [t("d51")],
                  },
                  {
                    service: t("t6"),
                    details: [t("d61")],
                  },
                ]}
              />
            ))}
          </div>
        </div>
        <div>
          <QandA />
        </div>
      </Container>
    </div>
  );
};

export default Services;
