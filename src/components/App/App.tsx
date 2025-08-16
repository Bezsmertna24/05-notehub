import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBar from "../SearchBar/SearchBar";
import getMovies from "../../services/movieService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import css from "./App.module.css";
import ReactPaginate from "react-paginate";
import type { MovieSearchResponse } from "../../services/movieService";


const notify = () => toast.error("No movies found for your request.");

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

const {
  data,
  isLoading,
  isError,
  isSuccess
} = useQuery<MovieSearchResponse, Error>({
  queryKey: ["movies", query, page],
  queryFn: () => getMovies(query, page),
  enabled: query.length > 0,
  placeholderData: keepPreviousData,
});


  useEffect(() => {
    if (isSuccess && data.results.length === 0) {
      notify();
    }
  }, [isSuccess, data]);

  const handleSearch = (userSearch: string) => {
    setQuery(userSearch);
    setPage(1); 
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <>
          <MovieGrid
            movies={data.results}
            onSelect={(movie) => setSelectedMovie(movie)}
          />

          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <Toaster />
    </div>
  );
}
