import axios from 'axios';
import authHeader from './auth-header';

class Reserva{
    Guardar = (id_usuario,libro,cantidad,estado) =>{
        return axios.post('https://tienda-libros.herokuapp.com/api/reserva/guardar',
        {
            id_usuario,
            libro,
            cantidad,
            estado
        },{headers:authHeader()})
    }

    Mostrar = () =>{
        return axios.get('https://tienda-libros.herokuapp.com/api/reserva',{headers:authHeader()} )
    }

    BuscarPorId = (id) =>{
        return axios.get('https://tienda-libros.herokuapp.com/api/reserva/'+ id,{headers:authHeader()} )
    }

    Eliminar = (id) =>{
        return axios.get('https://tienda-libros.herokuapp.com/api/reserva/borrar/'+ id, {headers:authHeader()});
    }
}

export default new Reserva();