import { useState } from "react";


import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchChar from "../searchChar/SearchChar";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const selectChar = (id) => {
        setChar(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList selectChar={selectChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div>
                        <CharInfo selectedCharId={selectedChar}/>
                        <SearchChar/>
                    </div>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
};

export default MainPage;