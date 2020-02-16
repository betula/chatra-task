import { memo } from "react";
import { useProvide } from "~/lib/core";
import { GameList as GameListService } from "~/services/GameList";
import { GameItem } from "./GameItem";
import { ToggleAllButton } from "./ToggleAllButton";

export const GameList = memo(() => {
  const list = useProvide(GameListService);
  if (list.isEmpty()) {
    return null;
  }

  return (
    <section>
      <ToggleAllButton />
      <ul>
        {list.getList().map((item) => <GameItem item={item} key={item.appid} />)}
      </ul>
    </section>
  )
});
