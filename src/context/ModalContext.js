import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    const [idReceta, setIdReceta] = useState(null);

    const [detalles, setDetalles] = useState({});

    useEffect(() => {
        
        if(!idReceta) return;
        const detallesReceta = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
            
            const resultado = await axios.get(url);
            
            setDetalles(resultado.data.drinks[0]);
            
        }
         detallesReceta();       
    }, [idReceta])

    return ( 
        <ModalContext.Provider
            value={{
                detalles,
                setDetalles,
                setIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;
