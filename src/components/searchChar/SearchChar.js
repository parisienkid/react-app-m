import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';
import MarvelService from '../../services/MarvelService';

import './searchChar.scss';

const SearchChar = () => {

    const {getCharacterByName} = MarvelService();
    const [search, setSearch] = useState('inactive');
    const [char, setChar] = useState(null);

    const searchChar = (name) => {
        getCharacterByName(name)
        .then(res => {
            setSearch('found')
            setChar(res);
        })
        .catch(() => {
            setSearch('not found')
        });
    };

    const Found = ({name}) => {
        return (
            <div className="search__status">
                <div className="search__info">There is! Visit <span className='search_red'>{name}</span> page?</div>
                <Link to='/'>
                    <button className='button button__secondary'>
                        <div className="inner">TO PAGE</div>
                    </button>
                </Link>
            </div>
        )
    };

    const NotFound = (props) => {
        return (
            <div className="search__status">
                <div className="search__info search_red">{props.children ? props.children : 'The character was not found. Check the name and try again'}</div>
            </div>
        )
    };

    const setStatus = (status) => {
        switch (status) {
            case 'found':
                return <Found name={char.name}/>;
            case 'not found':
                return <NotFound/>;
            default:
                return null;
        }
    };

    return(
        <div className="search">
            <Formik
                initialValues={{ search: '' }}
                validationSchema={ Yup.object({
                    search: Yup.string().required('This field is required')
                })}
                onSubmit={(values) => {
                    console.log(values)
                    searchChar(values.search);
                }}
            >
                <Form>
                    <label htmlFor="search">Or find a character by name:</label>
                    <div className="search__wrapper">
                        <Field placeholder="Enter name" className="search__input" type="text" name="search"/>
                        <button className="button button__main" type="submit">
                            <div className="inner">Find</div>
                        </button>
                    </div>
                    {setStatus(search)}
                    {search == "not found" ? null : <ErrorMessage name='search' component={NotFound}/>}
                </Form>
            </Formik>
        </div>
    )
};

export default SearchChar;