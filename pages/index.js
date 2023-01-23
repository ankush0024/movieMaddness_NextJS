import Head from 'next/head'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import MovieList from '../Component/MovieList'
import styles from '../styles/Home.module.css'
import axios from "axios";
import useSWR from "swr";
export default function Home() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([])
  const api_Key = "c30605bf20d63e4be66ebbc5422b595b";
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error, mutate } = useSWR(`https://api.themoviedb.org/3/trending/movie/day?page=${page}&api_key=${api_Key}&language=en-US`, fetcher);


  const movieList = [];
  const onScroll = () => {

    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    console.log({ scrollTop, scrollHeight, clientHeight });
    if (scrollTop + clientHeight >= (scrollHeight - 10)) {
      setPage(page + 1)
    }
  }
  useEffect(() => {
    mutate();
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [items])
  useEffect(() => {
    if (!Array.isArray(data?.results)) return
    setItems([...items, ...data.results]);
    return () => { }
  }, [data])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header><h1>Trending Movies</h1></header>
        {data && <MovieList movieList={items}></MovieList>}
      </main>

      <footer className={styles.footer}>
        {/*  <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
      </footer>
    </div>
  )
}