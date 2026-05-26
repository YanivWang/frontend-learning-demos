(function (window) {
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    let Recorder = function (stream, config) {
        //创建一个音频环境对象
        let audioContext = window.AudioContext || window.webkitAudioContext;
        let context = new audioContext();

        config = config || {};
        config.channelCount = 1;
        config.numberOfInputChannels = config.channelCount;
        config.numberOfOutputChannels = config.channelCount;
        config.sampleBits = config.sampleBits || 16;      //采样数位 8, 16
        //config.sampleRate = config.sampleRate || (context.sampleRate / 6);   //采样率(1/6 44100)
        config.sampleRate = config.sampleRate || 8000;   //采样率16K
        //创建缓存，用来缓存声音
        config.bufferSize = 4096;

        //将声音输入这个对像
        let audioInput = context.createMediaStreamSource(stream);

        //设置音量节点
        let volume = context.createGain();
        audioInput.connect(volume);

        // 创建声音的缓存节点，createScriptProcessor方法的
        // 第二个和第三个参数指的是输入和输出都是声道数。
        let recorder = context.createScriptProcessor(config.bufferSize, config.channelCount, config.channelCount);

        //用来储存读出的麦克风数据，和压缩这些数据，将这些数据转换为WAV文件的格式
        let audioData = {
            size: 0,                              //录音文件长度
            buffer: [],                           //录音缓存
            inputSampleRate: context.sampleRate,  //输入采样率
            inputSampleBits: 16,                  //输入采样数位 8, 16
            outputSampleRate: config.sampleRate,  //输出采样率
            oututSampleBits: config.sampleBits,   //输出采样数位 8, 16
            input: function (data) {
                this.buffer.push(new Float32Array(data));  //Float32Array
                this.size += data.length;
            }
            , getRawData: function () { //合并压缩
                //合并
                let data = new Float32Array(this.size);
                let offset = 0;
                for (let i = 0; i < this.buffer.length; i++) {
                    data.set(this.buffer[i], offset);
                    offset += this.buffer[i].length;
                }
                //压缩
                let getRawDataion = parseInt(this.inputSampleRate / this.outputSampleRate);
                let length = data.length / getRawDataion;
                let result = new Float32Array(length);
                let index = 0, j = 0;
                while (index < length) {
                    result[index] = data[j];
                    j += getRawDataion;
                    index++;
                }
                return result;
            }
            , getFullWavData: function () {
                let sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
                let sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
                let bytes = this.getRawData();
                let dataLength = bytes.length * (sampleBits / 8);
                let buffer = new ArrayBuffer(44 + dataLength);
                let data = new DataView(buffer);
                let offset = 0;
                let writeString = function (str) {
                    for (let i = 0; i < str.length; i++) {
                        data.setUint8(offset + i, str.charCodeAt(i));
                    }
                };
                // 资源交换文件标识符
                writeString('RIFF');
                offset += 4;
                // 下个地址开始到文件尾总字节数,即文件大小-8
                data.setUint32(offset, 36 + dataLength, true);
                offset += 4;
                // WAV文件标志
                writeString('WAVE');
                offset += 4;
                // 波形格式标志
                writeString('fmt ');
                offset += 4;
                // 过滤字节,一般为 0x10 = 16
                data.setUint32(offset, 16, true);
                offset += 4;
                // 格式类别 (PCM形式采样数据)
                data.setUint16(offset, 1, true);
                offset += 2;
                // 通道数
                data.setUint16(offset, config.channelCount, true);
                offset += 2;
                // 采样率,每秒样本数,表示每个通道的播放速度
                data.setUint32(offset, sampleRate, true);
                offset += 4;
                // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8
                data.setUint32(offset, config.channelCount * sampleRate * (sampleBits / 8), true);
                offset += 4;
                // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8
                data.setUint16(offset, config.channelCount * (sampleBits / 8), true);
                offset += 2;
                // 每样本数据位数
                data.setUint16(offset, sampleBits, true);
                offset += 2;
                // 数据标识符
                writeString('data');
                offset += 4;
                // 采样数据总数,即数据总大小-44
                data.setUint32(offset, dataLength, true);
                offset += 4;
                // 写入采样数据
                data = this.reshapeWavData(sampleBits, offset, bytes, data);
//                let wavd = new Int8Array(data.buffer.byteLength);
//                let pos = 0;
//                for (let i = 0; i < data.buffer.byteLength; i++, pos++) {
//                    wavd[i] = data.getInt8(pos);
//                }
//                return wavd;

                return new Blob([data], {type: 'audio/wav'});
            },
            closeContext: function () {
                context.close();   //关闭AudioContext否则录音多次会报错。
            },
            getPureWavData: function (offset) {
                let sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
                let bytes = this.getRawData();
                let dataLength = bytes.length * (sampleBits / 8);
                let buffer = new ArrayBuffer(dataLength);
                let data = new DataView(buffer);
                data = this.reshapeWavData(sampleBits, offset, bytes, data);
//                let wavd = new Int8Array(data.buffer.byteLength);
//                let pos = 0;
//                for (let i = 0; i < data.buffer.byteLength; i++, pos++) {
//                    wavd[i] = data.getInt8(pos);
//                }
//                return wavd;

                return new Blob([data], {type: 'audio/wav'});
            },
            reshapeWavData: function (sampleBits, offset, iBytes, oData) {
                if (sampleBits === 8) {
                    for (let i = 0; i < iBytes.length; i++, offset++) {
                        let s = Math.max(-1, Math.min(1, iBytes[i]));
                        let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
                        val = parseInt(255 / (65535 / (val + 32768)));
                        oData.setInt8(offset, val, true);
                    }
                } else {
                    for (let i = 0; i < iBytes.length; i++, offset += 2) {
                        let s = Math.max(-1, Math.min(1, iBytes[i]));
                        oData.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                    }
                }
                return oData;
            }
        };

        //start record
        this.start = function () {
            audioInput.connect(recorder);
            recorder.connect(context.destination);
        };

        //stop record
        this.stop = function (callback) {
            recorder.disconnect();
            if (callback) {
                callback(this.getTempFilePath());
            }
        };

        this.stopAndSave = function (callback) {
            recorder.disconnect();
            this.getSavedFilePath(callback);
        };

        this.getTempFilePath = function () {
            return window.URL.createObjectURL(this.getBlob());
        };

        this.getSavedFilePath = function (callback) {
            let that = this;
            let blobData = this.getBlob();
            let reader = new FileReader();
            reader.readAsDataURL(blobData);
            reader.addEventListener("loadend", function () {
                let savedFilePath = that.getFileName();
                localStorage.setItem(savedFilePath, reader.result);
                if (callback) {
                    callback(savedFilePath);
                }
            });
        };

        this.getSavedFileTempFilePath = function (savedFilePath) {
            return localStorage.getItem(savedFilePath);
        };

        this.getFileName = function () {
            let date = new Date();
            let year = date.getFullYear().toString();
            let month = (date.getMonth() + 1).toString();
            if (month.length < 2) {
                month = "0" + month;
            }
            let day = date.getDate().toString();
            let seconds = date.getMilliseconds();
            let random = Math.random().toFixed(4);
            return "filePath:" + year + month + day + seconds + random;
        };

        //get wav file
        this.getBlob = function () {
            return audioData.getFullWavData();
        };

        this.close = function () {
            audioData.closeContext();
        };

        //上传
        this.upload = function (url, pdata, callback) {
            let fd = new FormData();
            fd.append('file', this.getBlob());
            let xhr = new XMLHttpRequest();
            for (let e in pdata)
                fd.append(e, pdata[e]);
            if (callback) {
                xhr.upload.addEventListener('progress', function (e) {
                    callback('uploading', e);
                }, false);
                xhr.addEventListener('load', function (e) {
                    callback('ok', e);
                }, false);
                xhr.addEventListener('error', function (e) {
                    callback('error', e);
                }, false);
                xhr.addEventListener('abort', function (e) {
                    callback('cancel', e);
                }, false);
            }
            xhr.open('POST', url);
            xhr.send(fd);
        };

        this.trans = function (url, callback) {
            let fd = new FormData();
            let buffer = audioData.getPureWavData(0);
            fd.set('wavData', buffer);
            fd.set('wavSize', buffer.size);
            console.log("wavSize: " + buffer.size);
            document.getElementById('btn-text-content').value = "当前录音长度为：" + buffer.size;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, false); //async=false,采用同步方式处理
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) { //响应数据接收完毕
                    callback(xhr.responseText, xhr.status);
                }
            };
            xhr.send(fd);
        };

        //音频采集
        recorder.onaudioprocess = function (e) {
            audioData.input(e.inputBuffer.getChannelData(0));
        };
    };
    Recorder.ErrorConst = {
        NotAllowedError: "NotAllowedError",
        PermissionDeniedError: "PermissionDeniedError",
        NotFoundError: "NotFoundError",
        OtherError: "OtherError"
    };
    Recorder.canRecording = (navigator.getUserMedia != null);
    Recorder.getRecorderManager = function (callback, config) {
        if (callback) {
            if (navigator.getUserMedia) {
                navigator.getUserMedia(
                    {audio: true}, //只启用音频  A
                    function (stream) {  //stream这个参数是麦克风的输入流，将这个流传递给Recorder
                        let rec = new Recorder(stream, config);
                        callback(rec);
                    },
                    function (error) {
                        let errorName;
                        if (error.name) {
                            errorName = error.name.toLowerCase();
                        }
                        switch (errorName) {
                            case 'NotAllowedError':
                            case 'PermissionDeniedError':
                                callback(this.ErrorConst.NotAllowedError);
                                break;
                            case 'NotFoundError':
                                callback(this.ErrorConst.NotFoundError);
                                break;
                            default:
                                callback(this.ErrorConst.OtherError);
                                break;
                        }
                    });
            } else {
                callback();
            }
        }
    };
    window.Recorder = Recorder;
})(window);