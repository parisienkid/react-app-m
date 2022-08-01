import ErrorMessage from "../error/ErrorMessage";
import { Link } from "react-router-dom";

import './Page404.scss';


const Page404 = () => {
    return (
        <div className="nf">
            <ErrorMessage/>
            <p style={{marginTop: '50px', fontSize: 28, textAlign: 'center', fontWeight: 'bold'}}>Page not found <span style={{color: '#9F0013', fontSize: 35}}>404</span></p>
            <Link to="/">Come back</Link>
        </div>
    )
};

export default Page404;