import { memo } from "react";
import { useProvide } from "~/lib/core";
import { styled } from "~/lib/styled";
import { GameList as GameListService } from "~/services/GameList";
import { GameItem } from "./GameItem";
import { LoadingOverlay } from "./atoms/LoadingOverlay";
import { Total } from "./Total";

const Box = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
const Top = styled.div``;
const Bottom = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

export const GameList = memo(() => {
  const gameList = useProvide(GameListService);
  if (gameList.isEmpty()) {
    return (
      <Box>
        <Total />
      </Box>
    );
  }

  return (
    <Box>
      <Top>
        <Total />
      </Top>
      <Bottom>
        <List>
          {gameList.getList().map((item) => <GameItem item={item} key={item.appid} />)}
        </List>
      </Bottom>
      {gameList.fetcher.inProgress ? <LoadingOverlay/> : null}
    </Box>
  )
});
