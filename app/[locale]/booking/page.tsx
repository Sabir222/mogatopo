import DevisModal from "@/components/booking/DevisModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bluboarding.com"),
  title: "MogaTop | Booking",
  description: "Book your next adventure with MogaTop",
  alternates: {
    canonical: `/booking`,
    languages: {
      en: "/en/booking",
      fr: "/fr/reserver",
    },
  },
};
type pageProps = {};

const page: React.FC<pageProps> = ({ }) => {
  return (
    <div>
      <DevisModal />
    </div>
  );
};

export default page;
