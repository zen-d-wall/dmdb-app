import React, { createContext, useContext, useState } from 'react';
import { Languages } from '../components/utils/dmdb.props';
import { GenreOption, ThemeContent, ThemeOptions, UserPreferencesContext } from '../types/context.types';

export const themeOption: ThemeOptions = {
	night: {
		themeSelected: 'night',
		themeBgClassName: 'bg-slate-900',
		themeTextClassName: 'text-white',
		lighterThemeBgClassName: 'bg-slate-800',
		movieProfileHoverTheme: 'bg-slate-600',
		border: 'border-slate-200'
	},
	light: {
		themeSelected: 'light',
		themeBgClassName: 'bg-slate-200',
		themeTextClassName: 'text-slate-800',
		lighterThemeBgClassName: 'bg-slate-100',
		movieProfileHoverTheme: 'bg-slate-400',
		border: 'border-slate-900'
	}
};

const UserPreferenceContext = createContext({} as UserPreferencesContext);

export default function UserPreferencesProvider({ children }: any) {
	const localStorageGenres = localStorage.getItem('genre-select');

	const [language, setLanguage] = useState<Languages>(getLanguageFromLocalStorage());
	const [theme, setTheme] = useState<ThemeContent>(themeOption[getThemeFromLocalStorage()]);
	const [genres, setGenres] = useState<Array<GenreOption>>(JSON.parse(localStorageGenres !== null ? localStorageGenres : '[]'));
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<UserPreferenceContext.Provider
			value={{
				language,
				setLanguage,
				theme,
				setTheme,
				genres,
				setGenres,
				isModalOpen,
				setIsModalOpen
			}}
		>
			{children}
		</UserPreferenceContext.Provider>
	);
}

export function useUserPreferences() {
	const { language, setLanguage, theme, setTheme, genres, setGenres, isModalOpen, setIsModalOpen } = useContext(UserPreferenceContext);
	return { language, setLanguage, theme, setTheme, genres, setGenres, isModalOpen, setIsModalOpen };
}

function getLanguageFromLocalStorage() {
	const language = localStorage.getItem('dmdb-language');

	if (language && (language === 'enus' || language === 'ptbr')) {
		return language;
	}

	return 'enus';
}

function getThemeFromLocalStorage() {
	const theme = localStorage.getItem('dmdb-theme');

	if (theme && (theme === 'light' || theme === 'night')) {
		return theme;
	}

	return 'night';
}
