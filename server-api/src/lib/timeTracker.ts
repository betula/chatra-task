const { hrtime } = process;
const NS_PER_SEC = 1e9;
const NS_PER_MS = 1e6;

function start() {
  const time = hrtime();
  return () => {
    const diff = hrtime(time);
    return Math.ceil(
      (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_MS
    );
  }
}

export const timeTracker = {
  start
};
