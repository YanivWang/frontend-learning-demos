//加上;的目的，是为了防止压缩，或者代码合并的时候出现错误
//自执行函数
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        //CommonJS
        module.exports = factory();
    } else {
        //windows
        root.Record = factory();
    }
})(this, function () {
    let Record = {};

    //插件一定需要提供默认配置
    let Settings = Record.settings = {
        min: 1,
        max: 100,
        speed: 5
    };

    //插件还必须提供用户可配置的参数
    Record.configure = function (options) {
        let key, value;
        for (key in options) {
            value = options[key];

            //value存在，且key是传入参数的特有属性
            if (value !== undefined && options.hasOwnProperty(key)) {
                //使用用户出入的参数，来覆盖默认的参数
                Settings[key] = value;
            }
        }
        console.log("插件configure：" + this);

        //js中函数内部this是动态绑定的，在程序运行的过程中，可能会不断的改变
        //但是一个原则就是，函数内部的this，始终指向调用它的作用域环境，也就是，说，
        //谁调用它，就指向谁
        return this;
    };

    Record.start = function () {
        console.log("record start...");

        console.log("插件start：" + this);

        return this;
    };

    Record.stop = function () {
        console.log("record stop...");

        console.log("插件stop：" + this);

        let maxValue = max(5, 7);
        console.log("maxValue: " + maxValue);

        return this;
    };

    //在插件方法定义完毕之后，可以在其后面，定义插件内部的方法，用于给插件方法提供功能
    //定义插件内部的私有方法
    function max(a, b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }

    //插件最后必须返回这个对象
    return Record;
});