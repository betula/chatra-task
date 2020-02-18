import { memo } from "react";
import { useProvide } from "~/lib/core";
import { GameList as GameListService } from "~/services/GameList";
import { GameItem } from "./GameItem";
import { ToggleAllButton } from "./ToggleAllButton";

export const GameList = memo(() => {
  const gameList = useProvide(GameListService);
  if (gameList.isEmpty()) {
    return null;
  }

  return (
    <section>
      <ToggleAllButton />
      {gameList.fetcher.inProgress ? <i>Loading</i> : null}
      <ul>
        {gameList.getList().map((item) => <GameItem item={item} key={item.appid} />)}
      </ul>
    </section>
  )
});
