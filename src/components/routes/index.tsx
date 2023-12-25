import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Headers } from '../headers';
import { HomePage } from '../home-page';
import { MovieBiography } from '../movie-bio';
import PageNotFound from '../page-not-found';

export default function Router() {
	return (
		<BrowserRouter>
			<Headers />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movie">
					<Route path=":movieId" element={<MovieBiography />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
