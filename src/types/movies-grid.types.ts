import { GridType } from '../components/utils/dmdb.props';

export interface MoviesGridParams {
	genre?: number;
	type: GridType;
}

export interface Genre {
	id: number;
	name: string;
}
