// TODO: Make this a controlled component. On each stroke of the key, it should filter the displayed pokemon

import { useContext } from "react"
import PokemonContext from "../context/PokemonContext"

const Filter = () => {
    const { filter, setFilter, health, setHealth } = useContext(PokemonContext)
    return (<>
        <div className="ui search">
            <div className="ui icon input">
                <input onChange={event => setFilter(event.target.value)} className="prompt" placeholder="Search by Name..." value={filter} />
                <i className="search icon" />
            </div>
        </div>
        <div className='ui range'>
            <input type='range' className='prompt' min='1' max='100' value={health} onChange={event => setHealth(event.target.value)} />
            <p>Minimum HP: {health}</p>
        </div>
    </>

    )
}

export default Filter