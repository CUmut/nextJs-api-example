import React from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import unfetch from "isomorphic-unfetch";
import slug from "slug";
import styles from "./slug.module.css";

function CharacterDetail({ character }) {
  return (
    <Layout>
      <Head>
        <title>Ana sayfa</title>
      </Head>

      <div className={styles.div}>
        <div>
          <a className={styles.a}>{character.name}</a>
        </div>
        <a className={styles.a}>Location : {character.location.name}</a>
        <br />
        <a className={styles.a}>Gender : {character.gender}</a>

        <figure>
          <img
            className={styles.img}
            src={character.image}
            alt={character.name}
          />
        </figure>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const data = await unfetch("https://rickandmortyapi.com/api/character/");
  const characters = await data.json();

  const paths = characters.results.map((character) => {
    return { params: { slug: `${slug(character.name)}-${character.id}` } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const id = params.slug.split("-").slice(-1)[0];
  const data = await unfetch("https://rickandmortyapi.com/api/character/" + id);
  const character = await data.json();

  return {
    props: {
      character,
    },
  };
}

export default CharacterDetail;
