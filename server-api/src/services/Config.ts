import config from "~/configs/config.json";

export class Config {
  public get db() {
    return config.db;
  }
  public get server() {
    return config.server;
  }
  public get steam() {
    return config.steam;
  }
}
