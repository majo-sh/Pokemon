import { Link } from 'react-router-dom'
import './card.css'



export default function Card({ names, id, avatar, types }) {

    console.log(names, )
    const styles = `card ${types[0].type.name}`

    return (
        <Link to={`/${names}`} >
            <section className={styles}>
                <h2 className="card-idname">#{id}</h2>
                <figure className='img-container'>
                    <img className="card-img" src={avatar} alt={names} />
                    <figcaption className="card-name">{names[0].toUpperCase() + names.slice(1)}</figcaption>
                </figure>
                {
                    types.map((type) => (
                        <p className={`type ${type.type.name}`}>{type.type.name[0].toUpperCase() + type.type.name.slice(1)}</p>
                    ))
                }
            </section>
        </Link>
    )
}