const moment = require('moment');

type GCDeleteFn = (item: GCItem) => void;

export interface GCItem {
  deleteAfter: moment.Moment;
  path: string;
}

export class GarbageCollector {
  markedForDeletion: GCItem[];
  deleter: GCDeleteFn;

  constructor({ deleter }: { deleter: GCDeleteFn }) {
    this.markedForDeletion = [];
    this.deleter = deleter;
  }

  async mark(items: GCItem[]) {
    const now = moment();
    items.forEach(item => {
      if (item.deleteAfter.isBefore(now)) {
        this.markedForDeletion.push(item);
      }
    })
  }

  async sweep() {
    this.markedForDeletion.forEach(item => {
      this.deleter(item);
    })
  }
}

export const noopLogDeleter = (item: GCItem) => {
  console.debug("noopLogDeleter would have deleted", { item });
}