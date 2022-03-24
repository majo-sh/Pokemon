
import { useEffect, useState } from 'react';
import Card from '../Card'
import './cards.css'


export default function Cards() {

  const [pokemons, setPokemons] = useState([]);
  const [load, setLoad] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');


  const getPokemons = async (url) => {
    let res = await fetch(url),
      json = await res.json();
    //console.log(json);
    setLoad(json.next)

    json.results.forEach(async (el) => {
      let res = await fetch(el.url),
        json = await res.json();

      //console.log(json);
      let pokemon = {
        id: json.id,
        name: json.name,
        avatar: json.sprites.front_default,
        types: json.types,
      };

      setPokemons((pokemons) => [...pokemons, pokemon]);
    });
  };

  useEffect(() => {
    getPokemons(load);
    // eslint-disable-next-line
  }, []);

// eslint-disable-next-line
let data = pokemons.sort( (a,b)=>{
  if (a.id === b.id){
    return 0;
  }
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
})


  return (
    <>
      <div className='grid'>
        {
          data.map((pokemon) => (
            <Card key={pokemon.name} id={pokemon.id} names={pokemon.name} avatar={pokemon.avatar} types={pokemon.types} />
          ))
        }
        <button className="btn" onClick={()=>getPokemons(load)}> Load more</button>
      </div>
    </>
  )
}