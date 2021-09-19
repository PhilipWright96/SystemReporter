console.log("hello from the renderer process");

const coreCount = document.getElementById("cores");

// @ts-expect-error
coreCount?.innerText = `Core Count ${api.threads}`;