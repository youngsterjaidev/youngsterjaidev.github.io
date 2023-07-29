(()=>{
    console.log(":::::::::::::::")
    let isOnline = ('onLine'in navigator) ? navigator.onLine : true
    let worker = new Worker('worker.js')
    let swRegistration
    let svcWorker

    worker.postMessage({
        message: "Hi Worker"
    })

    worker.addEventListener("message", evt=>{
        console.log('client Data : ', evt.data)
    }
    )

    if (!isOnline) {
        console.log('You are Offline bitch !')
    }

    let initailizeSw = async()=>{
        try {
            swRegistration = await navigator.serviceWorker.register('sw.js')
            svcWorker = await swRegistration.installing || swRegistration.waiting || swRegistration.active
            sendSWMessage()
            await navigator.serviceWorker.addEventListener("controllerchange", evt=>{
                svcWorker = navigator.serviceWorker.controller
                sendSWMessage()
            }
            )
        } catch (e) {
            console.log('Error Occured', e)
        }
    }

    let sendSWMessage = () => {
        let msg = { statusUpdate: { isOnline } }
        svcWorker.postMessage(msg)
    }

    initailizeSw()
}
)()
 