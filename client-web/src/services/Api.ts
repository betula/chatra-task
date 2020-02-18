import { provide } from "~/lib/core";
import { fetch } from "~/lib/fetch";
import { Config } from "./Config";

export class Api {
  @provide private config: Config;

  async callGet(cmd: string, query?: any) {
    const response = await fetch(this.config.baseUrl + "/api/" + cmd + "?q=" + JSON.stringify(query || ""));
    return await response.json();
  }

  async callPost(cmd: string, data?: any, query?: any) {
    const response = await fetch(this.config.baseUrl + "/api/" + cmd + "?q=" + JSON.stringify(query || ""), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async getGamesBySteamIds(steamids: string[]): Promise<any[]> {
    if (steamids.length === 0) {
      return [];
    }
    return await this.callGet("get-games", steamids);
  }

  async getPlayers() {
    return await this.callGet("get-players");
  }

  async addPlayer(url: string) {
    return await this.callPost("add-player", url);
  }

  async setPlayerEnabled(steamid: string, enabled: boolean) {
    return await this.callPost("set-player-enabled", enabled, steamid);
  }

  async removePlayer(steamid: string) {
    return await this.callPost("remove-player", null, steamid);
  }

}
