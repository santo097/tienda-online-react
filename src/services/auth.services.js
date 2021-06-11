import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://tienda-libros.herokuapp.com/api/auth/';

// Registro de usuarios

class AuthService {

    login(correo, contraseña) {
      return axios
        .post(API_URL + "signin", {
          correo,
          contraseña
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }
  
    logout() {
      localStorage.removeItem("user");
    }
  
    register(nombre_usuario, cedula, direccion_casa, correo, fecha_nacimiento,noticias, libros_pendiente, contraseña, roles) {
      roles = ["cliente"];
      return axios.post(API_URL + "signup", {
        nombre_usuario,
        cedula,
        direccion_casa,
        correo,
        fecha_nacimiento,
        noticias,
        libros_pendiente,
        contraseña,
        roles
    });
    }

    update(id,nombre_usuario, cedula, direccion_casa, correo, fecha_nacimiento,noticias, libros_pendiente, contraseña, roles) {
      roles = ["cliente"];
      return axios.post('https://tienda-libros.herokuapp.com/api/update/' + id, {
        nombre_usuario,
        cedula,
        direccion_casa,
        correo,
        fecha_nacimiento,
        noticias,
        libros_pendiente,
        contraseña,
        roles
    },{headers:authHeader()});
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }
  }
  
  export default new AuthService();