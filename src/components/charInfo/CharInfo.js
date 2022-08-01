import { useState, useEffect } from 'react';

import MarvelService from '../../services/MarvelService';
import { setContent } from '../../utils/setSomeContent';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const [comics, setComics] = useState(null);

    const {getCharacter, getComics, setProcess, process} =  MarvelService();

    useEffect(() => {
        const {selectedCharId} = props;
        if (selectedCharId !== null) {
            updateChar(selectedCharId);
        }
    }, [props]);

    const updateChar = (id) => {
            setComics(null);
            getComics(id)
            .then(res => {
                setComics(res);
            })
            getCharacter(id)
            .then(res => {
                setChar(res);
            })
            .then(() => {
                setProcess('confirmed');
            })
    }

    return (
        <div className="char__info">
            {setContent(process, <View comics={comics} char={char}/>)}
        </div>
    )
    
}

const View = ({char, comics}) => {
    const {name, thumbnail, wiki, homepage, discription, imgObjectFit} = char;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={{
                    objectFit: `${imgObjectFit}`
                }}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={`${homepage}`} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={`${wiki}`} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {discription}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics != null && comics.length === 0 ? 'No info' : null}
                {   
                    comics == null ? null : 
                        comics.map((item, i) => {
                            // eslint-disable-next-line
                            if (i > 9) { return }
                            return (
                                <li key={item.id} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        })
                }
            </ul>
        </>
    )
}

export default CharInfo;