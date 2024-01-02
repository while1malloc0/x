import * as moment from 'moment';

export interface GCItem {
  deleteAfter: moment.Moment;
  path: string;
}

export class GarbageCollector {
  markedForDeletion: GCItem[];

  constructor() {
    this.markedForDeletion = [];
  }

  async mark(items: GCItem[]) {
    const now = moment();
    items.forEach(item => {
      if (item.deleteAfter.isBefore(now)) {
        this.markedForDeletion.push(item);
      }
    })
  }
}