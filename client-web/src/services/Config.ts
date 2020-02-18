import config from "~/configs/config.json";

export class Config {
  public get baseUrl() {
    return config.baseUrl;
  }
}
