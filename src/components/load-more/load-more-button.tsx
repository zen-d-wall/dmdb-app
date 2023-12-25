import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { useUserPreferences } from '../../context/user-preferences';

interface LoadMoreButtonParams {
	open: boolean, 
	onClick: () => void
}

export function LoadMoreButton({open, onClick}: LoadMoreButtonParams) {
	const { theme } = useUserPreferences();
	
	return (
		<button className={`flex flex-col text-5xl pr-16 ${theme.themeBgClassName}`} onClick={onClick}>
			{!open ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
		</button>
	);
}
