import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, setRecetas] = useState([]);

    const [buscarRecetas, setBuscarRecetas] = useState({
        nombre: '',
        categorias: ''
    })

    const { nombre , categoria } = buscarRecetas;

    const [consultar, setConsultar] = useState(false);

    useEffect(() => {
        if(consultar){
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                
                const resultado = await axios.get(url);

                setRecetas(resultado.data.drinks);
            }
            
            obtenerRecetas()
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buscarRecetas])

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                setBuscarRecetas,
                setConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider;