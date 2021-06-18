import axios from 'axios';
import authHeader from './auth-header';

class Tarjeta{
    Guardar =(id_usuario,nombre_propietario,numero_tarjeta,fecha_vencimiento, codigo_seguridad) =>{
        return axios.post('https://tienda-libros.herokuapp.com/api/tarjeta/guardar',{
            id_usuario,
            nombre_propietario,
            numero_tarjeta,
            fecha_vencimiento,
            codigo_seguridad
        }, {headers:authHeader()});
    }

    Mostrar = (id_usuario) =>{
        return axios.get('https://tienda-libros.herokuapp.com/api/tarjeta'+id_usuario,{headers:authHeader()} )
    }
}

export default new Tarjeta();