import { GET_VIDEOGAMES,
    GET_GENRE,GET_DETAIL,
    FILTER_BY_GENRES,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    GET_NAME_VIDEOGAMES,
    VACIAR_DETAIL,
    CLEAR_VIDEOGAMES
 } from '../constantes';

 import axios from 'axios';

export function getVideogames() {
    return async function (dispatch){
        const json = await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data,
        })
    }
}
 
export function getGenre(){
    return function (dispatch){
        axios.get("http://localhost:3001/genres")
        .then((generos) => {
            return dispatch ({
                type: GET_GENRE,
                payload: generos.data
            });
        })
        .catch((error) => console.log(error))
    }
}


export function filterByGenres(payload){
    return {
        type: FILTER_BY_GENRES,
        payload,
    }
}

export function getDetail(id){
    return function (dispatch){
        axios.get(`http://localhost:3001/videogame/${id}`)
    
        .then(game => {
            console.log(game.data)
            dispatch({
                type: GET_DETAIL,
                payload: game.data
            });
        })
        .catch((error) => console.log(error))
    }
}

export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload,
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload,
    }
}

export function orderByRating(payload){
    return{
        type: ORDER_BY_RATING,
        payload,
    }
}

export function getNameVideogames(name){
    return async function (dispatch){
        
            const json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            dispatch({
                type: GET_NAME_VIDEOGAMES,
                payload: json.data
            })    
        }
}

export function postVideogame(payload){
    return async function (){
        try {
            const json = await axios.post("http://localhost:3001/videogame", payload)
            return json
        } catch (error) {
            console.log(error)
        }
    }
}

export function vaciarDetail(payload){
    return {
        type: VACIAR_DETAIL,
        payload,
    }
}

export function clearVideogame(){
    let rest = [];
    return function(dispatch){
        dispatch({
            type: CLEAR_VIDEOGAMES,
            payload: rest
        })
    }
}