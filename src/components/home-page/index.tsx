import { LANGUAGES } from '../../i18n/translations';
import MoviesGrid from './movies-grid';
import StartModal from '../start-modal';
import { useUserPreferences } from '../../context/user-preferences';
import { GenreOption } from '../../types/context.types';
import { LoadingPage } from '../loading-page';

export function HomePage() {

	const { language, theme, genres, isModalOpen } = useUserPreferences();

	const localStorageGenres = localStorage.getItem('genre-select');

	console.log('localStorageGenres');
	return (
		<div className={`${theme.themeBgClassName} ${theme.themeTextClassName} h-100`}>
			{!genres.length ? (
				<LoadingPage />
			) : (
				<>
					<div className="bg-slate-500 bg-cover backdrop-blur-3xl bg-center text-center p-72">
						<p className="text-9xl font-extrabold text-white">DMDB</p>
						<p className="text-2xl text-white"> {LANGUAGES[language].homePageSubtitle}</p>
					</div>
					{localStorageGenres !== null
						? JSON.parse(localStorageGenres).map((g: GenreOption) => {
							return <MoviesGrid genre={g.id} type="genre" key={`movie-${g.id}`} />;
						  })
						: genres.map(g => {
							return <MoviesGrid genre={g.id} type="genre" key={`movie-${g.id}`} />;
						  })}
					<MoviesGrid type="top" />
				</>
			 )} 
		</div>
	);
}
