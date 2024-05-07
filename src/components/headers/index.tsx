import { Link } from 'react-router-dom';
import SwitchToneModeButton from '../night-day-mode/toggle-button/toggle-button';
import { Languages } from '../utils/dmdb.props';
import { useUserPreferences } from '../../context/user-preferences';
import StartModal from '../start-modal';
import { LANGUAGES } from '../../i18n/translations';

export function Headers() {
	const { language, setLanguage, theme, setIsModalOpen, isModalOpen } = useUserPreferences();
	const buttonInactiveClass = 'opacity-25 transition-all';
	const localStorageGenres = localStorage.getItem('genre-select');

	function handleLanguageChange(languageOption: Languages) {
		setLanguage(languageOption);

		localStorage.setItem('dmdb-language', languageOption);
	}

	function getFlagButtonClass(buttonLanguage: Languages) {
		if (language !== buttonLanguage) {
			return buttonInactiveClass;
		}

		return '';
	}

	return (
		<>
			<div className={`${theme.themeBgClassName} flex justify-between h-24 w-100`}>
				<Link to="/">
					<div className={`flex text-6xl ${theme.themeTextClassName} font-montserrat pl-9 pt-4`}>DMDB</div>
				</Link>
				<button className={`${theme.themeTextClassName} text-2xl font-extrabold`} onClick={() => setIsModalOpen(true)}>
					{LANGUAGES[language].genres}
				</button>
				<div className="flex items-center">
					<div className={`flex pr-10 text-2xl ${theme.themeTextClassName}`}>
						<SwitchToneModeButton />
					</div>
					<div className="flex text-2xl mr-5">
						<button className={getFlagButtonClass('enus')} onClick={() => handleLanguageChange('enus')}>
							🇺🇸
						</button>
						<button className={getFlagButtonClass('ptbr')} onClick={() => handleLanguageChange('ptbr')}>
							🇧🇷
						</button>
					</div>
				</div>
			</div>
			{isModalOpen === true || localStorageGenres === null || localStorageGenres === '[]' ? <StartModal /> : ''}
		</>
	);
}
