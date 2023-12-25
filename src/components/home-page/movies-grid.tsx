import { Link } from 'react-router-dom';
import { MovieProfile } from '../movie-profile';
import { useEffect, useState } from 'react';
import { LoadMoreButton } from '../load-more/load-more-button';
import { Genre, MoviesGridParams } from '../../types/movies-grid.types';
import { MoviesInformation, ResultType } from '../../types/homepage.types';
import { useUserPreferences } from '../../context/user-preferences';
import { MoviesGridService } from './service';
import { LoadingPage } from '../loading-page';

const mockGenres: Array<Genre> = [
	{
		id: 28,
		name: 'Action'
	},
	{
		id: 12,
		name: 'Adventure'
	},
	{
		id: 16,
		name: 'Animation'
	},
	{
		id: 35,
		name: 'Comedy'
	},
	{
		id: 80,
		name: 'Crime'
	},
	{
		id: 99,
		name: 'Documentary'
	},
	{
		id: 18,
		name: 'Drama'
	},
	{
		id: 10751,
		name: 'Family'
	},
	{
		id: 14,
		name: 'Fantasy'
	},
	{
		id: 36,
		name: 'History'
	},
	{
		id: 27,
		name: 'Horror'
	},
	{
		id: 10402,
		name: 'Music'
	},
	{
		id: 9648,
		name: 'Mystery'
	},
	{
		id: 10749,
		name: 'Romance'
	},
	{
		id: 878,
		name: 'Science Fiction'
	},
	{
		id: 10770,
		name: 'TV Movie'
	},
	{
		id: 53,
		name: 'Thriller'
	},
	{
		id: 10752,
		name: 'War'
	},
	{
		id: 37,
		name: 'Western'
	}
];

export default function MoviesGrid({ genre, type }: Readonly<MoviesGridParams>) {
	const [movies, setMovies] = useState<MoviesInformation>({ results: [], type: '' });
	const [open, setOpen] = useState<boolean>(false);
	const { language, genres, theme } = useUserPreferences();

	async function getMovieData() {
		if (type === 'genre' && genre) {
			setMovies(await MoviesGridService(language, type, genre));
		}
		if (type === 'top') {
			setMovies(await MoviesGridService(language, type));
		}
	}

	useEffect(() => {
		getMovieData();
	}, [language]);

	function limitGrid() {
		if (open) {
			return movies.results;
		}
		return movies.results.slice(0, 4);
	}

	function handleLoadMoreButton() {
		setOpen(!open);
	}

	function renderTitle() {
		if (genre) {
			const genreTitle: Array<Genre> = mockGenres.filter((g: Genre) => g.id === genre);

			return genreTitle[0].name;
		}
		return 'TopMovies';
	}

	return (
		<>
			{movies.results.length && genres.length ? (
				<>
					<div className={`flex justify-center text-xl font-bold pt-4 ${theme.themeTextClassName} border-solid border-t-2 ${theme.border}` }>

						{renderTitle()}
					</div>
					<div className="grid grid-cols-4 gap-9 object-cover p-7 pt-3">
						{limitGrid().map((movie: ResultType) => {
							return (
								<Link to={`/movie/${movie.id}`} key={movie.id} accessKey="abc">
									<MovieProfile pictureUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} title={movie.title} releaseDate={movie.release_date} overview={movie.overview}/>
								</Link>
							);
						})}
						<div className="flex justify-center h-10 w-screen">
							<LoadMoreButton open={open} onClick={handleLoadMoreButton} />
						</div>
					</div>
				</> 
			) : (
				<LoadingPage/>
			)}
		</>
	);
}
