import React from 'react'

export const Alerta = ({ alerta }) => {
    return (
        // <div className={`${alerta.error ? 'from-red-400 to-red-600'
        //     : 'from-sky-400 to-sky-400'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}>
        <div
            style={{
                // para definir estilos condicionales en un componente. Específicamente, está utilizando una expresión ternaria 
                background: alerta ? 'red' : '#38BDF8',
                padding: '10px',
                color: 'white',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                padding: '10px',
                border: '1px solid white',
                borderRadius: '10px',
                textAlign: 'center'
            }}
        >
            {alerta.msg}
        </div>
    )
}
