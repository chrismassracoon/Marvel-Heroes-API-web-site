import './appHeader.scss';

const AppHeader = (prop) => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a style={prop.renderProp === 'characters' ? {'color': 'red'} : null} onClick={() => prop.onChangeRender('characters')} href="#">Characters</a></li>
                    /
                    <li><a style={prop.renderProp === 'comics' ? {'color': 'red'} : null} onClick={() => prop.onChangeRender('comics')} href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;