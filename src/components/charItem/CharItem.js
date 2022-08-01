import { useEffect, useState } from "react";
import './charItem.scss';

const CharItem = (props) => {
    const [char, setChar] = useState({});

    useEffect(() => {
        setChar(props.char);
    }, []);


    const {name,thumbnail,imgObjectFit,id} = char;

    return (
        <li className="char__item" onClick={() => props.selectChar(id)}>
            <img style={{
                objectFit: `${imgObjectFit}`
            }} src={thumbnail} alt={`${name} avatar`}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharItem;