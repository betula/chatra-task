import { provide } from "~/lib/core";
import { Logger } from "~/services/Logger";
import { Server } from "~/services/Server";
import { IntersectionRouter } from "~/routers/IntersectionRouter";
import { Config } from "./Config";
import { PlayerRouter } from "~/routers/PlayerRouter";
import { SteamSpyApi } from "~/api/SteamSpyApi";

export class App {
  @provide public config: Config;
  @provide public logger: Logger;
  @provide public server: Server;
  @provide public intersectionRouter: IntersectionRouter;
  @provide public playerRouter: PlayerRouter;
  @provide public steamSpyApi: SteamSpyApi;

  public start() {
    try {
      this.configure();
      this.init();
      this.run();
      this.post();
    } catch (error) {
      this.logger.log(error);
    }
  }

  private configure() {
    this.server.configure(this.config.server);
  }

  private init() {
    this.intersectionRouter.init();
    this.playerRouter.init();
  }

  private run() {
    this.server.run();
  }

  private post() {
    this.steamSpyApi.autoWarmCache();
  }
}
