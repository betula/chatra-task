import { memo } from "react";
import { useProvide } from "~/lib/core";
import { GameList as GameListService } from "~/services/GameList";
import { GameItem } from "./GameItem";
import { styled } from "~/lib/styled";

const Box = styled.div`
  position: relative;
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
const LoadingOverlay = styled.div`
  position: absolute;
  left: 1px;
  top: 1px;
  right: 1px;
  bottom: 1px;
  border: 1px solid rgb(200,200,200);
  background-color: rgba(0,0,0,.5);
  :before {
    content: "loading";
    position: absolute;
    right: 0;
    top: 0;
    background: rgb(200,200,200);
    color: rgb(30,30,30);
    padding: 3px 7px;
  }
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
