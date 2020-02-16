import Express, { Request, Response } from "express";
import Cors from "cors";
import BodyParser from "body-parser";
import { provide } from "~/lib/core";
import { Logger } from "~/services/Logger";
import { RouteContext } from "./Server/RouteContext";
import { BadRequest } from "./Server/BadRequest";

export {
  Request,
  Response,
  RouteContext
};

export class Server {
  @provide public logger: Logger;

  public static BadRequest = "Bad request";

  public express: Express.Express;
  public port: number;
  public hostname: string;

  constructor() {
    this.express = Express();
    this.express.use(Cors());
    this.express.use(BodyParser.json());
  }

  public configure({ port, hostname }: any) {
    this.port = port;
    this.hostname = hostname;
  }

  public run() {
    this.express.listen(this.port, this.hostname);
    this.logger.log(`Server listening on ${this.hostname}:${this.port}`);
  }

  public route(method: string, pattern: string, handler: (context: RouteContext) => Promise<any>) {
    this.logger.log("+", method, pattern);
    (this.express as any)[ method.toLowerCase() ](
      pattern,
      async (req: Request, res: Response) => {
        const log = this.logger.time(req.method, decodeURI(req.url));
        const context = new RouteContext(req);
        try {
          const ret = await context.zone(handler);
          if (typeof ret === "number") {
            res.status(ret).end();
          } else {
            res.json(ret);
          }
          log("OK");
        } catch (e) {
          if (e === BadRequest) {
            const errors = context.getQueryParamErrors();
            log("BAD", errors);
            res.status(400).json({ errors });
          } else {
            log("ERR", e);
            res.status(500).send((e || {}).stack || String(e));
          }
        }
      }
    );
  }

}
