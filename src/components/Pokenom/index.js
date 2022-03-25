import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './pokemon.css';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from 'recharts';


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
            heigth: json.height,
            weight: json.weight,
            stats: json.stats,

        };
        console.log(json)
        setPokemondata(pokemon);
    }
    useEffect(() => {
        getPokemon(url);
        // eslint-disable-next-line
    }, []);



    let styles = ''
    if (pokemondata.types) {
        styles = `poke ${pokemondata.types[0].type.name}`
    } else {
        styles = 'card'
    }

    let peso = 0
    if (pokemondata.heigth) {
        peso = pokemondata.heigth / 10
    } else {
        peso = 0
    }
    let altura = 0
    if (pokemondata.weight) {
        altura = pokemondata.weight / 10
    } else {
        altura = 0
    }
    let data = []
    if (pokemondata.stats) {
        data = [
            {
                subject: 'HP',
                A: pokemondata.stats[0].base_stat,
                fullMark: 255,
            },
            {
                subject: 'Attack',
                A: pokemondata.stats[1].base_stat,
                fullMark: 190,
            },
            {
                subject: 'Defense',
                A: pokemondata.stats[2].base_stat,
                fullMark: 250,
            },
            {
                subject: 'Sp. Atk',
                A: pokemondata.stats[3].base_stat,
                fullMark: 194,
            },
            {
                subject: 'Sp. Def',
                A: pokemondata.stats[4].base_stat,
                fullMark: 250,
            },
            {
                subject: 'Speed',
                A: pokemondata.stats[5].base_stat,
                fullMark: 150,
            },
        ];
    } else {
        data = []
    }


    return (
        <>
            <section className='container'>
                <div className={styles}>
                    <h2 className="card-idname">#{pokemondata.id}</h2>
                    <figure className='img-container'>
                        <img className="poke-img" src={pokemondata.avatar} alt={pokemondata.name} />
                        {pokemondata.name ? <figcaption className="card-name">{pokemondata.name[0].toUpperCase() + pokemondata.name.slice(1)}</figcaption> : <p>cargando...</p>}

                    </figure>
                    {pokemondata.types ?
                        pokemondata.types.map((type) => (
                            <p key={type.type.name} className={`type ${type.type.name}`}>{type.type.name[0].toUpperCase() + type.type.name.slice(1)}</p>
                        )) : <p>...cargando...</p>
                    }
                    <div className="fisic">
                        <h5>altura</h5>
                        <p>
                            {pokemondata.heigth ? `${peso.toFixed(1)} m` : '...cargando...'}
                        </p>
                        <h5>peso</h5>
                        <p>
                            {pokemondata.weight ? `${altura.toFixed(1)} kg` : '...cargando...'}
                        </p>
                    </div>
                </div>
            </section>
            <div className="side">
                <section className='container'>
                    <div className="stats-card">
                        <h2>Base stats</h2>
                        <div className="stats">
                            {pokemondata.stats ?
                                pokemondata.stats.map((stat) => (
                                    <div key={stat.stat.name} className="stat">
                                        <h5>{stat.stat.name}</h5>
                                        <p>{stat.base_stat}</p>
                                    </div>
                                ))
                                : <p>...cargando...</p>
                            }
                        </div>
                    </div>
                </section>
                <section className='container'>
                    <div className="card-id">
                        <h2>Base stats</h2>

                        {data ?

                            <RadarChart
                                className="radar"
                                cx={300}
                                cy={250}
                                outerRadius={150}
                                width={500}
                                height={500}
                                data={data}
                            >
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis />
                                <Radar
                                    name="default"
                                    dataKey="A"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>

                            : <p>...cargando...</p>
                        }
                    </div>
                </section>
            </div>
        </>
    )
}