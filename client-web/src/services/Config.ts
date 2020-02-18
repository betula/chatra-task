import config from "~/configs/config.json";

export class Config {
  public get baseUrl() {
    if ((process as any)?.browser) {
      const { location } = window;
      return location.protocol + "//" + location.host;
    }
    return config.baseUrl
  }
}
