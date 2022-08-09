import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import { Component } from "react/cjs/react.production.min";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { useState } from "react";
import ComicsList from '../comicsList/ComicsList'

const App = () => {
	const [renderProp, setRenderProp] = useState('comics');
	const	[selectedChar, setSelectedChar] = useState(null);

	const onChangeRender = (prop) => {
		setRenderProp(prop);
	}

	const onCharSelected = (id) => {
		setSelectedChar(id);
	}
    return (
        <div className="app">
            <AppHeader renderProp={renderProp} onChangeRender={onChangeRender}/>
            <main>
					<ErrorBoundary>
                <RandomChar/>
					 </ErrorBoundary>
					 {renderProp == 'comics' ? <ComicsList></ComicsList> : <>
					 <div className="char__content">
					 <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
						  </ErrorBoundary>
						  <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
						  </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
					 </>}
            </main>
        </div>
    )
}

export default App;