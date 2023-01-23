import React from 'react'
import Movie from './Movie'
import styles from '../styles/MovieList.module.css'
function MovieList({ movieList }) {
    return (
        <div  className={styles.movieList}>{movieList && Array.isArray(movieList) && movieList.map((movie) => {
            return (
              
                <Movie movie={movie} key={movie.id}></Movie>
            )
        })}</div>
    )
}

export default MovieList