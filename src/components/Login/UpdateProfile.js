import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from '../../services/auth.services';
import axios from 'axios';
import authHeader from '../../services/auth-header';
const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo es requerido!
        </div>
      );
    }
  };

const validEmail = value =>{
    if(!isEmail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                Esto no es un correo
            </div>
        );
    }
}

const isNombre_usuario = value =>{
    if(value.length < 3 || value.length > 20){
        return(
            <div className="alert alert-danger" role="alert">
                El nombre de usuario debe ser por lo menos 3 caracteres
            </div>
        )
    }
}

const isDate = value =>{
    if(value === Date.now()){
        return(
            <div className="alert alert-danger" role="alert">
                Esta fecha no esta disponible
            </div>
        )
    }
}

const isContraseña = (value) =>{
    if(value.length < 8 || value.length > 20){
        return(
            <div className="alert alert-danger" role="alert">
                La contraseña debe ser por lo menos de 8 caracteres y maximo 20
            </div>
        )
    }
}

export default class UpdateProfile extends Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeNombreUsuario = this.onChangeNombreUsuario.bind(this);
        this.onChangeCedula = this.onChangeCedula.bind(this);
        this.onChangeDireccionCasa = this.onChangeDireccionCasa.bind(this);
        this.onChangeFechaNacimiento = this.onChangeFechaNacimiento.bind(this);
        this.onChangeContraseña = this.onChangeContraseña.bind(this);
        this.state = {
            nombre_usuario:"",
            cedula:0,
            direccion_casa:"",
            correo:"",
            fecha_nacimiento:Date(),
            noticias:false,
            libros_pendiente:0,
            contraseña:"",
            roles:["clientes"],
            successful:false,
            message:""
        }
    }

    componentDidMount(){
        const currentUser = AuthService.getCurrentUser();
        console.log(currentUser.id);
        axios.get('http://localhost:3000/api/usuarios/'+currentUser.id, {headers:authHeader()})
        .then(user =>{
            this.setState({
                nombre_usuario:user.data.nombre_usuario
            })
            this.setState({
                cedula:user.data.cedula
            })
            this.setState({
                direccion_casa:user.data.direccion_casa
            })
            this.setState({
                correo:user.data.correo
            })
            this.setState({
                fecha_nacimiento:user.data.fecha_nacimiento
            })
            this.setState({
                contraseña:user.data.contraseña
            })
        })    
    }

    onChangeNombreUsuario(e){
        this.setState({
            nombre_usuario: e.target.value
        });
    }

    onChangeCedula(e){
        this.setState({
            cedula:e.target.value
        });
    }

    onChangeDireccionCasa(e){
        this.setState({
            direccion_casa:e.target.value
        });
    }

    onChangeFechaNacimiento(e){
        this.setState({
            fecha_nacimiento:e.target.value
        });
    }

    onChangeContraseña(e){
        this.setState({
            contraseña:e.target.value
        });
    }

    handleRegister(e){
        e.preventDefault();
        this.setState({
            message:"",
            successful:false
        });

        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0){
            const currentUser = AuthService.getCurrentUser();
            AuthService.update(
                currentUser.id,
                this.state.nombre_usuario,
                this.state.cedula,
                this.state.direccion_casa,
                this.state.correo,
                this.state.fecha_nacimiento,
                this.state.noticias,
                this.state.libros_pendiente,
                this.state.contraseña,
                

            )
            .then(
                response =>{
                    this.setState({
                        message: response.data.message,
                        successful: true
                      });
                },
                error =>{
                    const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
        
                  this.setState({
                    successful: false,
                    message: resMessage
                  });
                }
            );
        }
    }

    render(){
        
        return(
            <div className="row">
            
                <Form onSubmit={this.handleRegister} ref={c =>{this.form = c;}}>
                {!this.state.successful && (                <div>
                <div className="mb-3">
                <label htmlFor="nombre_usuario">Nombre usuario</label>
                <Input 
                                    type="text"
                                    className="form-control"
                                    name="nombre_usuario"
                                    value={this.state.nombre_usuario}
                                    onChange={this.onChangeNombreUsuario}
                                    validations={[required, isNombre_usuario]}
                />
                </div>

                <div className="mb-3">
                <label htmlFor="cedula">Cedula</label>
                                    <Input 
                                    type="number"
                                    className="form-control"
                                    name="cedula"
                                    value={this.state.cedula}
                                    onChange={this.onChangeCedula}
                                    validations={[required]}
                />
                </div>

                <div className="mb-3">
                <label htmlFor="direccion_casa">Direccion casa</label>
                <Input 
                    type="text"
                    className="form-control"
                    name="direccion_casa"
                    value={this.state.direccion_casa}
                    onChange={this.onChangeDireccion_casa}
                    validations={[required]}
                />
                </div>
                <div className="mb-3">
                <label htmlFor="correo">Correo</label>
                                    <Input 
                                    type="text"
                                    className="form-control"
                                    name="correo"
                                    value={this.state.correo}
                                    onChange={this.onChangeCorreo}
                                    validations={[required, validEmail]}
                                    />
                </div>
                <div className="mb-3">
                <label htmlFor="fecha_nacimiento">Fecha nacimiento</label>
                                    <Input 
                                    type="date"
                                    className="form-control"
                                    name="fecha_nacimiento"
                                    value={this.state.fecha_nacimiento}
                                    onChange={this.onChangeFecha_nacimiento}
                                    validations={[required, isDate]}
                                    />
                </div>
                <div className="mb-3">
                <label htmlFor="contraseña">Contraseña</label>
                                    <Input 
                                    type="password"
                                    className="form-control"
                                    name="contraseña"
                                    value={this.state.contraseña}
                                    onChange={this.onChangeContraseña}
                                    validations={[required, isContraseña
                                    ]}
                                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block">Actualizar</button>
                </div>
                </div>)}

                {this.state.message && (
                    <div className="form-group">
                        <div className={
                            this.state.successful 
                            ? "alert alert-success"
                            : "alert alert-danger"
                            }
                            role="alert">
                            {this.state.message}
                            </div>
                    </div>
                )}

                <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
            </Form>
            </div>
        )
    }
}