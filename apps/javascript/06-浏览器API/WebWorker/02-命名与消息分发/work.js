// 分类: javascript / 06-浏览器API / WebWorker / 02-命名与消息分发
// 主题: 子线程：按 task 字段分发到不同处理函数
// 要点:
//   - state 字段标识进度（0 = 开始，1 = 结束），便于主线程做 UI 反馈
//   - 通过返回结构化消息让主线程做状态机驱动
//   - 多次 postMessage 不会复用同一对象，每次都是独立的结构化克隆

self.onmessage = function (e) {
    let msg = e.data;
    let task = msg.task;
    let data = msg.data;

    switch (task) {
        case "A":
            carryOutTaskA(data);
            break;
        case "B":
            carryOutTaskB(data);
            break;
        case "C":
            carryOutTaskC(data);
            break;
        default:
            self.postMessage({task: task || "unknown", data: null, state: -1, error: "unknown task"});
            break;
    }
};

function carryOutTaskA(data) {
    data = normalizeCount(data);
    self.postMessage({task: "A", data: data, state: 0});

    let sum = 1;
    for (let i = 0; i < data; i++) {
        sum = sum + i;
    }
    setTimeout(function () {
        self.postMessage({task: "A", data: sum, state: 1});
    }, 5000)
}

function carryOutTaskB(data) {
    data = normalizeCount(data);
    self.postMessage({task: "B", data: data, state: 0});

    let sum = 1;
    for (let i = 0; i < data; i++) {
        sum = sum + i;
    }
    self.postMessage({task: "B", data: sum, state: 1});
}

function carryOutTaskC(data) {

}

function normalizeCount(data) {
    let count = Number.parseInt(data, 10);
    if (!Number.isFinite(count) || count < 0) {
        return 0;
    }
    return Math.min(count, 50000000);
}