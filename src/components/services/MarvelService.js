

class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=fde2fb6545d4b9bb701333641860018e';


	getResource = async (url) => {
		let res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status ${res.status}`);
		}
		return await res.json();
	}

	getAllCharacters = async () => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
		return res.data.results.map(this._transformCharacter)
	}
	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	}

	transformDescription = (desc) => {
		if(desc.length < 1){
			return 'Sorry, there is no description'
		} else if(desc.length > 150){
			return desc.slice(0, 170)+ '...'
		} else {
			return desc
		}
	}

	_transformCharacter = (char) => {
		return {
			name: char.name,
			description: this.transformDescription(char.description) ,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
		}
	}
}

export default MarvelService;