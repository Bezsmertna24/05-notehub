import css from './SearchBox.module.css';

interface SearchBoxProps {
  searchText: string;
  onUpdate: (value: string) => void;
}

export default function SearchBox({ searchText, onUpdate }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      value={searchText}
      onChange={e => onUpdate(e.target.value)}
      type="text"
      placeholder="Search notes"
    />
  );
}