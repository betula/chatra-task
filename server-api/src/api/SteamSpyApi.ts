import qs from "querystring";
import chalk from "chalk";
import { fetch, provide, delay } from "~/lib/core";
import { cache, Hour } from "~/lib/cache";
import { Logger } from "~/services/Logger";

const MultiplayerTag = "multiplayer";

export class SteamSpyApi {
  @provide logger: Logger;

  private logPrefix = chalk`{cyan [steamspy]}`;
  private url = "http://steamspy.com/api.php";

  private cacheGamesByTag = cache.hour(2).nonclone();

  private logCall(...values: any[]) {
    return this.logger.time(this.logPrefix, ...values);
  }

  private log(...values: any[]) {
    this.logger.log(this.logPrefix, ...values);
  }

  public async autoWarmCache() {
    this.log("cache auto warm start");
    for (;;) {
      this.cacheGamesByTag.reset(MultiplayerTag);
      try {
        await this.getMultiplayerGames();
      } catch(e) {
        this.log("cache warm error", e);
      }
      await delay(Hour);
    }
  }

  public async getGamesByTag(tag: string) {
    const request = "tag";
    const query = qs.stringify({
      request,
      tag
    });
    const logFinish = this.logCall(request, tag);
    const data = await this.cacheGamesByTag(tag, async () => {
      const response = await fetch(`${this.url}?${query}`);
      const data = await response.json();

      const truncated = {} as any;
      const appids = Object.keys(data);
      if (appids.length === 0) {
        throw "Tag not found";
      }
      for (const appid of appids) {
        truncated[appid] = { appid: data.appid };
      }
      return truncated;
    });
    logFinish();
    return data;
  }

  public async getMultiplayerGames() {
    return await this.getGamesByTag(MultiplayerTag);
  }
}
