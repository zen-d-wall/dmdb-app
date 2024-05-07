import { FiSun, FiMoon } from 'react-icons/fi';
import { ToneMode } from '../../utils/dmdb.props';
import { themeOption, useUserPreferences } from '../../../context/user-preferences';

export default function SwitchToneModeButton() {
	const { theme, setTheme } = useUserPreferences();

	function toggleTheme() {
		const finalTheme: ToneMode = theme.themeSelected === 'light' ? 'night' : 'light';

		setTheme(themeOption[finalTheme]);

		localStorage.setItem('dmdb-theme', finalTheme);
	}

	return <button onClick={toggleTheme}>{theme.themeSelected === 'light' ? <FiSun /> : <FiMoon />}</button>;
}
