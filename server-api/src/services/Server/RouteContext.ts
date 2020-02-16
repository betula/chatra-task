import { Request } from "../Server";
import { Param } from "./Param";
import { ParamError } from "./ParamError";
import { BadRequest } from "./BadRequest";

export class RouteContext {
  private query: any;
  private queryParams = new Map<string, Param>();

  constructor(request: Request) {
    this.query = request.query || {};
  }

  public getQueryParam(name: string): Param {
    const { query } = this;
    const params = this.queryParams;

    if (!params.has(name)) {
      params.set(name, new Param(query[name]));
    }
    return ((params.get(name) as any) as Param);
  }

  public getQueryParamErrors() {
    const errors = {} as any;
    for (const [name, validator] of this.queryParams) {
      if (validator.errors.length > 0) {
        errors[name] = validator.errors.slice();
      }
    }
    return errors;
  }

  public async zone(zone: (context: RouteContext) => any) {
    try {
      return await zone(this);
    } catch(e) {
      if (e === ParamError) {
        throw BadRequest;
      } else {
        throw e;
      }
    }
  }
}
