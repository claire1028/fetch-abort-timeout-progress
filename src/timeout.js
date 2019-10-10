export default function timeout(fetchPromise, timeout) {
  let timeoutDefer = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('timeout');
      }, timeout);
  });

  const pro = Promise.race([
    fetchPromise,
    timeoutDefer
  ]);

  return pro;
}