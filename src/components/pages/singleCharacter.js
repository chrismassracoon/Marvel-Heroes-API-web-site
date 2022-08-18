import { useEffect, useState } from 'react';
import useMarvelService from '../services/MarvelService';
import './singleCharasterStyle.scss';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../errorMessage/errorMessage';
import  Spinner  from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';
import { Helmet } from 'react-helmet';


const SingleCharacter = () => {
	const [char, setChar] = useState(null);
	const { charId } = useParams();


	const { loading, error, getCharacter } = useMarvelService();

	useEffect(() => {
		updateChar()
	}, [charId])


	const updateChar = () => {
		getCharacter(charId)
			.then(charLoaded)
	}

	const charLoaded = (char) => {
		setChar(char);
	}


	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View charItem={char} /> : null;

	return (
		<>
			<AppBanner />
			{errorMessage}
			{spinner}
			{content}
		</>
	)
}


const View = ({ charItem }) => {
	const { thumbnail, char, name, description } = charItem;
	return (
	<div className="single-comic">
		<Helmet>
				<meta
					name="description"
					content={`${name} char info`}
				/>
    			<title>{name}</title>
				</Helmet>
		<img src={thumbnail} alt={char} className="single-comic__char-img" />
		<div className="single-comic__info">
			<h2 className="single-comic__name">{name}</h2>
			<p className="single-comic__descr">{description}</p>
		</div>
	</div>
	)
}

export default SingleCharacter;