import { HTMLElement, parse } from "node-html-parser";

export class LinkExtractor {
  static async extractLinks(url: string): Promise<string[]> {
    if (!url) {
      throw new Error("Bad URL in params");
    }

    const html = await this.getHtml(url);
    const linksTags = this.getLinksTagsFromHtml(html);
    const links = linksTags.map(this.getLinkHrefFromTag);
    const clearLinks = links.filter((l) => new Boolean(l)) as string[];
    const uniqueLinks = new Set(clearLinks);

    return Array.from(uniqueLinks);
  }

  private static async getHtml(url: string): Promise<string> {
    const response = await fetch(url);
    const html = await response.text();
    return html;
  }

  private static getLinksTagsFromHtml(html: string) {
    const document = parse(html);
    const links = document.querySelectorAll("a");
    return links;
  }

  private static getLinkHrefFromTag(linkTag: HTMLElement): string | undefined {
    const link = linkTag.getAttribute("href");
    return link;
  }
}
