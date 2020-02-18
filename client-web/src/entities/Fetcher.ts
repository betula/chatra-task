import { store } from "~/lib/core";

export enum FetcherStatus {
  Progress,
  Ok,
  Fail,
  Init
}

export type CallHandler = () => Promise<any>;
export type ResultHandler = (data: any) => any;
export type ShouldFetchHandlerStop = () => boolean;
export type ShouldFetchHandler = (stop?: ShouldFetchHandlerStop) => any;

export class Fetcher<Meta = {}> {
  @store status: FetcherStatus = FetcherStatus.Init;
  public meta = {} as Meta;

  private shouldFetchHandler?: ShouldFetchHandler;
  private callHandler?: CallHandler;
  private okHandler?: ResultHandler;
  private failHandler?: ResultHandler;
  private finishHandler?: ResultHandler;
  private result?: any;
  private thread?: any;

  public call(callHandler: CallHandler) {
    this.callHandler = callHandler;
    return this;
  }

  public ok(okHandler: ResultHandler) {
    this.okHandler = okHandler;
    return this;
  }

  public fail(failHandler: ResultHandler) {
    this.failHandler = failHandler;
    return this;
  }

  public finish(finishHandler: ResultHandler) {
    this.finishHandler = finishHandler;
    return this;
  }

  public shouldFetch(shouldFetchHandler: ShouldFetchHandler) {
    this.shouldFetchHandler = shouldFetchHandler;
    return this;
  }

  public inProgress() {
    return this.status === FetcherStatus.Progress;
  }

  private createThread() {
    let isCancelled = false;

    const handler: any = (async () => {
      this.status = FetcherStatus.Progress;
      try {
        const data = await (this.callHandler && this.callHandler());
        if (isCancelled) return;
        this.result = data
        this.status = FetcherStatus.Ok;
        this.okHandler && this.okHandler(data);
      }
      catch (error) {
        if (isCancelled) return;
        this.result = error
        this.status = FetcherStatus.Fail;
        if (this.failHandler) {
          this.failHandler(error);
        } else {
          console.error(error);
        }
      }
      this.finishHandler && this.finishHandler(this.result);
      return this.result;
    })();

    handler.cancel = () => {
      isCancelled = true;
    }
    return handler;
  }

  public fetch() {
    if (this.shouldFetchHandler) {
      let needStop = false;
      needStop = (this.shouldFetchHandler(() => needStop = true) === false) || needStop;
      if (needStop) {
        return this.result;
      }
    }

    if (this.thread) {
      this.thread.cancel();
    }
    return this.thread = this.createThread();
  }

  public exec() {
    this.fetch().catch((error: any) => {
      console.error(error);
    });
  }

}
