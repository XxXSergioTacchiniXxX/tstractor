import { Queue } from "./Queue.ts";

export class Manager {
  queue: Queue<string>;
  spentSet: Set<string>;
  activeSet: Set<string>;

  constructor(initQueue: string[] = []) {
    this.queue = new Queue(initQueue);
    this.spentSet = new Set();
    this.activeSet = new Set();
  }

  getLinkToWork(): string | null {
    const link = this.queue.getFirstAndRemove();
    if (link !== null) {
      this.activeSet.add(link);
    }

    return link;
  }

  completeLink(sourceLink: string, links: string[]) {
    this.spentSet.add(sourceLink);

    for (const link of links) {
      if (!this.activeSet.has(link) && !this.spentSet.has(link)) {
        this.queue.add(link);
      }
    }

    this.activeSet.delete(sourceLink);
  }

  returnWitchError(link: string) {
    console.log("ERROR Link: ", link);
    this.activeSet.delete(link);
    this.queue.add(link);
  }

  removeFromActive(link: string) {
    this.activeSet.delete(link);
  }

  isEnd(): boolean {
    return this.activeSet.size === 0 && this.queue.elements.length === 0;
  }

  log(): void {
    console.log("==========================================\n");
    console.log(
      `queue: ${this.queue.elements.length} | active: ${this.activeSet.size} | spent: ${this.spentSet.size}`,
    );
    const queueLog = this.queue.elements
      .slice(0, 3)
      .map((l) => l.substring(0, 100))
      .join("\n");

    console.log(queueLog + "\n");
  }

  getLinkListInText(): string {
    return Array.from(this.spentSet).join("\n");
  }
}
