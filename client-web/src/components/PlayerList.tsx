import { memo } from "react";
import { useProvide } from "~/lib/core";
import { styled } from "~/lib/styled";
import { PlayerList as PlayerListService } from "~/services/PlayerList";
import { PlayerItem } from "./PlayerItem";
import { ToggleAll } from "./ToggleAll";
import { LoadingOverlay } from "./atoms/LoadingOverlay";

const Box = styled.div`
  position: relative;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const PlayerList = memo(() => {
  const playerList = useProvide(PlayerListService);
  if (playerList.isEmpty()) {
    return null;
  }

  return (
    <Box>
      <ToggleAll />
      <List>
        {playerList.getList().map((item) => <PlayerItem item={item} key={item.steamid} />)}
      </List>
      {playerList.fetcher.inProgress ? <LoadingOverlay/> : null}
    </Box>
  )
});
