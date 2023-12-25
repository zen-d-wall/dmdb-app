import { useUserPreferences } from '../../context/user-preferences';
import { LANGUAGES } from '../../i18n/translations';
import { formatDate } from '../utils/date-utils';

interface MovieProfileProps {
	pictureUrl: string;
	releaseDate: string;
	ratingPosition?: number;
	title: string;
	overview: string;
}

export function MovieProfile({ pictureUrl, releaseDate, title, overview }: Readonly<MovieProfileProps>) {
	const { language, theme } = useUserPreferences();

	const truncatedDescription = overview && overview.length > 130 ? `${overview.slice(0, 130)}...` : overview;
	return (
		<div
			className={`${theme.lighterThemeBgClassName} ${theme.themeTextClassName} group hover:${theme.movieProfileHoverTheme} hover:scale-125 transition-transform rounded-lg flex flex-col text-center font-semibold p-4 self-auto align-middle`}
		>
			<img className="mx-auto h-80 w-60 rounded-md" src={pictureUrl} alt={`Banner do Filme${title}`} />
			<p>{title}</p>
			<p className="font-nunito font-light">
				{LANGUAGES[language].releaseDate} {formatDate(language, releaseDate)}
			</p>
			<br />
			<p className="hidden group-hover:block">
				{LANGUAGES[language].overview}: <p className="font-light">{truncatedDescription} </p>
			</p>
		</div>
	);
}
