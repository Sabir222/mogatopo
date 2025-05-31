import PageHeader from "@/components/PageHeader";
import DevisModal from "@/components/booking/DevisModal";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/contactForm";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  const m = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://www.mogatopo.com"),
    keywords:
      "Contact Moga Topo, Société de topographie Maroc, Demande de devis topographie, Contact géomètre Maroc, Services topographiques Maroc, Prendre rendez-vous topographie, Levés topographiques Maroc, Informations topographiques, Contacter géomètre expert, Équipe topographique Maroc, Entreprise de topographie Essaouira",
    title: m("contact"),
    description: m("contactd"),
    alternates: {
      canonical: `/contact`,
      languages: {
        en: "/en/contact",
        fr: "/fr/contact",
      },
    },
  };
}

const Page = () => {
  const t = useTranslations("ContactPage");
  return (
    <div className="">
      <PageHeader title={t("heading")} description={t("description")} />
      <ContactInfo />
      <DevisModal />
      <ContactForm />
      {/* <Map /> */}
    </div>
  );
};

export default Page;
