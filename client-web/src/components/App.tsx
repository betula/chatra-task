import { memo } from "react";
import Head from "next/head";
import { PlayerList } from "./PlayerList";
import { GameList } from "./GameList";
import { styled } from "~/lib/styled";

const Row = styled.div`
  display: flex;
  background-color: rgb(30,30,30);
  color: rgb(188,188,188);
`
const Left = styled.div`
  background-color: rgb(37,37,38);
  height: 100vh;
  width: 30vw;
`
const Right = styled.div`
  height: 100vh;
  width: 70vw;
`

export const App = memo(() => {
  return (
    <>
      <Head>
        <title>Let's play together</title>
      </Head>
      <Row>
        <Left>
          <PlayerList />
        </Left>
        <Right>
          <GameList />
        </Right>
      </Row>
    </>
  );
});
