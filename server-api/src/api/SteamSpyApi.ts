import qs from "querystring";
import chalk from "chalk";
import https from "https";
import { fetch, provide, delay } from "~/lib/core";
import { cache } from "~/lib/cache";
import { Hour, Second } from "~/lib/consts";
import { Logger } from "~/services/Logger";

const MultiplayerTag = "multiplayer";

export class SteamSpyApi {
  @provide logger: Logger;

  private url = "https://steamspy.com/api.php";
  private urlAgent = new https.Agent({ keepAlive: true });
  private urlTimeout = 10 * Second;

  private cacheGamesByTag = cache.hour(2).nonclone();

  private logPrefix = chalk.cyan("[steamspy]");

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
    try {
      const data = await this.cacheGamesByTag(tag, async () => {
        const response = await fetch(`${this.url}?${query}`, {
          timeout: this.urlTimeout,
          agent: this.urlAgent
        });
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
    } catch(e) {
      logFinish("ERR", e);
      return null;
    }
  }

  public async getMultiplayerGames() {
    return await this.getGamesByTag(MultiplayerTag);
  }
}
