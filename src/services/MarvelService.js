import { useHttpRequest } from "../hooks/http.hook";

const MarvelService = () => {
    const {request, process, setProcess} = useHttpRequest();

    const  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const  _apiKey = 'apikey=7c81a2aedb5527bb55a233e56d7a1643';


    const getAllCharacters = async (offset = 210) => {
        let charsData = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return charsData.data.results.map(_transformResource);
    }

    const getCharacter = async (id) => {
        const charData = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformResource(charData.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const char = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return _transformResource(char.data.results[0], true);
    };

    const getComics = async (id) => {
        const comicsData = await request(`${_apiBase}characters/${id}/comics?${_apiKey}`);
        return comicsData.data.results.map(_transformComics);
    }

    const getAllComics = async (offset = 0, limit = 8) => {
        const comicsData = await request(`${_apiBase}comics?orderBy=issueNumber&limit=${limit}&offset=${offset}&${_apiKey}`);
        return comicsData.data.results.map(_transformAllComics);
    }

    const getComic = async (comicId) => {
        const comicData = await request(`${_apiBase}/comics/${comicId}?${_apiKey}`);
        return comicData.data.results.map(_transformComic);
    }



    const _transformAllComics = (res) => {
        const transformed = {
            name: res.title,
            id: res.id,
            images: res.images[0] ? res.images[0].path + '.' + res.images[0].extension : 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/clean.jpg',
            price: res.prices[0].price,
            url: res.urls[0].url
        }
        return transformed;
    }

    const _transformComics = (res) => {
        const transformed = {
            name: res.title,
            id: res.id,
        }
        return transformed;
    }

    const _transformComic = (res) => {
        const transformed = {
            name: res.title,
            id: res.id,
            description: res.description,
            lang: res.textObjects.length > 0 ? res.textObjects[0].language : 'No info', 
            pages: res.pageCount ? res.pageCount + ' pages' : 'No info',
            image: res.images[0] ? res.images[0].path + '.' + res.images[0].extension : 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/clean.jpg',
            price: res.prices[0].price ? res.prices[0].price + '$' : 'No info',
        }
        return transformed;
    }

    const _transformResource = (res, byname = false) => {
        const transformed = {
            name: res.name,
            description: res.description,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            imgObjectFit: null,
            id: res.id
        }
        if (transformed.description === '') {
            transformed.description = 'No information on this hero';
        }
        if (transformed.description.length > 180 && !byname) {
            transformed.description = transformed.description.slice(0, 220) + '...';
        }
        if (transformed.thumbnail.split(".jpg")[0] === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
            transformed.imgObjectFit = 'contain'
            
        } else {
            transformed.imgObjectFit = 'cover'
        }
        return transformed;
    }

    return {request, 
            getAllCharacters,
            getCharacter, 
            getComics, 
            getAllComics, 
            getComic, 
            getCharacterByName,
            process,
            setProcess}
}

export default MarvelService;