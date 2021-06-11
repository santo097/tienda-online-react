import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
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


export default class ActualizarLibro extends Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeTitulo = this.onChangeTitulo.bind(this);
        this.onChangeAutor = this.onChangeAutor.bind(this);
        this.onChangeAño_publicacion = this.onChangeAño_publicacion.bind(this);
        this.onChangeGenero = this.onChangeGenero.bind(this);
        this.onChangeNumPaginas = this.onChangeNumPaginas.bind(this);
        this.onChangeEditorial = this.onChangeEditorial.bind(this);
        this.onChangeIssn = this.onChangeIssn.bind(this);
        this.onChangeIdioma = this.onChangeIdioma.bind(this);
        this.onChangeCantidad = this.onChangeCantidad.bind(this);
        this.state = {
            titulo:"",
            autor:0,
            año_publicacion:"",
            genero:"",
            num_paginas:Date(),
            editorial:false,
            issn:0,
            idioma:"",
            estado:false,
            cantidad:0,
            successful:false,
            message:""
        }
    }

    componentDidMount(){
        const currentUser = AuthService.getCurrentUser();
        console.log(currentUser.id);
        axios.get('https://tienda-libros.herokuapp.com/api/libro/'+currentUser.id, {headers:authHeader()})
        .then(user =>{
            console.log(user.data);
            this.setState({
                titulo:user.data.titulo
            })
            this.setState({
                autor:user.data.autor
            })
            this.setState({
                año_publicacion:user.data.año_publicacion
            })
            this.setState({
                genero:user.data.genero
            })
            this.setState({
                num_paginas:user.data.num_paginas
            })
            this.setState({
                editorial:user.data.editorial
            })
            this.setState({
                issn:user.data.issn
            })
            this.setState({
                idioma:user.data.idioma
            })
            this.setState({
                cantidad:user.data.cantidad
            })
        })    
    }

    onChangeTitulo(e){
        this.setState({
            titulo: e.target.value
        });
    }

    onChangeAutor(e){
        this.setState({
            autor:e.target.value
        });
    }

    onChangeAño_publicacion(e){
        this.setState({
            año_publicacion:e.target.value
        });
    }

    onChangeGenero(e){
        this.setState({
            genero:e.target.value
        });
    }

    onChangeNumPaginas(e){
        this.setState({
            num_paginas:e.target.value
        });
    }

    onChangeEditorial(e){
        this.setState({
            editorial:e.target.value
        })
    }
    onChangeIssn(e){
        this.setState({
            issn:e.target.value
        })
    }
    onChangeIdioma(e){
        this.setState({
            idioma:e.target.value
        })
    }
    onChangeCantidad(e){
        this.setState({
            cantidad:e.target.value
        })
    }

    handleRegister(e){
        e.preventDefault();
        this.setState({
            message:"",
            successful:false
        });

        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0){

            AuthService.update(
                this.state.titulo,
                this.state.autor,
                this.state.año_publicacion,
                this.state.genero,
                this.state.num_paginas,
                this.state.editorial,
                this.state.issn,
                this.state.idioma,
                this.state.estado,
                this.state.cantidad,
            )
            .then(
                response =>{
                    this.setState({
                        message: 'El Libro fue actualizado',
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
                <label htmlFor="nombre_usuario">Titulo</label>
                <Input 
                                    type="text"
                                    className="form-control"
                                    name="nombre_usuario"
                                    value={this.state.titulo}
                                    onChange={this.onChangeTitulo}
                />
                </div>

                <div className="mb-3">
                <label htmlFor="cedula">Autor</label>
                                    <Input 
                                    type="text"
                                    className="form-control"
                                    name="autor"
                                    value={this.state.autor}
                                    onChange={this.onChangeAutor}
                                    validations={[required]}
                />
                </div>

                <div className="mb-3">
                <label htmlFor="direccion_casa">Año de publicacion</label>
                <Input 
                    type="date"
                    className="form-control"
                    name="direccion_casa"
                    value={this.state.año_publicacion}
                    onChange={this.onChangeAño_publicacion}
                    validations={[required]}
                />
                </div>
                <div className="mb-3">
                <label htmlFor="correo">Genero</label>
                                    <Input 
                                    type="text"
                                    className="form-control"
                                    name="genero"
                                    value={this.state.genero}
                                    onChange={this.onChangeGenero}
                                    validations={[required]}
                                    />
                </div>
                <div className="mb-3">
                <label htmlFor="num_paginas">Num. paginas</label>
                                    <Input 
                                    type="number"
                                    className="form-control"
                                    name="num_paginas"
                                    value={this.state.num_paginas}
                                    onChange={this.onChangeNumPaginas}
                                    validations={[required]}
                                    />
                </div>
                <div className="mb-3">
                <label htmlFor="editorial">Editorial</label>
                                    <Input 
                                    type="text"
                                    className="form-control"
                                    name="editorial"
                                    value={this.state.editorial}
                                    onChange={this.onChangeEditorial}
                                    validations={[required
                                    ]}
                                    />
                </div>
                <div className="mb-3">
                <label htmlFor="issn">Issn</label>
                                    <Input 
                                    type="text"
                                    className="form-control"
                                    name="issn"
                                    value={this.state.issn}
                                    onChange={this.onChangeIssn}
                                    validations={[required,
                                    ]}
                                    />
                </div>
                <div className="mb-3">
                <label htmlFor="idioma">Idioma</label>
                                    <Input 
                                    type="text"
                                    className="form-control"
                                    name="idioma"
                                    value={this.state.idioma}
                                    onChange={this.onChangeIdioma}
                                    validations={[required,
                                    ]}
                                    />
                </div>
                <div className="mb-3">
                <label htmlFor="cantidad">Cantidad</label>
                                    <Input 
                                    type="number"
                                    className="form-control"
                                    name="cantidad"
                                    value={this.state.cantidad}
                                    onChange={this.onChangeCantidad}
                                    validations={[required
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