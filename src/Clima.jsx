import axios from 'axios';

import React, { useState } from 'react'
import { Alerta } from './Alerta';



export const Clima = () => {


    // grados kelvin
    const kelvin = 273.15;

    const [pais, setPais] = useState('');
    const [infoPais, setInfoPais] = useState({});
    const [ciudad, setCiudad] = useState('');
    const [clima, setClima] = useState({});
    const [bgcolor, setBgcolor] = useState('rgb(71,149,212)')
    const [alerta, setAlerta] = useState({})





    const handleSubmit = async (e) => {
        e.preventDefault() // prevenir la accion por default

        // validar que los campos no vengan vacios
        // el [] dentro del if es convertir una variable string hacia un arreglo
        // .includes('') dice que si uno de los arreglos viene vacio
        if ([ciudad].includes('')) {
            setAlerta({
                // type: 'Error', para poner como un tipo de error si uso sweetalert2
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return // para que no se siga ejecutando el codigo
        }


        // si todo esta bien la alarta vuelve hacer vacia
        setAlerta({})

        // crear el usuario en la API
        try {



            const PaisUrl = `https://restcountries.com/v3.1/name/${pais}`

            const Paisrespuesta = await axios(PaisUrl);
            const abreviaturaPais = Paisrespuesta.data[0].cca2
            setInfoPais(Paisrespuesta);
            const appId = 'd569138957c84d6e614b63324d2dc334'
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${abreviaturaPais}&appid=${appId}`
            const respuesta = await axios(url);

            setClima(respuesta.data);


            // cambiar el fondo segun la temperatura
            const actual = respuesta.data.main.temp - kelvin;

            if (actual < 10) {
                setBgcolor('rgb(105,108,149)')
            } else if (actual >= 10 && actual < 25) {
                setBgcolor('rgb(71,149,212)')
            } else {
                setBgcolor('rgb(178,28,61)')
            }

            // reiniciamos el formulario
            setPais('');
            setCiudad('');
            setAlerta({});
        } catch (error) {
            setAlerta({
                msg: error.response.data.message,
                error: true
            })
            setPais('');
            setCiudad('');
            setAlerta({});
        }
    }

    // console.log(infoPais.data[0].flags.png);

    const { msg } = alerta

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: bgcolor
            }}>

                <div style={{ padding: '20px' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Check the weather in your city</h1>
                    {/* mostrar la alerta */}
                    {msg && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div style={{ display: 'flex', paddingTop: '10px', gap: '5px', alignItems: 'center' }}>
                                {/* label del pais */}
                                <label style={{
                                    fontWeight: 'bold'
                                }} htmlFor="pais">Country:</label>
                                <input
                                    style={{ width: '100%', padding: '5px' }}
                                    type="text"
                                    id="pais"
                                    value={pais}
                                    onChange={(event) => setPais(event.target.value)}

                                />
                            </div>

                            <div style={{ display: 'flex', paddingTop: '10px', gap: '5px', alignItems: 'center' }}>
                                {/* label de la ciudad */}
                                <label style={{
                                    fontWeight: 'bold'
                                }}
                                    htmlFor="ciudad">City:</label>
                                <input
                                    style={{ width: '100%', padding: '5px' }}

                                    type="text"
                                    id="ciudad"
                                    value={ciudad}
                                    onChange={(event) => setCiudad(event.target.value)}

                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    margin: '5px',
                                    backgroundColor: '#16CBA8',
                                    color: 'white',
                                    marginTop: '20px',
                                    padding: '10px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    width: '100%'
                                }}
                            >
                                Get Weather
                            </button>
                        </div>



                    </form>



                    {clima.main ?
                        <>
                            <div style={{ marginTop: '20px' }}>
                                <h2 style={{ textAlign: 'center' }}>weather in {clima.name}, {clima?.sys?.country}</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Temperature:{''}
                                        {clima?.main?.temp && parseInt(clima?.main?.temp - kelvin)} {''}°C</p>
                                    {clima?.weather?.[0]?.icon &&
                                        <img src={`https://openweathermap.org/img/w/${clima?.weather?.[0]?.icon}.png`} alt="Descripción de mi imagen" />

                                    }


                                </div>
                                {infoPais &&
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src={infoPais.data[0].flags.png} alt="Descripción de mi imagen" />
                                    </div>

                                }
                            </div>


                        </>
                        : null
                    }

                </div>
            </div>
        </>



    )
}

