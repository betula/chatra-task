import { memo } from "react";
import { useProvide } from "~/lib/core";
import { styled } from "~/lib/styled";
import { GameList as GameListService } from "~/services/GameList";
import { GameItem } from "./GameItem";
import { LoadingOverlay } from "./atoms/LoadingOverlay";

const Box = styled.div`
  position: relative;
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const GameList = memo(() => {
  const gameList = useProvide(GameListService);
  if (gameList.isEmpty()) {
    return null;
  }

  return (
    <Box>
      <List>
        {gameList.getList().map((item) => <GameItem item={item} key={item.appid} />)}
      </List>
      {gameList.fetcher.inProgress ? <LoadingOverlay/> : null}
    </Box>
  )
});
