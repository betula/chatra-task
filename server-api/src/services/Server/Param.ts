import { ParamError } from "./ParamError";

export class Param {
  public value: any;
  public errors = [] as string[];

  constructor(value: any) {
    this.value = value;
  }

  public error(name: string) {
    this.errors.push(name);
    throw ParamError;
  }

  public json() {
    if (typeof this.value !== "undefined") {
      try {
        this.value = JSON.parse(this.value);
      } catch(e) {
        this.error("json");
      }
    }
    return this;
  }

  public required() {
    if (typeof this.value === "undefined") {
      this.error("required");
    }
    return this;
  }

  public array(minlen?: number) {
    if (!Array.isArray(this.value)) {
      this.error("array");
    }
    if (typeof minlen !== "undefined" && this.value.length < minlen) {
      this.error("array.minlen");
    }
    return this;
  }

  public string(minlen?: number) {
    if (typeof this.value !== "string") {
      this.error("string");
    }
    if (typeof minlen !== "undefined" && this.value.length < minlen) {
      this.error("string.minlen");
    }
    return this;
  }

  public format(regexp: RegExp, transform?: (match: RegExpExecArray) => any) {
    const single = (value: any) => {
      const match = regexp.exec(value);
      if (!match) {
        this.error("format");
      }
      return (typeof transform !== "undefined")
        ? transform((match as any) as RegExpExecArray)
        : value;
    }

    if (Array.isArray(this.value)) {
      this.value = this.value.map(single);
    } else {
      this.value = single(this.value);
    }
    return this;
  }
}
