console.log("Worker is Started Running !")

self.addEventListener("message", evt=>{
    self.postMessage({
        message: "Hi client !"
    })
    console.log('Worker Data : ', evt.data)
}
)
