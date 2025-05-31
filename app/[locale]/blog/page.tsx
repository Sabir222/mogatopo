import PageHeader from "@/components/PageHeader";
import { allPosts } from "contentlayer/generated";
import BlogCard from "@/components/blog/BlogCard";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  const m = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://www.mogatopo.com"),
    title: m("blog"),
    keywords:
      "Blog topographie Maroc, Actualités topographiques, Services de géomètre au Maroc, Levés topographiques, Nouvelles sur la topographie, Blog professionnel topographie, Équipements topographiques, Techniques de mesure Maroc, Cartographie et topographie, Articles sur la topographie Maroc, Société de topographie au Maroc",
    description: m("blogd"),
    alternates: {
      canonical: `/blog`,
      languages: {
        en: "/en/blog",
        fr: "/fr/blog",
      },
    },
  };
}

export default function Home() {
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const t = useTranslations("BlogPage");
  return (
    <div className="bg-primaryColor min-h-screen">
      <PageHeader title={"Blogs"} description={t("description")} />
      <div className="container py-20  gap-5 grid grid-cols-1 md:grid-cols-2">
        {posts.map((post, idx) => (
          <BlogCard key={idx} post={post} imageSrc={post.image} />
        ))}
      </div>
    </div>
  );
}
