import React, {Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Noticias from '../../services/noticias.services';

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo es requerido!
        </div>
      );
    }
  };


export default class CrearNoticias extends Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeTitulo = this.onChangeTitulo.bind(this);
        this.onChangeNoticia = this.onChangeNoticia.bind(this);
        this.state = {
            titulo:"",
            noticia:"",
            successful:false,
            message:""
        }
    }

    onChangeTitulo(e){
        this.setState({
            titulo:e.target.value
        });
    }

    onChangeNoticia(e){
        this.setState({
            noticia:e.target.value
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
            Noticias.Guardar(
                this.state.titulo,
                this.state.noticia,
                

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
                <label htmlFor="titulo">Titulo</label>
                                    <Input 
                                    type="text"
                                    className="form-control"
                                    name="titulo"
                                    value={this.state.titulo}
                                    onChange={this.onChangeTitulo}
                                    validations={[required]}
                                    />
                </div>
                <div className="mb-3">
                <label htmlFor="noticias">Noticia</label>
                                    <Input 
                                    type="text"
                                    className="form-control"
                                    name="noticia"
                                    value={this.state.noticia}
                                    onChange={this.onChangeNoticia}
                                    validations={[required
                                    ]}
                                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block">Agregar</button>
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