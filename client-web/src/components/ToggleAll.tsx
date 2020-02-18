import { memo } from "react";
import { useProvide } from "~/lib/core";
import { styled } from "~/lib/styled";
import { PlayerList } from "~/services/PlayerList";
import { Checkbox } from "./atoms/Checkbox";

const Box = styled.li`
  display: flex;
  align-items: center;
  height: 32px;
  position: relative;
  padding-left: 7px;
  background: rgb(55,55,61);
`

export const ToggleAll = memo(() => {
  const playerList = useProvide(PlayerList);

  return (
    <Box>
      <Checkbox
        checked={!playerList.hasDisabled()}
        onChange={() => playerList.toggleAll()}
      />
    </Box>
  )
});
