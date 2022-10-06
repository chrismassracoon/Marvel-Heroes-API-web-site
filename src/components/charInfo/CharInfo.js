import './charInfo.scss';
import MarvelService from '../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field} from 'formik';

const CharInfo = (props) => {
	const [char, setChar] = useState(null);

	const {loading, error , getCharacter, clearError, getCharacterByName} = MarvelService();

	useEffect(() => {
		updateChar();
	}, [props.charId]);

const [isFind, setFind] = useState(false);
const [isSubmit, setSubmit] = useState(false);
const [findedChar, setFinded] = useState(0);

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
	const searchText = (isFind && isSubmit) ? <div style={{marginTop: '20px', color: 'green'}}>Hero is finded! Go to page! <Link to={`/character/${findedChar}`} style={{marginLeft: '70px'}} className="button button__secondary"><div className="inner">Page</div></Link></div> : <div style={{marginTop: '20px', color: 'red'}}>Nothing is finded</div>

	return (
		<div className='char__element'>
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
		<div className='char__search'>
			<h2>Search hero by name</h2>
			<Formik  initialValues={{search: ''}} 
			onSubmit={async (values) => {
				setFind(false)
				setSubmit(false);
				let result = await getCharacterByName(values['search']).then(res => {return res})
				if(result) {
					setFinded(result.id)
					setFind(true);
				}
				  setSubmit(true);
			 }}>
			 <Form>
					<Field placeholder='Enter name' type='input' name='search'></Field>
				<button className="button button__main" type="submit">
				<div className="inner">Search</div>
           </button>
			  {isSubmit === false ? null : searchText}
				</Form>
			</Formik>
		</div>
		</div>
	)
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics, comicsId } = char;
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
									<Link to={`/comics/${item.resourceURI.match(/\d+$/)}`}>{item.name} </Link>
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