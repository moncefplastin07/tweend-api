import { getDocument } from "./getDocument.ts";
import { parse as parseDate } from "date";
export const getTrendList = async (area: string, limit: number) => {
  const document = await getDocument(`https://trends24.in/${area}`)

  const trendListDom = document.querySelectorAll(".trend-card");
  const header = {
    area: document.getElementById("app-bar-toggle")?.innerText,
    url: area,
  };
  const trends: any[] = [];
  trendListDom.forEach((card: any) => {
    const topics = [...card.querySelectorAll(".trend-card__list li")].map(
      (element: any, index: number) => {
        return {
          index: index + 1,
          text: element?.querySelector("a")?.innerText,
          url: element?.querySelector("a")?.getAttribute("href"),
          tweets_count: element?.querySelector('span.tweet-count')?.innerText
        };
      },
    );
    trends.push({
      last_update: parseDate(
        card.querySelector(".trend-card__time").innerText,
        "dd-MM-yyyy HH:mm:ss",
      ),
      topics,
    });
  });
  return { ...header, trends };
};

