import axios from 'axios';
import authHeader from './auth-header';

class Noticias{
    Guardar = (titulo,noticia) =>{
        return axios.post('https://tienda-libros.herokuapp.com/api/noticias/guardar',
        {
            titulo,
            noticia
        },{headers:authHeader()})
    }

    Mostrar = () =>{
        return axios.get('https://tienda-libros.herokuapp.com/api/noticias',{headers:authHeader()} )
    }
}

export default new Noticias();