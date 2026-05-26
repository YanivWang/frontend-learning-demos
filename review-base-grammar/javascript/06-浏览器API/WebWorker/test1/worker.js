importScripts("childWorker.js");

console.log("worker 线程被创建...");

//webWork有自己的全局对象，不是主线程的window，而是一个专门为worker
//定义的群居对象
//self 代表子线程本身，也就是子线程的全局独享，全局作用域
self.addEventListener('message', function (e) {

    //子线程中引入其他脚本
    sayHello();

    let sum = 0;
    for(let i = 0 ; i < 100000000000; i++){
        sum = sum + i;
    }
    console.log("work sum: " + sum);

    self.postMessage("you said: " + sum);

    let cmd = e.data;
    switch (cmd) {
        case "1":
            self.postMessage("worker start!");
            break;
        case "2":
            self.postMessage("worker stop!");
            //线程内部关闭自身
            self.close();
            break;
        default:
            self.postMessage("unknow cmd!");
            break;
    }
}, false);