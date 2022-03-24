import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"



export default function Pokemon() {
    const { pokemonid } = useParams()
    const [pokemondata, setPokemondata] = useState([])
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonid}`


    const getPokemon = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error('Network response was not OK');
          }
          const json = await res.json();

        let pokemon = {
            id: json.id,
            name: json.name,
            avatar: json.sprites.front_default,
            types: json.types,
        };
        setPokemondata(pokemon);
    }
    useEffect(() => {
        getPokemon(url);
        // eslint-disable-next-line
    }, []);
    

 
    let styles = ''
     if (pokemondata.types) {
         styles = `card ${pokemondata.types[0].type.name}`
    } else{
         styles = 'card'
    }


    return (
        <>
            <section className={styles}>
                <h2 className="card-id">#{pokemondata.id}</h2>
                <figure className='img-container'>
                    <img className="card-img" src={pokemondata.avatar} alt={pokemondata.name} />
                    <figcaption className="card-name">{pokemondata.name}</figcaption>
                </figure>
                {pokemondata.types?
                    pokemondata.types.map((type) => (
                        <p key={type.type.name} className={`type ${type.type.name}`}>{type.type.name}</p>
                    )):<p>...cargando...</p>
                }
            </section>

        </>
    )
}