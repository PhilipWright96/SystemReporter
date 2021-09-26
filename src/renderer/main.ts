console.log('hello from the renderer process');

// api exposed in preload.ts, but redeclared here to make eslint happy
declare const api: any;

const coreCount = document.getElementById('cores');

coreCount!.innerText = `Core Count ${api.threads}`;
