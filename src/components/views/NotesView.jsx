import FadeIn from '../common/FadeIn.jsx';
import NoteListItem from '../common/NoteListItem.jsx';
import PageHeader from '../common/PageHeader.jsx';
import { notes } from '../../data/siteContent.js';

export default function NotesView({ isDark }) {
  return (
    <div className="min-h-screen space-y-12 pt-40">
      <FadeIn>
        <PageHeader title="Notes Archive" description="Fragments, essays, and observations." isDark={isDark} />

        <div className="flex flex-col gap-8">
          {notes.map((note) => (
            <NoteListItem key={note.title} note={note} isDark={isDark} />
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
