import PageHeader from "@/components/PageHeader";
import AboutSection from "@/components/about/AboutSection";
import Team from "@/components/about/Team";
import Testimonial from "@/components/about/Testimonial";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  const m = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://www.mogatopo.com"),
    title: m("about"),
    keywords:
      "Topographie Maroc, Société de topographie, Services topographiques Maroc, Levés topographiques, Cartographie au Maroc, Géomètre expert Maroc, Études topographiques, Mesures foncières Maroc, Plan topographique, Entreprise de topographie Maroc, Prestations topographiques professionnelles",
    description: m("aboutd"),
    alternates: {
      canonical: `/about`,
      languages: {
        en: "/en/about",
        fr: "/fr/a-propos",
      },
    },
  };
}

const Page = () => {
  const t = useTranslations("aboutPage");
  return (
    <div>
      <PageHeader title={t("heading")} description={t("description")} />
      <AboutSection />
      <Testimonial />
      <Team />
    </div>
  );
};

export default Page;
