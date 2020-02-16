/* eslint-disable @typescript-eslint/camelcase */
import qs from "querystring";
import chalk from "chalk";
import { provide, fetch } from "~/lib/core";
import { Config } from "~/services/Config";
import { Logger } from "~/services/Logger";

export class SteamApi {
  @provide config: Config;
  @provide logger: Logger;

  private key: string;
  private url = "http://api.steampowered.com";

  constructor() {
    this.key = this.config.steam.key;
  }

  private logCall(...values: any[]) {
    return this.logger.time(chalk`{yellow [steam]}`, ...values);
  }

  public async getSteamIdByVanityUrl(vanityurl: string) {
    const query = qs.stringify({
      vanityurl,
      key: this.key,
      format: "json"
    });
    const cmd = "/ISteamUser/ResolveVanityURL/v0001/";
    const logFinish = this.logCall(cmd, vanityurl);
    const response = await fetch(`${this.url}${cmd}?${query}`);
    const data = (await response.json()).response;
    logFinish();
    return {
      ok: data.success === 1,
      message: data.message,
      steamid: data.steamid
    }
  }

  public async getOwnedGames(steamid: string) {
    const query = qs.stringify({
      steamid,
      include_played_free_games: true,
      include_appinfo: true,
      key: this.key,
      format: "json"
    });
    const cmd = "/IPlayerService/GetOwnedGames/v0001/";
    const logFinish = this.logCall(cmd, steamid);
    const response = await fetch(`${this.url}${cmd}?${query}`);
    const data = (await response.json()).response;
    logFinish();
    return {
      count: data.game_count,
      games: data.games
    }
  }

  public async getOwnedGamesByVanityUrl(vanityurl: string) {
    const dataSteamid = await this.getSteamIdByVanityUrl(vanityurl);
    if (!dataSteamid.ok) {
      return {
        ok: false,
        message: dataSteamid.message
      }
    }
    const dataGames = await this.getOwnedGames(dataSteamid.steamid);
    return {
      ok: true,
      steamid: dataSteamid.steamid,
      ...dataGames
    }
  }

}
