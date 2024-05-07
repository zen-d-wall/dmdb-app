import dayjs from 'dayjs';
import { Languages } from './dmdb.props';

interface RegionFormats {
	enus: DayjsFormats;
	ptbr: DayjsFormats;
}

interface DayjsFormats {
	dateFormat: string;
	hourFormat?: string;
}

const regionFormat: RegionFormats = {
	enus: {
		dateFormat: 'MM/DD/YYYY'
	},
	ptbr: {
		dateFormat: 'DD/MM/YYYY'
	}
};

export function formatDate(language: Languages, date: string) {
	if (date && regionFormat[language].dateFormat) {
		return dayjs(date).format(regionFormat[language].dateFormat);
	}

	return 'Invalid Date';
}
