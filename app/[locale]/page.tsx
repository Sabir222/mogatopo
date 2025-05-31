import { unstable_setRequestLocale } from "next-intl/server";
import AboutUsContent from "@/components/aboutUs/AboutUsContent";
import HeroImage from "@/components/hero/HeroImage";
import Lessons from "@/components/lessons/Lessons";
import SvgSection from "@/components/SvgSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  const m = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://www.mogatopo.com"),
    keywords:
      "Topographe Maroc, Topographe Essaouira, Plan de bornage Maroc, Relevé topographique Essaouira, Études foncières Maroc, Levé altimétrique, Implantation de chantier, Plan de masse, Mesures topographiques Maroc, Cabinet de topographie Maroc, Services de géomètre Maroc",
    title: m("home"),
    description: m("homed"),
    alternates: {
      canonical: `/`,
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
  };
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <HeroImage />
      <AboutUsContent />
      <Lessons />
      {/* <Prices /> */}
      <SvgSection />
    </main>
  );
}
