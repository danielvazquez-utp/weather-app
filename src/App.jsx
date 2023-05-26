import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {

  const api_key = "b90add97e8658958811faddd000ec8b5";
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);
  const [nombre, setNombre] = useState('Ciudad');
  const [temperatura, setTemperatura] = useState(0);
  const [clima, setClima] = useState('');
  const [humedad, setHumedad] = useState(0);
  const [viento, setViento] = useState(0);
  const [icono, setIcono] = useState('https://openweathermap.org/img/wn/10d@2x.png');

  const getGeoCode = async ( ciudad='Puebla', pais='MX', limite=1 ) => { 
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ ciudad },${ pais }&limit=${ limite }&appid=${api_key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      //console.log(data[0]);
      setNombre( data[0].local_names.es );
      setLatitud( data[0].lat );
      setLongitud( data[0].lon );
    } catch (error) {
      console.log(error);
    }
  }

  const getWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric&lang=es`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setTemperatura( data.main.temp );
      setClima( data.weather[0].description );
      setIcono( `https://openweathermap.org/img/wn/${ data.weather[0].icon }.png` );
      setViento(data.wind.speed );
      setHumedad( data.main.humidity );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGeoCode();
    getWeatherData(latitud, longitud);
  }, []);
  

  const temp_style = {
    fontSize: "7rem", 
  }

  const bgImg_style = {
    backgroundColor : "gray",
    backgroundImage: "url('https://wallpaperaccess.com/full/1540016.jpg')",
    backgroundSize: "100%",
  }

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
  const dias = [ 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo' ];
  const hoy = new Date();
  const nodia = dias[hoy.getDay()-1];
  const dia = hoy.getDate();
  const mes = meses[ hoy.getMonth() ];
  const anhio = hoy.getFullYear();

  return (
    <div className='' style={ bgImg_style } >
      <div className='row'>
        <div className='col'>
          <h3>Weather App</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h3>{ nombre }</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h3>{ nodia } { dia } de { mes } de { anhio } </h3>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h1 style={ temp_style } >{ temperatura }°C</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h3><img src={ icono } />  { clima }  </h3>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h3>Humedad: { humedad }%</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h3>Velocidad del viento: { viento } km</h3>
        </div>
      </div>
    </div>
  )
}

export default App;