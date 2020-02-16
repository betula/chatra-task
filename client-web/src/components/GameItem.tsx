import { memo } from "react";
import { GameItem as GameItemType } from "~/services/GameList";

export const GameItem = memo(({ item }: { item: GameItemType }) => (
  <li>
    <div>
      <label>{item.name}</label>
    </div>
  </li>
))
