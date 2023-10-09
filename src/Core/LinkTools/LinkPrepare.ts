export class LinkPrepare {
  private _link: string;
  private baseURL;

  constructor(link: string, baseUrl: string) {
    this._link = link;
    this.baseURL = new URL(baseUrl);
  }

  prepare(): string {
    return this.completeToFullPath().removeGetParams().link;
  }

  get link(): string {
    return this._link;
  }

  completeToFullPath(): LinkPrepare {
    const isFullHTTPSLink = this._link.includes("https://");
    const isFullHTTPLink = this._link.includes(`http://`);
    const isRelative = this._link.includes("../");
    const isHaveEndSlach = this._link.endsWith("/");
    const isHaveStartSlach = this._link.startsWith("/");

    if (!isHaveEndSlach) {
      this._link += "/";
    }

    if (!isFullHTTPLink && !isFullHTTPSLink && !isHaveStartSlach) {
      this._link = `/${this._link}`;
    }

    if (isRelative) {
      this._link = this._link.replaceAll("../", "");
    }

    if (!isFullHTTPSLink && !isFullHTTPLink) {
      this._link = `${this.baseURL.origin}${this._link}`;
    }

    return this;
  }

  removeGetParams(): LinkPrepare {
    const url = new URL(this._link);
    this._link = `${url.origin}${url.pathname}`;

    return this;
  }
}
