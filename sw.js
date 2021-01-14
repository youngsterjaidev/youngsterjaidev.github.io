let version = 1

let onInstall = async () => {
    await self.skipWaiting()
    console.log(`ServiceWorker version(${version}) in Installed`)
}

let onActivate = async () => {
    await self.clients.claim()
    console.log(`ServiceWorker version(${version}) in activated`)
}

let onMessage = ({ data }) => {
    console.log("StatusUpdate - ", data)
}

self.addEventListener('install', onInstall)
self.addEventListener('activate', onActivate)
self.addEventListener("message", onMessage)