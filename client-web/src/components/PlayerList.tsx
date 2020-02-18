import { memo } from "react";
import { useProvide } from "~/lib/core";
import { PlayerList as PlayerListService } from "~/services/PlayerList";
import { PlayerItem } from "./PlayerItem";
import { ToggleAllButton } from "./ToggleAllButton";
import { styled } from "~/lib/styled";

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
    <>
      <ToggleAllButton />
      {playerList.fetcher.inProgress ? <b><i>Loading</i></b> : null}
      <List>
        {playerList.getList().map((item) => <PlayerItem item={item} key={item.steamid} />)}
      </List>
    </>
  )
});
