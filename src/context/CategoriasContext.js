import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//crear context 
export const CategoriasContext = createContext();

//provider es donde se encuantran las funciones y el state
const CategoriasProvider = (props) => {

    //crear el state del Context
    const [categorias, setCategorias] = useState([]);

    //ejecutar el llamado a la api
    useEffect(() => {
       const obtenerCategorias = async () =>{
           const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
           const categorias = await axios.get(url);

           setCategorias(categorias.data.drinks);
       }

       obtenerCategorias();
    }, [])

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;