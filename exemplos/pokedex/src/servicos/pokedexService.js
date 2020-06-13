import axios from 'axios'
import {API} from '../config/api'

export async function consultarPokedex() {
    return await axios.get(API.baseURL)
        .then(function (response) {
            // handle success
            //console.log(response.data);
            return response.data.pokemon
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}