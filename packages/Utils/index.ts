let methods = {
    getUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0
            const v = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
    },
    dateFormat(date: any, fmt = 'YYYY-MM-DD hh:mm:ss') {
        if (!date) {
            date = new Date()
        }

        if (typeof date == 'string') {
            date = new Date(date)
        }

        let ret
        const opt: { [x: string]: string } = {
            'Y+': date.getFullYear().toString(), // 年
            'M+': (date.getMonth() + 1).toString(), // 月
            'D+': date.getDate().toString(), // 日
            'h+': date.getHours().toString(), // 时
            'm+': date.getMinutes().toString(), // 分
            's+': date.getSeconds().toString() // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        }
        for (let k in opt) {
            ret = new RegExp('(' + k + ')').exec(fmt)
            if (ret) {
                fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
            }
        }
        return fmt
    }
}

export default methods