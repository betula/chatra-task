import { resolve } from "~/lib/core";
import { PlayerList } from "~/server/services/PlayerList";

export default (req: any, res: any) => {
  const steamid = JSON.parse(req.query.q);
  const enabled = req.body;
  resolve(PlayerList).setPlayerEnabled(steamid, enabled);
  res.json({ steamid, enabled });
};
