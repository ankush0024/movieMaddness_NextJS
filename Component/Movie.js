import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from '../styles/Movie.module.css'
function Movie({movie}) {
    const imageURL = "https://image.tmdb.org/t/p/w500/";
  return (
    <div style={{width:"13.7vw",height:"45vh"}}><Link href={`/movie/${movie.id}`} className={style.movie}>
        <img className={style.imageclass}  src={`https://image.tmdb.org/t/p/w500//${movie.backdrop_path}`} width={210} height={320}></img>
        </Link></div>
  )
}

export default Movie;