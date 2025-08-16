import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

const inform = () => toast.error("Please enter your search query.");

interface SearchFormProp {
  onSubmit: (userQuery: string) => void;
}

export default function SearchBar({ onSubmit }: SearchFormProp) {
  const handleSubmit = (formData: FormData) => {
    const userQuery = formData.get("query") as string;
    if (userQuery === "") {
      inform();
      return;
    }
    onSubmit(userQuery);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={css.form} action={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <Toaster />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
