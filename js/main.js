import newsSection from "./newsSection.js";
import { fnNewsListTemplate, fnNewsCompanyList } from "../templates/news.js";

document.addEventListener("DOMContentLoaded", () => {
  const url = "/data/newslist.json";
  const news = new newsSection({
    fetchUrl: url,
    mainSelector: ".content",
    navigationSelector: ".newsNavigation",
    btnSelector: ".btn",
  });
  news.init(fnNewsListTemplate, fnNewsCompanyList);
});
