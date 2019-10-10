export default function myFetch(url, init) {
  let abortFunc = null;
  let abortDefer = new Promise((resolve, reject) => {
    abortFunc = () => {
      reject('abort');
    }
  });
  const pro = Promise.race([
    fetch(url, init),
    abortDefer
  ]);
  pro.abort = abortFunc;
  return pro;
}