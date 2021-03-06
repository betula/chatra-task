import { memo } from "react";
import { useProvide } from "~/lib/core";
import { styled } from "~/lib/styled";
import { PlayerList as PlayerListService } from "~/services/PlayerList";
import { PlayerItem } from "./PlayerItem";
import { NewPlayer } from "./NewPlayer";
import { LoadingOverlay } from "./atoms/LoadingOverlay";

const Box = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
const Top = styled.div``;
const Bottom = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

const ListBox = memo(() => {
  const playerList = useProvide(PlayerListService);
  if (playerList.isEmpty()) {
    return null;
  }
  return (
    <List>
      {playerList.getList().map((item) => <PlayerItem item={item} key={item.steamid} />)}
    </List>
  )
});

export const PlayerList = memo(() => {
  const playerList = useProvide(PlayerListService);
  return (
    <Box>
      <Top>
        <NewPlayer />
      </Top>
      <Bottom>
        <ListBox />
      </Bottom>
      {playerList.fetcher.inProgress ? <LoadingOverlay/> : null}
    </Box>
  )
});
