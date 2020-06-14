import axios from 'axios'
import {API} from '../config/api'

export async function consultarPokedex() {
    return await axios.get(API.pokedex)
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

export async function consultarSpecies(id) {
    const servico = API.pokeapi + `pokemon-species/${id}/`
    return await axios.get(servico)
        .then(function (response) {            
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

export async function consultarPkemon(id) {
    const servico = API.pokeapi + `pokemon/${id}/`
    return await axios.get(servico)
        .then(function (response) {            
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