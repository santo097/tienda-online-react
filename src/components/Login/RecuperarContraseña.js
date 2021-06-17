import React, {Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from '../../services/auth.services';

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


const isContraseña = (value) =>{
    if(value.length < 8 || value.length > 20){
        return(
            <div className="alert alert-danger" role="alert">
                La contraseña debe ser por lo menos de 8 caracteres y maximo 20
            </div>
        )
    }
}

export default class RecuperarContraseña extends Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeCorreo = this.onChangeCorreo.bind(this);
        this.onChangeContraseña = this.onChangeContraseña.bind(this);
        this.state = {
            correo:"",
            contraseña:"",
            successful:false,
            message:""
        }
    }

    onChangeCorreo(e){
        this.setState({
            correo:e.target.value
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
            AuthService.recuperarContraseña(
                this.state.correo,
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
                    <button className="btn btn-primary btn-block">Recuperar Contraseña</button>
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