import { resolve } from "~/lib/core";
import { PlayerList } from "~/server/services/PlayerList";

export default (_req: any, res: any) => {
  res.json(
    resolve(PlayerList).getList()
  );
};
