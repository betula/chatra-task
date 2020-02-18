import { memo } from "react";
import { useProvide } from "~/lib/core";
import { styled } from "~/lib/styled";
import { GameList } from "~/services/GameList";

const Box = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 32px;
  position: relative;
  padding-right: 9px;
  background: rgba(55,55,61,0.7);
`

export const Total = memo(() => {
  const gameList = useProvide(GameList);

  return (
    <Box>
      {gameList.getTotal()}
    </Box>
  )
});
