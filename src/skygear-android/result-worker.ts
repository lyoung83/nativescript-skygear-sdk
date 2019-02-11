onmessage = (msg) => {
    if (msg.data === "close") {
        close();
        return;
    }

    const result = msg.data.result;
    const error = msg.data.error;

    if (error) {
        // @ts-ignore
        postMessage({res: "fail", result: error});
        return;
    }

    // @ts-ignore
    postMessage({ res: result ? "success" : "fail", result });
};

onerror = e => {
    console.log("error in worker:", e);
    return true;
};
