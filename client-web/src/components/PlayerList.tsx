import { memo } from "react";
import { useProvide } from "~/lib/core";
import { PlayerList as PlayerListService } from "~/services/PlayerList";
import { PlayerItem } from "./PlayerItem";
import { ToggleAllButton } from "./ToggleAllButton";

export const PlayerList = memo(() => {
  const playerList = useProvide(PlayerListService);
  if (playerList.isEmpty()) {
    return null;
  }

  return (
    <section className="main">
      <ToggleAllButton />
      {playerList.fetcher.inProgress ? <b><i>Loading</i></b> : null}
      <ul className="todo-list">
        {playerList.getList().map((item) => <PlayerItem item={item} key={item.steamid} />)}
      </ul>
    </section>
  )
});
