import './charList.scss';
import MarvelService from '../services/MarvelService';
import { Component } from 'react/cjs/react.development';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';


class CharList extends Component {
 state = {
	CharList : [],
	loading: true,
	error: false,
 }

marvelService = new MarvelService();

updateChar = () => {
	this.marvelService.getAllCharacters()
		.then(this.onCharLoaded)
		.catch(this.onError)
}

onError = () => {
	this.setState({
		 error: true,
		 loading: false
	})
}

onCharLoaded = (CharList) => {
	this.setState({ CharList , loading: false })
}
componentDidMount() {
	this.updateChar();
}

renderCharList = (arr) => {
	const items =  arr.map((item) => {
		let imgStyle = {'objectFit' : 'cover'};
		if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
			 imgStyle = {'objectFit' : 'unset'};
		}
		
		return (
			 <li 
				  className="char__item"
				  key={item.id}>
						<img src={item.thumbnail} alt={item.name} style={imgStyle}/>
						<div className="char__name">{item.name}</div>
			 </li>
		)
  });
  return (
		<ul className="char__grid">
			 {items}
		</ul>
  )
}


render() {
	const {CharList, loading, error} = this.state;
	const items = this.renderCharList(CharList);
	const errorMessage = error ? <ErrorMessage />: null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;
	return (
		<div className="char__list">
			  	{errorMessage}
                {spinner}
                {content}
			<button className="button button__main button__long">
				<div className="inner">load more</div>
			</button>
		</div>
	)
}


}
export default CharList;