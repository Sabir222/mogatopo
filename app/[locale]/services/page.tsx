import PageHeader from "@/components/PageHeader";
import Services from "@/components/services/Services";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  const m = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://www.mogatopo.com"),
    keywords:
      "Services topographiques Maroc, Levés topographiques Essaouira, Plan topographique Maroc, Bornage de terrain, Étude topographique, Relevé altimétrique, Plan de bornage Maroc, Mesures géodésiques, Implantation de bâtiment, Cabinet de géomètre Maroc, Société de topographie Essaouira",
    title: m("lessons"),
    description: m("lessonsd"),
    alternates: {
      canonical: `/lessons`,
      languages: {
        en: "/en/lessons",
        fr: "/fr/lessons",
      },
    },
  };
}

type pageProps = {};

const Page: React.FC<pageProps> = ({ }) => {
  const t = useTranslations("LessonPage");
  return (
    <div>
      <PageHeader title={t("heading")} description={t("description")} />
      <div className=" bg-primaryColor">
        <div className="text-center py-10 text-7xl font-medium text-secondaryColor">
          {t("title")}
        </div>
        <Services />
      </div>
    </div>
  );
};

export default Page;
