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
            break;
    }
};

function carryOutTaskA(data) {
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
    data = parseInt(data);
    self.postMessage({task: "B", data: data, state: 0});

    let sum = 1;
    for (let i = 0; i < data; i++) {
        sum = sum + i;
    }
    self.postMessage({task: "B", data: sum, state: 1});
}

function carryOutTaskC(data) {

}