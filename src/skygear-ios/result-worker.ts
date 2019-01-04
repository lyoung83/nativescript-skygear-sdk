onmessage = msg => {
    if (msg.data == "close"){
        close();
        return;
    }

    var result = msg.data.result;
    var error = msg.data.error;

   if (error) {
       console.log(error);
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