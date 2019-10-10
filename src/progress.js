
export default function progress(totalLength, reader, renderLogInfo) {
  let bytes = 0;
  let currPer = 0;
  return new Promise((resolve, reject) => {
    const process = () => {
        reader.read().then(({ done, value }) => {
        if (done) {
          resolve();
        }
        bytes += value.length;
        currPer = (bytes / totalLength * 100).toFixed(1);
        renderLogInfo(`current progress is ${currPer}%, total is ${totalLength}.`);
        process();
      }).catch(e => {
        reject(e);
      });
    };
    process();
  });
}