import { Manager } from "./Manager.ts";
import { LinkExtractor } from "./LinkExtractor.ts";
import { LinkFilter } from "./LinkFilter.ts";
import { LinkPrepare } from "./LinkPrepare.ts";

export class RequestUnit {
  manager: Manager;
  id: number;

  constructor(manager: Manager, id: number) {
    this.manager = manager;
    this.id = id;
  }

  start() {
    this.iter();
  }

  private async iter() {
    const sourceLink = this.manager.getLinkToWork();

    if (!sourceLink) {
      if (this.manager.isEnd()) {
        return;
      }
      setTimeout(() => this.iter(), 500);
      return;
    }

    try {
      const linksFromSource = await this.getLinksFromPage(sourceLink);
      this.manager.completeLink(sourceLink, linksFromSource);
    } catch (error: any) {
      if (error.name === "TypeError") {
        this.manager.removeFromActive(sourceLink);
      } else {
        this.manager.returnWitchError(sourceLink);
      }
    }

    if (!this.manager.isEnd()) {
      setTimeout(() => this.iter(), 0);
    }
  }

  async getLinksFromPage(link: string): Promise<string[]> {
    const linkFilter = new LinkFilter(link);
    const links = await LinkExtractor.extractLinks(link);
    const filtred = links.filter((l) => linkFilter.isValidLink(l));

    const prepared = LinkFilter.removeDoubles(
      filtred.map((l) => new LinkPrepare(l, link).prepare()),
    );

    return prepared;
  }
}
