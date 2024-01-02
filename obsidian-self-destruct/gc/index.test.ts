import { GarbageCollector } from './index';
import * as moment from 'moment';

describe("GarbageCollector", () => {
  describe("#mark", () => {
    describe("when a note has lasted beyond its TTL", () => {
      it("marks the notes for deletion", async () => {
        const subject = new GarbageCollector();
        const expiry = moment("2021-01-01");
        const notes = [
          { deleteAfter: expiry, path: "/path/to/note.md" },
        ];
        await subject.mark(notes);
        expect(subject.markedForDeletion).toHaveLength(1);
        expect(subject.markedForDeletion[0].path).toEqual("/path/to/note.md");
      })
    })

    describe("when a note has not lasted beyond its TTL", () => {
      it("does not mark the note for deletion", async () => {
        const subject = new GarbageCollector();
        const expiry = moment("3000-01-01");
        const notes = [
          { deleteAfter: expiry, path: "/path/to/note.md" },
        ];
        await subject.mark(notes);
        expect(subject.markedForDeletion).toHaveLength(0);
      });
    })
  })
})