import { memo } from "react";
import Head from "next/head";
import { PlayerList } from "./PlayerList";
import { Header } from "./Header";

export const App = memo(() => {
  return (
    <>
      <Head>
        <title>Let's together</title>
      </Head>
      <section className="todoapp">
        <Header />
        <PlayerList />
      </section>
      <footer className="info">
        <p>Developed by <a href="https://github.com/betula" target="_blank">Viacheslav Bereza</a></p>
      </footer>
    </>
  );
});
