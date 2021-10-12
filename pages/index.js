import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import slug from "slug";
import unfetch from "isomorphic-unfetch";

function HomePage({ characters }) {
  return (
    <Layout>
      <Head>
        <title>Ana sayfa</title>
      </Head>
      <h1 className={styles.title}>The Rick and Morty</h1>

      <ul>
        {characters.results.map((character) => (
          <li key={character.id}>
            <Link
              href="/character/[slug]"
              as={`/character/${slug(character.name)}-${character.id}`}
            >
              <h2 className={styles.card}>{character.name}</h2>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{``}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await unfetch("https://rickandmortyapi.com/api/character/");
  const characters = await data.json();
  return {
    props: {
      characters,
    },
  };
}

export default HomePage;
