import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import CharItem from '../charItem/CharItem';
import { setListContent } from '../../utils/setSomeContent';

import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(219);
    const [newCharsLoading, setCharsLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);


    const {getAllCharacters, setProcess, process} = MarvelService();

    useEffect(() => {
        getAllCharacters()
        .then(res => {
            setChars(res);
        })
        .then(() => {
            setProcess('confirmed');
        })
        .then(() => {
            setInitialLoading(false);
        });
    }, []);


    const loadChar = () => {
        setCharsLoading(true);
        getAllCharacters(offset)
        .then(res => {
            setOffset(offset => offset + 9);
            setChars(chars => [...chars, ...res]);
            setCharsLoading(newCharsLoading => false);
            setProcess('confirmed');
        })
        .then(() => {
            setProcess('confirmed');
        })
        .catch(() => {
            setCharsLoading(false);
        })
    }

    const renderChars = (chars) => {
        const elements = chars.map((char, i) => {
            return (
                <CharItem
                    key={char.id}
                    char={char}
                    selectChar={props.selectChar}
                 />
            )
        })

        return (
            <ul className="char__grid">
                {elements}
            </ul>
        )
        
    }

    const listChars = renderChars(chars);

    return (
        <div className="char__list">
            {setListContent(process, listChars, initialLoading)}
            <button 
                style={{
                    display: offset >= 1559 ? 'none' : 'block'
                }}
                disabled={newCharsLoading} 
                onClick={loadChar} 
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

CharList.propTypes = {
    selectChar: PropTypes.func.isRequired,
}   

export default CharList;