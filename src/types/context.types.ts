import { Languages, ToneMode } from '../components/utils/dmdb.props';

export interface ThemeContent {
	themeSelected: ToneMode;
	themeBgClassName: string;
	themeTextClassName: string;
	lighterThemeBgClassName: string;
	movieProfileHoverTheme: string;
	border: string;
}

export interface ThemeOptions {
	night: ThemeContent;
	light: ThemeContent;
}

export interface GenreOption {
	id: number;
	name: string;
}

export interface UserPreferencesContext {
	language: Languages;
	setLanguage: React.Dispatch<React.SetStateAction<Languages>>;
	theme: ThemeContent;
	setTheme: React.Dispatch<React.SetStateAction<ThemeContent>>;
	genres: Array<GenreOption>;
	setGenres: React.Dispatch<React.SetStateAction<GenreOption[]>>;
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
