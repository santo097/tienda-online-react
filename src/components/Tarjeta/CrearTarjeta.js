import React, {Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Reserva from '../../services/reserva.services';
import Libro from '../../services/libro.services';
import Tarjeta from '../../services/tarjeta.services';
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


export default class CrearTarjeta extends Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeNombre_propietario = this.onChangeNombre_propietario.bind(this);
        this.onChangeNumero_tarjeta = this.onChangeNumero_tarjeta.bind(this);
        this.onChangeFecha_vencimiento = this.onChangeFecha_vencimiento.bind(this);
        this.onChangeCodigo_seguridad = this.onChangeCodigo_seguridad.bind(this);

        this.state = {
            id_usuario:0,
            nombre_propietario:"",
            numero_tarjeta:0,
            fecha_vencimiento:Date(),
            codigo_seguridad:0,
            successful:false,
            message:"",
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

    onChangeNombre_propietario(e){
        this.setState({
            nombre_propietario: e.target.value
        });
    }
    onChangeNumero_tarjeta(e){
        this.setState({
            numero_tarjeta: e.target.value
        });
    }
    onChangeFecha_vencimiento(e){
        this.setState({
            fecha_vencimiento: e.target.value
        });
    }

    onChangeCodigo_seguridad(e){
        this.setState({
            codigo_seguridad:e.target.value
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
            Tarjeta.Guardar(
                this.state.id_usuario,
                this.state.nombre_propietario,
                this.state.numero_tarjeta,
                this.state.fecha_vencimiento,
                this.state.codigo_seguridad
            )
            .then(
                response =>{
                    this.setState({
                        message: "Tarjeta Agregada!",
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
            <div className="row col-md-8">

                <Form onSubmit={this.handleRegister} ref={c =>{this.form = c;}}>
                {!this.state.successful && (                <div>
                <div className="mb-3">
                <label htmlFor="nombre_propietario"><span>Nombre</span></label>
                <Input 
                                    type="text"
                                    className="form-control"
                                    name="nombre_propietario"
                                    value={this.state.nombre_propietario}
                                    onChange={this.onChangeNombre_propietario}
                                    validations={[required]}
                />
                </div>

                <div className="mb-3">
                <label htmlFor="numero_tarjeta">Numero de tarjeta</label>
                                    <Input 
                                    type="number"
                                    className="form-control"
                                    name="numero_tarjeta"
                                    value={this.state.numero_tarjeta}
                                    onChange={this.onChangeNumero_tarjeta}
                                    validations={[required]}
                />
                </div>
                <div className="mb-3">
                <label htmlFor="fecha_vencimiento">Fecha de Tarjeta</label>
                                    <Input 
                                    type="date"
                                    className="form-control"
                                    name="fecha_vencimiento"
                                    value={this.state.fecha_vencimiento}
                                    onChange={this.onChangeFecha_vencimiento}
                                    validations={[required]}
                />
                </div>
                <div className="mb-3">
                <label htmlFor="codigo_seguridad">Codigo de seguridad</label>
                                    <Input 
                                    type="number"
                                    className="form-control"
                                    name="codigo_seguridad"
                                    value={this.state.codigo_seguridad}
                                    onChange={this.onChangeCodigo_seguridad}
                                    validations={[required]}
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