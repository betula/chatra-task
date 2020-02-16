import clone from "clone-deep";

export const Second = 1000;
export const Minute = 60 * Second;
export const Hour = 60 * Minute;

const DefaultCacheKey = Symbol();

function create(lifetime: number) {
  const createdAt: any = {};
  const cache: any = {};
  function fn(fn: () => any): any;
  function fn(...keysAndFnAtLast: any[]): any;
  function fn(...keysAndFnAtLast: any[]) {
    const fn = keysAndFnAtLast.slice(-1)[0];
    const key = keysAndFnAtLast.slice(0, -1).map(key => `${key}`).join(":") || DefaultCacheKey;
    const now = Date.now();
    if (typeof createdAt[key] === "undefined" || now > createdAt[key] + lifetime) {
      cache[key] = (fn)();
      createdAt[key] = now;
    }
    const value = cache[key];
    return (value?.then)
      ? value.then((data: any) => clone(data))
      : clone(value);
  }
  return fn;
}

function hour(multiplier = 1) {
  return create(Hour * multiplier);
}

function minute(multiplier = 1) {
  return create(Minute * multiplier);
}

function second(multiplier = 1) {
  return create(Second * multiplier);
}

export const cache = {
  create,
  hour,
  minute,
  second
};
