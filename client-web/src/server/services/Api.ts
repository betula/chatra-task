import { provide } from "~/lib/core";
import { Config } from "./Config";

export class Api {
  @provide config: Config;

  public async getIntersectionMultiplayerGamesBySteamIds(steamids: string[]) {
    const query = JSON.stringify(steamids);
    const response = await fetch(this.config.apiUrl + "/intersection/multiplayer?steamids=" + query);
    const data = await response.json();
    return data.games;
  }

  public async getPlayerSteamIdByUrl(url: string) {
    const response = await fetch(this.config.apiUrl + "/player/steamid?url=" + url);
    return await response.json();
  }

}
