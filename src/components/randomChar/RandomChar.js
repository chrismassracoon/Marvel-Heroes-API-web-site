import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

class RandomChar extends Component {
	state = {
		char: {},
		loading: true,
		error: false,
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}
	componentDidMount() {
		this.updateChar();
	}
	marvelService = new MarvelService();

	onCharLoaded = (char) => {
		this.setState({ char, loading: false })
	}
	updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.marvelService
			.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError)
	}

	render() {
		const { loading, char, error } = this.state;
		const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
		const spinner = loading ? <Spinner></Spinner> : null;
		const content = !(loading || error) ? <View char={char}></View> : null;


		return (
			<div className="randomchar">
				{errorMessage}
				{spinner}
				{content}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button className="button button__main">
						<div onClick={this.updateChar} className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		)
	}
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;
	const isAvaliable = thumbnail.includes('not_available') ? 'randomchar__img unavaliable': 'randomchar__img';


	return (
		<div className="randomchar__block">
			<img  src={thumbnail} alt="Random character" className={isAvaliable} />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;