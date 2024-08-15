import { useContext, useState } from "react"
import PokemonContext from "../context/PokemonContext"

const PokemonForm = () => {
    const { setAllPokemon } = useContext(PokemonContext)
    const [name, setName] = useState('')
    const [hp, setHp] = useState('')
    const [frontSprite, setFrontSprite] = useState('');
    const [backSprite, setBackSprite] = useState('');

    const handleSumbit = async (event) => {
        event.preventDefault();
        const newPokemon = {
            name,
            hp: parseInt(hp, 10),
            front: frontSprite,
            back: backSprite

        }
        try {
            const exampleOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPokemon),
            };
            const url = "http://localhost:4000/pokemon";
            const response = await fetch(url, exampleOptions);
            const data = await response.json();
            setAllPokemon(currentPokemon => [...currentPokemon, data]);
        }
        catch (error) {
            setError(error)
        }
        setName('');
        setHp('');
        setFrontSprite('');
        setBackSprite('');
    }
    return (
        <div>
            <h3>Add a Pokemon!</h3>
            <form className="ui form" onSubmit={handleSumbit}>
                <div className="four fields" widths="equal">
                    <div className="field ui fluid">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="field ui fluid">
                        <label>HP</label>
                        <input type="text" name="hp" placeholder="HP" value={hp} onChange={(event) => setHp(event.target.value)} />
                    </div>
                    <div className="field ui fluid">
                        <label>Front Image URL</label>
                        <input type="text" name="front" placeholder="url" value={frontSprite} onChange={(event) => setFrontSprite(event.target.value)} />
                    </div>
                    <div className="field ui fluid">
                        <label>Back Image URL</label>
                        <input type="text" name="back" placeholder="url" value={backSprite} onChange={(event) => setBackSprite(event.target.value)} />
                    </div>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </div>
    )
}


export default PokemonForm
