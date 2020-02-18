import { resolve } from "~/lib/core";
import { Api } from "~/server/services/Api";
import { PlayerList } from "~/server/services/PlayerList";

export default async (req: any, res: any) => {
  const url = req.body;

  const data = await resolve(Api).getPlayerSteamIdByUrl(url);
  if (data?.errors?.url === "not found") {
    return res.json({ error: "not found" });
  }

  const playerList = resolve(PlayerList);
  if (playerList.hasPlayer(data.steamid)) {
    return res.json({ error: "duplicate" });
  }

  const player = {
    steamid: data.steamid,
    url,
    enabled: true
  };
  playerList.addPlayer(player);

  res.json(player);
};
