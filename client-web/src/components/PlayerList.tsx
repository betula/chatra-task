import { memo } from "react";
import { useProvide } from "~/lib/core";
import { PlayerList as PlayerListService } from "~/services/PlayerList";
import { PlayerItem } from "./PlayerItem";
import { ToggleAllButton } from "./ToggleAllButton";

export const PlayerList = memo(() => {
  const list = useProvide(PlayerListService);
  if (list.isEmpty()) {
    return null;
  }

  return (
    <section className="main">
      <ToggleAllButton />
      <ul className="todo-list">
        {list.getList().map((item) => <PlayerItem item={item} key={item.steamid} />)}
      </ul>
    </section>
  )
});
