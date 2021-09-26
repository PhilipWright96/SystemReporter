console.log("hello from the renderer process");

declare var api: any

const coreCount = document.getElementById("cores");

coreCount!.innerText = `Core Count ${api.threads}`;
