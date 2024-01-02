import { GarbageCollector, GCItem } from './index';
import * as moment from 'moment';

describe("GarbageCollector", () => {
  describe("#mark", () => {
    const deleter = jest.fn();

    describe("when a note has lasted beyond its TTL", () => {
      it("marks the notes for deletion", async () => {
        const subject = new GarbageCollector({ deleter });
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
        const subject = new GarbageCollector({ deleter });
        const expiry = moment("3000-01-01");
        const notes = [
          { deleteAfter: expiry, path: "/path/to/note.md" },
        ];
        await subject.mark(notes);
        expect(subject.markedForDeletion).toHaveLength(0);
      });
    })
  })

  describe("#sweep", () => {
    describe("when the markForDeletion list has entries", () => {
      it("calls a deletion function on them", async () => {
        const deletedPaths: string[] = [];
        const deleter = jest.fn((item: GCItem) => {
          deletedPaths.push(item.path);
        })
        const subject = new GarbageCollector({ deleter: deleter });
        const input = [
          { deleteAfter: moment("2021-01-01"), path: "/path/to/note.md" }
        ]
        await subject.mark(input);
        await subject.sweep();
        expect(deletedPaths).toEqual(["/path/to/note.md"]);
      })
    })
  });
})