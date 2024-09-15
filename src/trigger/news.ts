import { logger, schedules, task } from "@trigger.dev/sdk/v3";
import { OpenAI } from "openai";
import { stringify } from "yaml";
import { format } from "date-fns";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const discord_webhook_url = process.env.DISCORD_NEWS_WEBHOOK;

const generateNewsReport = async ({
  q,
  catagory,
}: {
  q?: string;
  catagory?: string;
}) => {
  if (!q && !catagory) {
    logger.error("q or catagory is required");
    throw new Error("q or catagory is required");
  }

  const url = catagory
    ? `https://newsapi.org/v2/top-headlines?category=${catagory}&apiKey=${process.env.NEWS_API_KEY}`
    : `https://newsapi.org/v2/top-headlines?q=${q}&apiKey=${process.env.NEWS_API_KEY}`;

  const news = await fetch(url);

  const body = await news.json();
  const articles = "articles" in body ? body.articles : undefined;
  const totalResults = "totalResults" in body ? body.totalResults : undefined;

  if (articles && totalResults) {
    logger.info(`Total AI related news articles: ${totalResults}`);

    const textResult = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a News Reporter, given todays date and ${q || catagory} related news (this may be a lot of news), write a short summary of the news as if you are reporting it to a user.

The news may have many articles, but you should only write a short summary of the top 3-4 that seem very important articles and summarize the rest of the news in a single sentence.

Today's Date: ${format(new Date(), "PPP pp")}

Today's ${(q || catagory)?.toUpperCase()} related News:
${stringify(articles?.slice(0, 10))}

Please write a short summary of the above news in discord markdown format, link to sources when needed.

this message is for discord so make sure that it Must be 2000 letters or fewer in length so keep it short as a discord message. 
Do not reference that you are formatting the message for discord, just write the message as if you are reporting it to a user.

`,
        },
      ],
    });

    logger.info(
      `Token Usage: ${textResult.usage?.total_tokens}, All Data: ${stringify(textResult.usage)}`,
    );
    logger.info(`AI News Summary: ${textResult.choices[0].message.content}`);

    if (discord_webhook_url) {
      try {
        const res = await fetch(discord_webhook_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: `${textResult.choices[0].message.content}`,
          }),
        });
        if (res.status >= 400) {
          logger.error(
            `Failed to send message to discord webhook: ${res.statusText}`,
          );
          throw new Error(
            `Failed to send message to discord webhook: ${res.statusText}`,
          );
        }
      } catch (e) {
        logger.error(`Failed to send message to discord webhook: ${e}`);
        throw e;
      }
    } else {
      logger.error(
        "Discord Webhook URL is not set, please set DISCORD_NEWS_WEBHOOK environment variable",
      );
    }
  }
};

export const sendAiNews = task({
  id: "send-ai-news",
  run: async () => await generateNewsReport({ q: "Artificial+Intelligence" }),
});

export const sendGamingNews = task({
  id: "send-gaming-news",
  run: async () => await generateNewsReport({ catagory: "gaming" }),
});

export const sendTechNews = task({
  id: "send-tech-news",
  run: async () => await generateNewsReport({ catagory: "technology" }),
});

export const scheduledAiNews = schedules.task({
  id: "scheduled-ai-news",
  run: async () => {
    return await sendAiNews.trigger();
  },
});

export const scheduledGamingNews = schedules.task({
  id: "scheduled-gaming-news",
  run: async () => {
    return await sendGamingNews.trigger();
  },
});

export const scheduledTechNews = schedules.task({
  id: "scheduled-tech-news",
  run: async () => {
    return await sendTechNews.trigger();
  },
});
