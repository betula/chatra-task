import config from "~/configs/config.json";

export class Config {
  public get apiUrl() {
    return config.apiUrl;
  }
}
