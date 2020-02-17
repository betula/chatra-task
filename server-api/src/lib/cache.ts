import clone from "clone-deep";

export const Second = 1000;
export const Minute = 60 * Second;
export const Hour = 60 * Minute;

const DefaultCacheKey = Symbol();

function keyFromKeys(keys: any[]): any {
  return keys.map(key => `${key}`).join(":");
}

function create(lifetime: number) {
  let createdAt: any = {};
  let cache: any = {};
  let nonclone = false;

  function fn(fn: () => any): any;
  function fn(...keysAndFnAtLast: any[]): any;
  function fn(...keysAndFnAtLast: any[]) {
    const fn = keysAndFnAtLast.slice(-1)[0];
    const key = keyFromKeys(keysAndFnAtLast.slice(0, -1)) || DefaultCacheKey;
    const now = Date.now();
    if (typeof createdAt[key] === "undefined" || now > createdAt[key] + lifetime) {
      cache[key] = fn();
      createdAt[key] = now;
    }
    const value = cache[key];
    if (nonclone) {
      return value;
    }
    return (value?.then)
      ? value.then((data: any) => clone(data))
      : clone(value);
  }

  fn.reset = (...keys: any[]) => {
    if (keys.length === 0) {
      createdAt = {};
      cache = {};
    } else {
      const key = keyFromKeys(keys) || DefaultCacheKey;
      delete createdAt[key];
      delete cache[key];
    }
  };

  fn.nonclone = () => {
    nonclone = true;
    return fn;
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
