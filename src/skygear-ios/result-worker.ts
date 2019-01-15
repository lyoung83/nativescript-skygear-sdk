onmessage = msg => {
    if (msg.data == "close"){
        close(0);
        return;
    }

    var result = msg.data.result;
    var error = msg.data.error;

   if (error) {
        // ignoring postMessage in TS compiler because it's choosing the wrong signature.
        //@ts-ignore
       postMessage({res: "fail", result: error})
       return;
   }
    //@ts-ignore
    postMessage({res: result ? "success" : "fail",  result})
}

onerror = e => {
    console.log("error in worker:", e)
    return true;
}