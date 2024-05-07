import { GridType, Languages } from '../utils/dmdb.props';
import { formatLanguageToApi } from '../utils/api-utils';
import { apiKey, axiosInstance } from '../../utils/axios-instance';

export async function MoviesGridService(language: Languages, type: GridType, genre?: number) {
	const url = {
		top: '/movie/top_rated?',
		genre: `/discover/movie?with_genres=${genre}&`
	};

	return axiosInstance
		.get(`${url[type]}api_key=${apiKey}&language=${formatLanguageToApi(language)}`)
		.then(r => {
			return r.data;
		})
		.catch(error => alert(error));
}
