import AppHeader from "../appHeader/AppHeader";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const SingleCharacter = lazy(() => import('../pages/singleCharacter'))

const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner></Spinner>}>
						<Routes>
							<Route path='/' element={<MainPage></MainPage>} />
							<Route path='/comics' element={<ComicsPage></ComicsPage>} />
							<Route path='/comics/:comicId' element={<SingleComicPage></SingleComicPage>} />
							<Route path="/character/:charId" element={<SingleCharacter></SingleCharacter>}></Route>
							<Route path='*' element={<Page404></Page404>} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	)
}

export default App;