import * as cheerio from "cheerio";

interface Repository {
  name: string;
  url: string;
  description: string;
  language: string;
  organization: string;
}

export async function getPinnedRepos(username: string): Promise<Repository[]> {
  const url = `https://github.com/${username}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch profile page for user: ${username}`);
  }
  const html = await response.text();
  const $ = cheerio.load(html);
  const repos: Repository[] = [];

  $(".pinned-item-list-item").each((_, element) => {
    const name = $(element).find(".repo").text().trim();
    const relativeUrl = $(element).find("a.Link").attr("href");
    console.log(`Relative URL: ${relativeUrl}`); // Debug log
    const repoUrl = relativeUrl ? `https://github.com${relativeUrl}` : "";
    const description = $(element).find(".pinned-item-desc").text().trim();
    const language = $(element)
      .find('[itemprop="programmingLanguage"]')
      .text()
      .trim();
    const organizationElement = $(element).find(".owner").text().trim();
    const organization = organizationElement ? organizationElement : username;

    repos.push({
      name,
      url: repoUrl,
      description,
      language,
      organization,
    });
  });
  return repos;
}
