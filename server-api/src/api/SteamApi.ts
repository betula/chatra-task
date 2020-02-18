/* eslint-disable @typescript-eslint/camelcase */
import qs from "querystring";
import chalk from "chalk";
import { provide, fetch } from "~/lib/core";
import { cache } from "~/lib/cache";
import { Config } from "~/services/Config";
import { Logger } from "~/services/Logger";

export class SteamApi {
  @provide config: Config;
  @provide logger: Logger;

  private key: string;
  private url = "http://api.steampowered.com";

  private cacheVanityUrl = cache.hour().nonclone();
  private cacheOwnedGames = cache.minute(5).nonclone();

  constructor() {
    this.key = this.config.steam.key;
  }

  private logCall(...values: any[]) {
    return this.logger.time(chalk.yellow("[steam]"), ...values);
  }

  public async getSteamIdByVanityUrl(vanityurl: string) {
    const query = qs.stringify({
      vanityurl,
      key: this.key,
      format: "json"
    });
    const cmd = "/ISteamUser/ResolveVanityURL/v0001/";
    const logFinish = this.logCall(cmd, vanityurl);
    const data = await this.cacheVanityUrl(vanityurl, async () => {
      const response = await fetch(`${this.url}${cmd}?${query}`);
      return (await response.json()).response;
    });
    logFinish();
    return {
      ok: data.success === 1,
      message: data.message,
      steamid: data.steamid
    }
  }

  public async getOwnedGames(steamid: string, options?: any) {
    const query = qs.stringify({
      ...(options?.info ? { include_appinfo: true } : {}),
      steamid,
      include_played_free_games: true,
      key: this.key,
      format: "json"
    });
    const cmd = "/IPlayerService/GetOwnedGames/v0001/";
    const logFinish = this.logCall(cmd, steamid, (options?.info ? "with-info" : "no-info"));
    const data = await this.cacheOwnedGames(steamid, !!options?.info, async () => {
      const response = await fetch(`${this.url}${cmd}?${query}`);
      const data = (await response.json()).response;

      let games = data.games || [];
      if (options?.info) {
        games = games.map((item: any) => ({
          appid: item.appid,
          name: item.name,
          icon: item.img_icon_url
        }));
      }

      return {
        games
      }
    });
    logFinish();
    return {
      games: data.games
    }
  }
}
