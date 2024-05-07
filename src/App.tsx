import Router from './components/routes';
import UserPreferencesProvider from './context/user-preferences';

function App() {
	return (
		<>
			<UserPreferencesProvider>
				<Router />
			</UserPreferencesProvider>
		</>
	);
}

export default App;
