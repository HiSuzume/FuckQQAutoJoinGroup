const {
    segment, cqcode, createClient
} = require('icqq')

//Author:铃芽

const log = console.log

//配置账号密码

if (process.argv[2] == null && process.argv[3] == null) {
    console.error('Usage: node q.js your_qq_number your_qq_password')
    return
}

var not_allow_auto_join_group = true

const client = createClient({
    platform: 3
})

const qqint = parseInt(process.argv[2])

const password = process.argv[3]

log("发送 开启/关闭自动退群 来控制脚本。")

//他人、自己入群事件

/*client.on("message", e => {
    if (e.sender.user_id == e.sender.self_id) {
        switch (e.toString()) {
            case "开启自动退群":
                not_allow_auto_join_group = false
                e.reply("已开启自动退群，正常建群以及自主入群将被禁止。", true)
                break
            case "关闭自动退群":
                not_allow_auto_join_group = false
                e.reply("已关闭自动退群，正常建群以及自主入群将被允许，安全风险高。", true)
                break
        }
    }
})*/

client.on("notice.group.increase", e => {
    if (e.user_id == e.self_id && not_allow_auto_join_group) {
        log("将准备退出群聊： " + e.group_id)
        client.pickGroup(e.group_id)
            .quit()
    }
})

//系统区域

client.on('system.login.slider', (e) => {
    console.log('输入滑块地址获取的ticket后继续。\n滑块地址 => ' + e.url)
    process.stdin.once('data', (data) => {
        client.submitSlider(data.toString()
            .trim())
    })
})

client.on('system.login.qrcode', (e) => {
    console.log('扫码完成后回车继续:    ')
    process.stdin.once('data', () => {
        client.login()
    })
})

client.on('system.login.device', (e) => {
    console.log('请选择验证方式:(1：短信验证， 其他：扫码验证)')
    process.stdin.once('data', (data) => {
        if (data.toString()
            .trim() === '1') {
            client.sendSmsCode()
            console.log('请输入手机收到的短信验证码:')
            process.stdin.once('data', (res) => {
                client.submitSmsCode(res.toString()
                    .trim())
            })
        } else {
            console.log('扫码完成后回车继续：' + e.url)
            process.stdin.once('data', () => {
                client.login()
            })
        }
    })
})

client.login(qqint, password)