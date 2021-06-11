import React, {Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Reserva from '../../services/reserva.services';
import Libro from '../../services/libro.services';
import authServices from '../../services/auth.services';
const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo es requerido!
        </div>
      );
    }
  };

// const Libros = props =>(
//     <option><Input 
//     type="number"
//     className="form-control"
//     name="cantidad"
//     value={props.libro.titulo}
    
//     validations={[required]} />{props.libro.titulo}</option>
// );

export default class CrearReserva extends Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeLibro = this.onChangeLibro.bind(this);
        this.onChangeCantidad = this.onChangeCantidad.bind(this);
        this.state = {
            id_usuario:0,
            libro:"",
            cantidad:0,
            successful:false,
            message:"",
            titulo:[]
        }
    }

    componentDidMount(){
        Libro.Mostrar()
        .then(libro =>{
            const id = authServices.getCurrentUser();
            this.setState({
                id_usuario:id.id
            })
          this.setState({titulo:libro.data});
        })
    }

    onChangeLibro(e){
        this.setState({
            libro: e.target.value
        });
    }

    onChangeCantidad(e){
        this.setState({
            cantidad:e.target.value
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
            console.log(this.state.id_usuario+' '+this.state.libro+' '+this.state.cantidad)
            Reserva.Guardar(
                this.state.id_usuario,
                this.state.libro,
                this.state.cantidad
            )
            .then(
                response =>{
                    this.setState({
                        message: "Reserva Agregada!",
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

    // TodosLibros(){
    //     return this.state.titulo.map((actualLibro, i)=>{
    //         return <Libros libro={actualLibro} key={i} onChange={this.onChangeLibro}/>
    //     })
    // }

    render(){

        return(
            <div className="row col-md-8">

                <Form onSubmit={this.handleRegister} ref={c =>{this.form = c;}}>
                {!this.state.successful && (                <div>
                <div className="mb-3">
                <label htmlFor="libro">Libro</label>                
                    <Input 
                                    type="text"
                                    className="form-control"
                                    name="libro"
                                    value={this.state.libro}
                                    onChange={this.onChangeLibro}
                                    validations={[required]} />
                </div>

                <div className="mb-3">
                <label htmlFor="cantidad">Cantidad</label>
                                    <Input 
                                    type="number"
                                    className="form-control"
                                    name="cantidad"
                                    value={this.state.cantidad}
                                    onChange={this.onChangeCantidad}
                                    validations={[required]}
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