"use client";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Socials from "./Socials";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import Container from "../Container";
import Logo from "../Logo";
import { useRouter } from "navigation";
type FooterProps = {};

const Footer: React.FC<FooterProps> = ({ }) => {
  const t = useTranslations("Footer");

  const date = new Date().getFullYear();
  const router = useRouter();
  return (
    <div className="bg-primaryColor text-white">
      <Container>
        <div className=" pt-32 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-8 items-center justify-start lg:items-start">
            <Logo />
            <p className="text-center lg:text-start">{t("p1")}</p>
            <div className="flex gap-2">
              <Socials>
                <Instagram size={15} />
              </Socials>
              <Socials>
                <Twitter size={15} />
              </Socials>
              <Socials>
                <Facebook size={15} />
              </Socials>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-start items-center py-10 lg:py-0 lg:mx-32">
            <p className="mb-8 text-2xl font-semibold">{t("p2")}</p>
            <div onClick={() => router.push("/")} className="cursor-pointer">
              {t("home")}
            </div>
            <Separator className="my-4 " />
            <div
              onClick={() => router.push("/about")}
              className="cursor-pointer"
            >
              {t("about")}
            </div>
            <Separator className="my-4" />
            <div
              onClick={() => router.push("/services")}
              className="cursor-pointer"
            >
              {t("services")}
            </div>
            <Separator className="my-4" />
            <div
              onClick={() => router.push("/contact")}
              className="cursor-pointer"
            >
              {t("contact")}
            </div>
            <Separator className="my-4" />
            <div
              onClick={() => router.push("/blog")}
              className="cursor-pointer"
            >
              {t("blog")}
            </div>
            <Separator className="my-4" />
          </div>
        </div>
        <div className="px-[32px]">
          <Separator className="max-w-[1000px] mx-auto my-12" />
          <p className="text-center  py-8">Copyright ©{date} Moga Topo.</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
