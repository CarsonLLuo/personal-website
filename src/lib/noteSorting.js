function noteDateValue(note) {
  const [year, month = 1, day = 1] = String(note.date ?? '')
    .split(/[.-]/)
    .map((part) => Number(part));

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return Number.NEGATIVE_INFINITY;
  }

  return year * 10000 + month * 100 + day;
}

export function sortNotesByDateDesc(notes) {
  return [...notes].sort((a, b) => noteDateValue(b) - noteDateValue(a));
}
