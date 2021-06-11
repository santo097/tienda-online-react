import axios from 'axios';
import authHeader from './auth-header';

class Libro{
    Mostrar = ()=>{
        return axios.get('https://tienda-libros.herokuapp.com/api/libro', {headers:authHeader()});
    }

    Guardar = (titulo,autor,año_publicacion,genero,num_paginas,editorial,issn,idioma,estado,cantidad) =>{
        return axios.post('https://tienda-libros.herokuapp.com/api/libro/guardar',
        {
            titulo,
            autor,
            año_publicacion,
            genero,
            num_paginas,
            editorial,
            issn,
            idioma,
            estado,
            cantidad
        } ,{headers:authHeader()})
    }
}

export default new Libro();