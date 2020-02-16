import { memo } from "react";
import { useProvide } from "~/lib/core";
import { PlayerList } from "~/services/PlayerList";

export const ToggleAllButton = memo(() => {
  const list = useProvide(PlayerList);

  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={!list.hasDisabled()}
        onChange={() => list.toggleAll()}
      />
      <label htmlFor="toggle-all">Toggle all</label>
    </>
  )
});
