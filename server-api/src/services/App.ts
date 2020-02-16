import { provide } from "~/lib/core";
import { Logger } from "~/services/Logger";
import { Db } from "~/services/Db";
import { Server } from "~/services/Server";
import { IntersectionRouter } from "~/routers/IntersectionRouter";
import { Config } from "./Config";
import { PlayerRouter } from "~/routers/PlayerRouter";

export class App {
  @provide public config: Config;
  @provide public logger: Logger;
  @provide public db: Db;
  @provide public server: Server;
  @provide public intersectionRouter: IntersectionRouter;
  @provide public playerRouter: PlayerRouter;

  public async start() {
    try {
      this.configure();
      await this.init();
      this.run();
    } catch (error) {
      this.logger.log(error);
    }
  }

  private configure() {
    this.db.configure(this.config.db);
    this.server.configure(this.config.server);
  }

  private async init() {
    await this.db.init();
    this.intersectionRouter.init();
    this.playerRouter.init();
  }

  private run() {
    this.server.run();
  }
}
