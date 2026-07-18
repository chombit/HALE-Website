import { useEffect } from "react";
import ArticlesHeader from "../components/Articles/ArticlesHeader/ArticlesHeader";
import ArticlesList from "../components/Articles/ArticlesList/ArticlesList";

export default function Articles() {
  useEffect(function () {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  return (
    <>
      <ArticlesHeader />
      <ArticlesList />
    </>
  );
}
