import { useState, useEffect } from "react";
import handleFetch from '../utils/handleFetch';
import PokemonContext from "./PokemonContext";

// TODO: Import the PokemonContext

const starterPokemon = [
    {
        id: 0,
        name: "butterfree 1",
        hp: 60,
        front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
        back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/12.png"
    },
    {
        id: 1,
        name: "butterfree 2",
        hp: 60,
        front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
        back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/12.png"
    },
    {
        id: 2,
        name: "butterfree 3",
        hp: 60,
        front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
        back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/12.png"
    }
]

const PokemonProvider = ({ children }) => {
    const [allPokemon, setAllPokemon] = useState(starterPokemon);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [health, setHealth] = useState('0');


    // TODO: use useEffect to fetch data from the local JSON server (remember to start JSON server!)
    useEffect(() => {
        const initialFetch = async () => {
            const [data, error] = await handleFetch("http://localhost:4000/pokemon");
            if (data) setAllPokemon(data);
            if (error) setError(error);
        }
        initialFetch()
        console.log(allPokemon)
    }, [])

    useEffect(() => {
        const doFetch = async () => {
            let url = "http://localhost:4000/pokemon";
            if (filter) {
                url += `?name_like=${filter}`
            }
            if (health) {
                if (filter) {
                    url += `&hp_gte=${health}`
                } else {
                    url += `?hp_gte=${health}`
                }
            }
            const [data, error] = await handleFetch(url)
            if (data) setAllPokemon(data);
            if (error) setError(error);
        }
        doFetch()
    }, [filter, health])
    // TODO: Add values to be included in the context here
    let contextValues = { allPokemon, setAllPokemon, error, setError, filter, setFilter, health, setHealth }

    // TODO: Wrap the {children} in the PokemonContext.Provider and provide the values above
    return (
        <PokemonContext.Provider value={contextValues}>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider;