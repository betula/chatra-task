import { resolve } from "~/lib/core";
import { Api } from "~/server/services/Api";
import { PlayerList } from "~/server/services/PlayerList";

export default async (req: any, res: any) => {
  const url = req.body;

  const data = await resolve(Api).getPlayerSteamIdByUrl(url);
  const player = {
    steamid: (data as any).steamid,
    url,
    enabled: true
  };
  resolve(PlayerList).addPlayer(player);

  res.json(player);
};
