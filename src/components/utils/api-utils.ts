import { Languages } from './dmdb.props';

export const formatLanguageToApi = (language: Languages) => {
	const languageFormatter = {
		enus: 'en-US',
		ptbr: 'pt-BR'
	};

	return languageFormatter[language];
};
