import { Box, Checkbox, FormControlLabel, FormGroup, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Genre } from '../../types/movies-grid.types';
import { useUserPreferences } from '../../context/user-preferences';
import { GenreOption } from '../../types/context.types';
import { LANGUAGES } from '../../i18n/translations';

const mockGenres: Array<Genre> = [
	{
		id: 28,
		name: 'Action'
	},
	{
		id: 12,
		name: 'Adventure'
	},
	{
		id: 16,
		name: 'Animation'
	},
	{
		id: 35,
		name: 'Comedy'
	},
	{
		id: 80,
		name: 'Crime'
	},
	{
		id: 99,
		name: 'Documentary'
	},
	{
		id: 18,
		name: 'Drama'
	},
	{
		id: 10751,
		name: 'Family'
	},
	{
		id: 14,
		name: 'Fantasy'
	},
	{
		id: 36,
		name: 'History'
	},
	{
		id: 27,
		name: 'Horror'
	},
	{
		id: 10402,
		name: 'Music'
	},
	{
		id: 9648,
		name: 'Mystery'
	},
	{
		id: 10749,
		name: 'Romance'
	},
	{
		id: 878,
		name: 'Science Fiction'
	},
	{
		id: 10770,
		name: 'TV Movie'
	},
	{
		id: 53,
		name: 'Thriller'
	},
	{
		id: 10752,
		name: 'War'
	},
	{
		id: 37,
		name: 'Western'
	}
];

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 800,
	height: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

export default function StartModal() {
	const { genres, setGenres, isModalOpen, setIsModalOpen, theme, language } = useUserPreferences();
	const [modalSelectedGenres, setModalSelectedGenres] = useState<Array<GenreOption>>(genres);

	function handleGenreSelection(checked: boolean, selectedGenre: Genre) {
		if (checked === true) {
			setModalSelectedGenres([...modalSelectedGenres, selectedGenre]);
		}
		if (checked === false) {
			setModalSelectedGenres(modalSelectedGenres.filter((selected: Genre) => selected.name !== selectedGenre.name));
		}
	}

	function handleGenreSelectionButton() {
		setGenres(modalSelectedGenres);
		localStorage.setItem('genre-select', JSON.stringify(modalSelectedGenres));
		setIsModalOpen(false);
	}

	function handleChecked(mockGenre: GenreOption) {
		const selectedExistentArray = modalSelectedGenres.some(selectedGenre => selectedGenre.name === mockGenre.name);

		if (selectedExistentArray) {
			return true;
		}
		return false;
	}

	useEffect(() => {
		setIsModalOpen(true);
	}, []);

	return (
		<div className={`rounded-lg ${theme.themeBgClassName} ${theme.themeTextClassName}`}>
			<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						{LANGUAGES[language].selectPreferences}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{LANGUAGES[language].minMaxPreferences}
						<FormGroup>
							<div className="justify-center grid grid-cols-3 p-6">
								{mockGenres.map((mockGenre) => {
									return (
										<FormControlLabel
											control={<Checkbox onClick={e => handleGenreSelection((e.target as HTMLInputElement).checked, mockGenre)} checked={handleChecked(mockGenre)} />}
											label={`${mockGenre.name}`}
											key={`check ${mockGenre.id + 1}`}
										/>
									);
								})}
							</div>

							<div className="items-center justify-center flex">
								<button
									disabled={!!(modalSelectedGenres.length < 3 || modalSelectedGenres.length > 5)}
									className={'rounded-lg bg-slate-900 text-white w-1/3'}
									key={`akey-${modalSelectedGenres.length}`}
									onClick={() => handleGenreSelectionButton()}
								>
									{LANGUAGES[language].submit}
								</button>
							</div>
						</FormGroup>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
