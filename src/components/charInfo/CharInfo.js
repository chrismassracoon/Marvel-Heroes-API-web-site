import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { Component } from 'react/cjs/react.development';
import MarvelService from '../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'

class CharInfo extends Component {
	state = {
		char: null,
		loading: false,
		error: false,
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}
	
	componentDidUpdate(prevProps, prevState) {
		if(this.props.charId !== prevProps.charId){
			this.updateChar();
		}

	}


	updateChar = () => {
		const { charId } = this.props;
		if (!charId) {
			return
		}

		this.marvelService
			.getCharacter(charId)
			.then(this.onCharLoaded)
			.catch(this.onError)

	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}
	onCharLoaded = (char) => {
		this.setState({ char, loading: false })
	}

	render() {
		const { char, loading, error } = this.state;

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
}

const View = ({ char }) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char;
	let imgStyle = {'objectFit' : 'cover'};
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		 imgStyle = {'objectFit' : 'unset'};
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
						if(i <= 10){
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