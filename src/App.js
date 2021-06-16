import React, { Component } from "react";
import Navbar from "./components/Layouts/Navbar";

export default class App extends Component {


  render() {
   return (
  <html lang="es">
      <head>
      <meta charset="UTF-8" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"></link>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet"></link>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css" rel="stylesheet"></link>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous" /> */}
      </head>
      <Navbar />
  </html>
   )


}
}
