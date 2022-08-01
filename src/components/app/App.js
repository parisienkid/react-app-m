import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import SingleComic from "../pages/SingleComicPage/SingleComic";
import Spinner from "../spinner/Spinner";

import { Suspense, lazy } from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

const Page404 = lazy(() => import('../pages/Page404'));


function App()  {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:comicId" element={<SingleComic/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;