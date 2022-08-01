import { useEffect, useState } from 'react';
import ComicsItem from '../comicsItem/ComicsItem';
import MarvelService from '../../services/MarvelService';
import { setListContent } from '../../utils/setSomeContent';


import './comicsList.scss';

const ComicsList = () => {

    const [comics, setComics] = useState(null);
    const [offset, setOffset] = useState(8);
    const {getAllComics, process, setProcess} = MarvelService();
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        getAllComics()
        .then(res => {
            setComics(res);
        })
        .then(() => {
            setProcess('loading')
        })
        .then(() => {
            setInitialLoading(false);
        })
    }, []);

    const loadNewComics = () => {
        getAllComics(offset)
        .then(res => {
            setOffset(offset => offset + 8)
            setComics(comics => comics.concat(res));
        })
        
    };

    const renderComics = (comics) => {
        if (comics !== null) {
            const comicsList = comics.map((item, i) => {
                return (
                    <ComicsItem id={comics[i].id} url={comics[i].url} name={comics[i].name} price={comics[i].price} img={comics[i].images} key={i}/>
                )
            });
    
            return (
                <ul className="comics__grid">
                    {comicsList}
                </ul>
            )
        }
        return null;                            
    };

    return (
        <div className="comics__list">
            {setListContent(process, renderComics(comics), initialLoading)}
            <button onClick={loadNewComics} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;