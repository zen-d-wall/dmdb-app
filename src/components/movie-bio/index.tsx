import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingPage } from '../loading-page';
import { formatLanguageToApi } from '../utils/api-utils';
import Youtube from 'react-youtube';
import { LANGUAGES } from '../../i18n/translations';
import { useUserPreferences } from '../../context/user-preferences';
import { MovieBio } from '../../types/movies-bio.types';

export function MovieBiography() {
	const [isLoading, setIsLoading] = useState(false);
	const [movieBioState, setMovieBioState] = useState<MovieBio>({
		title: '',
		poster: '',
		banner: '',
		synopsis: '',
		rating: 0,
		voteAmount: 0
	});

	const { movieId } = useParams();
	const { language, theme } = useUserPreferences();

	const token = `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`;
	const movieDataUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${formatLanguageToApi(language)}`;
	const movieVideosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${formatLanguageToApi(language)}`;

	async function getMovieData() {
		setIsLoading(true);
		const response = await axios({
			method: 'get',
			url: movieDataUrl,
			headers: { Authorization: token }
		});

		setMovieBioState({
			...movieBioState,
			title: response.data.title,
			poster: response.data.poster_path,
			banner: response.data.backdrop_path,
			synopsis: response.data.overview,
			rating: response.data.vote_average,
			voteAmount: response.data.vote_count
		});
		setIsLoading(false);
	}

	async function getMovieTrailer() {
		const response = await axios({
			method: 'get',
			url: movieVideosUrl,
			headers: { Authorization: token }
		});

		setMovieBioState({
			...movieBioState,
			videosData: response.data.results
		});
	}

	useEffect(() => {
		getMovieData();
	}, [language]);

	useEffect(() => {
		if (movieBioState.title) {
			getMovieTrailer();
		}
	}, [movieBioState.title]);

	// : YouTubeProps['opts']
	const opts = {
		height: '390',
		width: '640',
		playerVars: {
			autoplay: 1
		},
		volume: '20'
	};

	const trailer = movieBioState.videosData?.find(video => video.type === 'Trailer' && video.official === true);

	return (
		<div className={`${theme.themeTextClassName} ${theme.lighterThemeBgClassName} min-h-screen`}>
			{isLoading ? (
				<LoadingPage />
			) : (
				<>
					<div className="w-full bg-no-repeat bg-cover max-h-96 bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movieBioState?.banner})` }}>
						<div className="w-full backdrop-blur flex flex-col items-center">
							{movieBioState.videosData ? <Youtube className="" videoId={trailer?.key} opts={opts} /> : <span>Loading video...</span>}
						</div>
					</div>
					<div className="flex pt-16 pb-16 pr-52 pl-52">
						<div className="pr-6">
							<p className="text-7xl font-title">{movieBioState?.title}</p>
							<p className="text-3xl font-thin">
								{LANGUAGES[language].votingTitle} {movieBioState?.rating.toFixed(1)}
							</p>
							<p className="text-3xl font-thin">
								{LANGUAGES[language].votingAverage} {movieBioState?.voteAmount}
							</p>
							<p className="text-2xl pt-20 font-nunito">{movieBioState?.synopsis}</p>
						</div>
						<div className="flex flex-col items-center w-5/6">
							<img className="rounded-lg h-96" src={`https://image.tmdb.org/t/p/w500${movieBioState?.poster}`} alt="Movie Poster Url"></img>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
