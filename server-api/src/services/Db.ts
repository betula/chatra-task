import sqlite3 from "sqlite3";

export class Db {
  public filename: string;
  public db: any;

  public configure({ filename }: any) {
    this.filename = filename;
  }

  public async init() {
    this.db = await this.getConnectedDb();
  }

  private getConnectedDb() {
    return new Promise((ok, fail) => {
      const db = new (sqlite3.verbose()).Database(this.filename, (err) => {
        if (err) {
          fail(err);
        } else {
          ok(db);
        }
      });
    });
  }

  private callDbMethod(method: string, ...args: any[]) {
    return new Promise((ok, fail) => {
      this.db[method](...args, (err: any, data: any) => {
        if (err) {
          fail(err);
        } else {
          ok(data);
        }
      })
    });
  }

  public async run(sql: string, ...params: any[]) {
    return this.callDbMethod("run", sql, ...params);
  }
}
