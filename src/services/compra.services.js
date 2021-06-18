import axios from 'axios';
import authHeader from './auth-header';
import auth from './auth.services';
class Comprar{
    Guardar = (libro,cantidad) =>{
        const id = auth.getCurrentUser();
        const t = id.id;
        return axios.post('http://localhost:3001/api/compra/guardar/'+id.id,
        {
            t,
            libro,
            cantidad
        },{headers:authHeader()})
    }

    Mostrar = () =>{
        return axios.get('https://tienda-libros.herokuapp.com/api/tarjeta',{headers:authHeader()} )
    }
}

export default new Comprar();