import Container from "@/components/Container";
import Title from "../Title";
import TeamCard from "./TeamCard";
import { useTranslations } from "next-intl";

type TeamProps = {};

const Team: React.FC<TeamProps> = ({ }) => {
  const t = useTranslations("Team");
  return (
    <section className=" w-full py-20 flex flex-col justify-center items-center">
      <Container>
        <div className="flex justify-center items-center lg:w-[60%] mx-auto mb-20 text-center lg:text-start">
          <Title h1={t("h1")} h2={t("h2")} h3={t("h3")} />
        </div>
      </Container>

      <div className=" flex items-center justify-center w-full gap-20 flex-col md:flex-row ">
        <TeamCard
          facebook=""
          instagram=""
          role="Web Developer"
          name="Soufiane nederra"
          twitter=""
        />
        <TeamCard
          facebook=""
          instagram=""
          name="Zyad ezzaitouni"
          role="Web Developer"
          twitter=""
        />
      </div>
    </section>
  );
};

export default Team;
