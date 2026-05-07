import FadeIn from '../common/FadeIn.jsx';
import NoteListItem from '../common/NoteListItem.jsx';
import PageHeader from '../common/PageHeader.jsx';
import notes from '../../data/notes.json';
import { sortNotesByDateDesc } from '../../lib/noteSorting.js';

const sortedNotes = sortNotesByDateDesc(notes);

export default function NotesView({ isDark, onViewChange }) {
  return (
    <div className="mx-auto max-w-2xl px-6">
      <div className="min-h-screen space-y-12 pt-40">
      <FadeIn>
        <PageHeader title="Notes Archive" description="Fragments, essays, and observations." isDark={isDark} />

        <div className="flex flex-col gap-8">
          {sortedNotes.map((note) => (
            <NoteListItem
              key={note.slug ?? note.title}
              note={note}
              isDark={isDark}
              onNavigate={note.slug ? () => onViewChange(`note:${note.slug}`) : undefined}
            />
          ))}
        </div>
      </FadeIn>
    </div>
    </div>
  );
}
