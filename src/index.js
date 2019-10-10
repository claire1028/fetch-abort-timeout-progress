import myFetch from './abort';
import timeout from './timeout';
import progress from './progress';

const abort = document.getElementById('abort');
const progressEle = document.getElementById('progress');
const timeoutEle = document.getElementById('timeout');

// --------- abort example ----------
let p = myFetch('/abort');
p.then(res => {
  return res.text();
}).then(res => {
  abort.innerHTML = 'result: ' + res;
})
.catch(e => {
  abort.innerHTML = 'error: ' + e;
});
p.abort();

// ---------- progress example ----------
let pro = fetch('/progress');
const renderLogInfo = (log) => {
  progressEle.innerHTML += log + '<br/>';
};
pro.then(res => {
  return progress(res.headers.get('Content-Length'), res.body.getReader(), renderLogInfo);
}).then(res => {
  progressEle.innerHTML += 'recived ends !!';
}).catch(e => {
  progressEle.innerHTML += 'progress err' + e;
});

// ---------- timeout example -----------
let t = timeout(fetch('/timeout'), 1000);
t.then(res => {
  timeoutEle.innerHTML = 'time res: ' + res.status;
}).catch(e => {
  timeoutEle.innerHTML = 'time err: ' + e;
})