import qs from "querystring";
import chalk from "chalk";
import { fetch, provide } from "~/lib/core";
import { Logger } from "~/services/Logger";

export class SteamSpyApi {
  @provide logger: Logger;

  private url = "http://steamspy.com/api.php";

  private logCall(...values: any[]) {
    return this.logger.time(chalk`{cyan [steamspy]}`, ...values);
  }

  public async getGamesByTag(tag: string) {
    const request = "tag";
    const query = qs.stringify({
      request,
      tag
    });
    const logFinish = this.logCall(request, tag);
    const response = await fetch(`${this.url}?${query}`);
    const data = await response.json();
    logFinish();
    return data;
  }

  public async getMultiplayerGames() {
    return await this.getGamesByTag("multiplayer");
  }
}
