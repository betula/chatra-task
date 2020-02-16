import chalk from "chalk";
import { timeTracker } from "~/lib/timeTracker";

export class Logger {
  public log(...values: any[]) {
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(time, ...values);
  }

  public time(...prefix: any[]) {
    const finish = timeTracker.start();
    return (...suffix: any[]) => {
      const time = finish();
      this.log(...prefix, chalk`{white ${time} ms}`, ...suffix);
    }
  }
}
