/*
    說明: 驗證用library  
    用法: V$(1~n個驗證值).函式名1(條件1).函式名2(條件2).....result()
    回傳: boolean
*/

; (function (global, $) {

    let ValidatorTool = (...parameters) => new ValidatorTool.init(parameters); 

    /*******************
        驗證設定值開始
    *******************/

    /* checkIDNumber驗證身分證格式 設定可用格式 */
    const IDNumberFormat = {
        HK: /^[a-zA-Z]?[a-zA-Z]\d{6}$/, //香港
        CN: /^\d{18}$/,                 //中國
        MO: /^\d?\d{8}$/,               //澳門
        TW: /^[a-zA-Z]\d{9}$/           //台胞證
    }
    const supportedIDNumberFormat = Object.keys(IDNumberFormat);

    /* checkStrFormat驗證字串格式 設定可用格式 */
    const StrFormat = {
        En: /^[a-zA-Z]+$/,          //英文
        Num: /^\d+$/,               //數字
        EnNum: /^[0-9a-zA-Z]+$/,    //英數字組合,可純英文或純數字
        Float: /^[0-9]+[.]?[0-9]*$/ //浮點數格式
    }
    const supportedStrFormat = Object.keys(StrFormat);

    /* checkAccountFormat驗證帳號格式 預設長度格式 */
    const AccountFormat = (maxlength = 12, minlength = 6) => {
        let reStr = `^[a-zA-Z][a-zA-Z||0-9]{${minlength - 1},${maxlength - 1}}$`
        return new RegExp(reStr);
    }

    /* checkStrLength驗證字串長度 預設長度 */
    const StringLength = (maxlength = 12, minlength = 6) => {       
        return { maxlength, minlength }
    }

    /*******************
        驗證設定值結束
    *******************/

    ValidatorTool.prototype = {

        // 儲存結果
        setResult: function (result) {
            this.validResult = (this.validResult === false) ? false : result;   //若前一結果為flase，則維持false
        },

        // 回傳最後結果(boolean)
        result: function () { return this.validResult },

    /*******************
        驗證方法宣告開始
    *******************/

        // 用途: 驗證身分證格式
        // 用法: .checkIDNumber(國別)
        checkIDNumber: function (countryName) {
            if (supportedIDNumberFormat.indexOf(countryName) === -1) {
                console.log('不支援此身分證格式');
                this.setResult(false);
            }
            else {
                let reg = IDNumberFormat[countryName];
                this.setResult(this.p.every((item, index, array) => reg.test(item)))
            }
            return this;
        },   

        // 用途: 驗證非空值
        // 用法: .checkNotNull()
        checkNotNull: function () {
            this.setResult(this.p.every((item, index, array) => 
                 (item !== undefined) && (item !== "") && (item !== null)))
            return this;
        },

        // 用途: 驗證預設字串格式
        // 用法: .checkStrFormat(格式名)
        checkStrFormat: function (strFormatName) {
            if (supportedStrFormat.indexOf(strFormatName) === -1) {
                console.log('不支援此字串格式')
                this.setResult(false);
            } else {
                let reg = StrFormat[strFormatName];
                this.setResult(this.p.every((item, index, array) => reg.test(item)))
            }
            return this;
        },

        // 用途: 驗證自訂字串格式
        // 用法: .checkCustomFormat(自訂格式)
        checkCustomFormat: function (customStrFormat) {
            let reg = customStrFormat;
            this.setResult(this.p.every((item, index, array) => reg.test(item)))
            return this;
        },

        // 用途: 驗證帳號格式
        // 用法: 自訂長度 .checkAccountFormat(maxlength,minlength)
        //       預設長度 .checkAccountFormat()
        checkAccountFormat: function ( maxlength, minlength ) {
            let reg = AccountFormat(maxlength, minlength);
            this.setResult(this.p.every((item, index, array) => reg.test(item)))
            return this;
        },

        // 用途: 驗證字串長度
        // 用法: 自訂長度 .checkStrLength(maxlength,minlength)
        //       預設長度 .checkStrLength()
        checkStrLength: function (maxlength, minlength) {
            let length = StringLength(maxlength, minlength);
            this.setResult( this.p.every((item, index, array) =>
                item.length >= length.minlength && item.length <= length.maxlength))
            return this;
        },

    /*******************
        驗證方法宣告結束
    *******************/

    };

    /* 建構子 */
    ValidatorTool.init = function (parameters) {
        var self = this;
        self.p = parameters;
        // console.log(`self.parameters: ${self.parameters}`);
    }

    ValidatorTool.init.prototype = ValidatorTool.prototype; //縮寫用
    global.ValidatorTool = global.V$ = ValidatorTool;       //連結到全域物件

}(window, jQuery));

