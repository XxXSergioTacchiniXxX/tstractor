export class LinkFilter {
  readonly targetLink: URL;
  private badURLs = ["#"];
  // private requiredSymbols = ["/"];

  constructor(targetLink: string) {
    this.targetLink = new URL(targetLink);
  }

  isValidLink(link: string): boolean {
    return this.isHaveSense(link) && this.isInnerLink(link);
  }

  private isInnerLink(link: string): boolean {
    try {
      const url = new URL(link);
      if (this.targetLink.hostname !== url.hostname) return false;

      return true;
    } catch {
      return true;
    }
  }

  private isHaveSense(link: string): boolean {
    return !this.badURLs.includes(link) && link.includes("/");
  }

  static removeDoubles(list: Array<string>) {
    const set = new Set(list);
    return Array.from(set);
  }
}
