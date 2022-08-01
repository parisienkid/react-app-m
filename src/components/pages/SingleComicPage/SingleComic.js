import './singleComic.scss';
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from 'react';

import MarvelService from '../../../services/MarvelService';
import { setContent } from '../../../utils/setSomeContent';

const SingleComic = () => {

    const {getComic, process, setProcess} = MarvelService();
    const {comicId} = useParams();

    const [comic, setComic] = useState({});

    useEffect(() => {
        getComic(comicId)
        .then(res => {
            setComic(res[0]);
        })
        .then(() => {
            setProcess('confirmed')
        });
    },[]);

    const renderComic = () => {
        return (
            <>
                <img src={comic.image} alt="x-men" className="single-comic__img"/>
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{comic.name}</h2>
                        <p className="single-comic__descr">{comic.description}</p>
                        <p className="single-comic__descr">{comic.pages}</p>
                        <p className="single-comic__descr">Language: {comic.lang}</p>
                        <div className="single-comic__price">Price: {comic.price}</div>
                    </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </>
        )
    };
    
    return (
        <div className="single-comic">
            {setContent(process, renderComic())}
        </div>
    )
}

export default SingleComic;