console.log('hello from the renderer process');

declare let api: any;

const coreCount = document.getElementById('cores');

coreCount!.innerText = `Core Count ${api.threads}`;
