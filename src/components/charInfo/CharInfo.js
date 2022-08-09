import './charInfo.scss';
import { Component } from 'react/cjs/react.development';
import MarvelService from '../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import { useEffect, useState } from 'react';

const CharInfo = (props) => {
	const [char, setChar] = useState(null);

	const {loading, error , getCharacter, clearError} = MarvelService();

	useEffect(() => {
		updateChar();
	}, [props.charId]);



	const updateChar = () => {
		clearError();
		const { charId } = props;
		if (!charId) {
			return
		}


			getCharacter(charId)
			.then(onCharLoaded)

	}

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const skeleton = char || loading || error ? null : <Skeleton> </Skeleton>
	const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char}></View> : null;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;
	let imgStyle = { 'objectFit': 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { 'objectFit': 'unset' };
	}
	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className={"char__info-name"}>{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">Homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			{comics.length > 0 ? <div className="char__comics">Comics:</div> : null}
			<ul className="char__comics-list">
				{
					comics.map((item, i) => {
						if (i <= 10) {
							return (
								<li key={i} className="char__comics-item">
									{item.name}
								</li>
							)
						} else {
							return
						}

					})
				}
			</ul>
		</>
	)
}
export default CharInfo;