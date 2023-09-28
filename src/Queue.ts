export class Queue<T> {
  elements: T[];

  constructor(elements: T[] = []) {
    this.elements = [...elements];
  }

  add(newItem: T): boolean {
    if (this.elements.includes(newItem)) {
      return false;
    }

    this.elements.push(newItem);
    return true;
  }

  getFirst(): T | null {
    if (this.elements.length === 0) return null;
    return this.elements[0];
  }

  getFirstAndRemove(): T | null {
    const element = this.getFirst();
    this.elements = this.elements.slice(1);
    return element;
  }
}
