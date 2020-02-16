import qs from "querystring";
import chalk from "chalk";
import { fetch, provide, delay } from "~/lib/core";
import { cache, Hour } from "~/lib/cache";
import { Logger } from "~/services/Logger";

const MultiplayerTag = "multiplayer";

export class SteamSpyApi {
  @provide logger: Logger;

  private url = "http://steamspy.com/api.php";

  private cacheGamesByTag = cache.hour(2);

  private logCall(...values: any[]) {
    return this.logger.time(chalk`{cyan [steamspy]}`, ...values);
  }

  public async autoWarmCache() {
    for (;;) {
      this.cacheGamesByTag.reset(MultiplayerTag);
      try {
        await this.getMultiplayerGames();
      } catch(e) {
        this.logger.log("SteamSpyApi cache warm error", e);
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
      return await response.json();
    });
    logFinish();
    return data;
  }

  public async getMultiplayerGames() {
    return await this.getGamesByTag(MultiplayerTag);
  }
}
