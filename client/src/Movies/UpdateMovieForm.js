import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default (props) => {
    const [movie, setMovie] = useState({
        id: 0,
        title: "-",
        director: "-",
        metascore: 0,
        stars: ["-"]
      });
    
    useEffect(() => {
        fetchMovie(props.match.params.id);
    },[])
    
    const fetchMovie = id => {
    axios
        .get(`http://localhost:5001/api/movies/${id}`)
        .then(res => {
            console.log(res.data);
            setMovie(res.data );
        })
        .catch(err => console.log(err.response));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios
        .put(`http://localhost:5001/api/movies/${movie.id}`, movie)
        .then(res => {
            // console.log(res.data);
            setMovie(res.data );
            props.history.push(`/`);
        })
        .catch(err => console.log(err.response));
    }

    const onChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div className="movie-list">
        <h1>Update Movie</h1>
        <div>
            <form onSubmit={onSubmit}>
            <div className="movie-card">
            <h2><input value={movie.title} style={{fontSize:'1.6rem', width:'70%'}} name='title' onChange={onChange}/></h2>
            <div className="movie-director">
                Director: <em><input value={movie.director} onChange={onChange} name='director'/></em>
            </div>
            <div className="movie-metascore">
                Metascore: <strong><input value={movie.metascore} onChange={onChange} name='metascore'/></strong>
            </div>
            <h3>Actors</h3>

            {movie.stars.map(star => (
                <div key={star} className="movie-star">
                {star}
                </div>
            ))}
            <button className='edit-button'> Apply Changes</button>
            </div>
            </form>
        </div>
        </div>

    )
}
