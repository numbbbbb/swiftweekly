import fs from 'fs'

fs.readFile('source', (err, data) => {
  let content = data.toString().split('\n')
  let articles = []
  let apples = []
  let linuxs = []
  let number = process.argv[2]
  let name = `weekly${number}.html`
  var now = articles
  let abstract = content.shift()
  for (let i of content) {
    if (i == 'article') {
      now = articles
    } else if (i == 'apple') {
      now = apples
    } else if (i == 'linux') {
      now = linuxs
    } else {
      let temp = i.split('||')
      now.push(`<h4 style="margin:0;margin-bottom:6px;margin-top:6px;"><a target="_blank" style="font-size:14px;line-height:22px;font-weight:bold;text-decoration:none;color:#259;border:none;outline:none" href="${temp[1]}">${temp[0]}</a>&nbsp;&nbsp;</h4><p style="margin:0;font-size:13px;line-height:20px;padding-bottom:10px;${temp.length == 4 ? '' : 'border-bottom:1px dotted #eee'}">${temp[2]}</p>`)
    }
  }
  let result = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="zh-CN">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Swift 开发者周刊（第 ${number} 期）</title>
</head>

<body style="margin: 0 auto;">
    <img style="position:fixed;top:-9999px;" src="http://swiftweekly.cn/assets/img/logo.png"></img>
    <div style="background-color:#f5f5f5; padding: 20px 0;">
        <div style="color:#333;margin:0 auto;padding:24px;max-width:700px;font-family:'Helvetica Neue',Helvetica,Arial,Sans-serif;font-size:13px;line-height:1.7;background-color:#fff">
        
            <h1 style="margin:0 0 6px 0;font-size:25px;font-weight:bold;letter-spacing:-1px">Swift 开发者周刊（第 ${number} 期）</h1>

            <h2 style="margin:0 0 18px 0;color:#444;font-size:14px;font-weight:normal">
            <br />${abstract}
            <br />
            <br />
            <div style="padding-left: 10px; border-left: solid 2px #ccc;">
            目前周刊由<a style="color:#07c;text-decoration:none" href="http://swift.gg" target="_blank"> SwiftGG 翻译组 </a>维护，每周推送最新的 Swift 文章和开源项目，帮助大家提高 Swift 姿势水平。
            <br />请把<a style="color:#07c;text-decoration:none" href="http://swiftweekly.cn" target="_blank"> Swift 开发者周刊 </a>推荐给你的朋友，你的支持是我们最大的动力！
            </div>
            

</h2>
            <h3 style="margin:24px 0 12px 0;border-bottom:1px solid #e0e0e0;padding-bottom:6px; color:#555; font-size:16px;">优秀文章</h3>
            ${articles.join('\n')}
            <h3 style="margin:24px 0 12px 0;border-bottom:1px solid #e0e0e0;padding-bottom:6px; color:#555; font-size:16px;">iOS & Mac OS 开源项目</h3>
            ${apples.join('\n')}
            <h3 style="margin:24px 0 12px 0;border-bottom:1px solid #e0e0e0;padding-bottom:6px; color:#555; font-size:16px;">跨平台开源项目</h3>
            ${linuxs.join('\n')}
           
            <br />
            <br />
            <div style="padding-left: 10px; border-left: solid 2px #ccc;">
            目前周刊由<a style="color:#07c;text-decoration:none" href="http://swift.gg" target="_blank"> SwiftGG 翻译组 </a>维护，每周推送最新的 Swift 文章和开源项目，帮助大家提高 Swift 姿势水平。
            <br />请把<a style="color:#07c;text-decoration:none" href="http://swiftweekly.cn" target="_blank"> Swift 开发者周刊 </a>推荐给你的朋友，你的支持是我们最大的动力！
            </div>
            <p style="margin:0;color:#444;font-size:12px;line-height:20px;margin-bottom:18px;border-top:1px
                    solid
                    #e0e0e0;margin-top:36px;padding-top:12px">因为你曾经订阅了<a href="http://swiftweekly.cn" style="color:#07c;text-decoration:none" target="_blank"> Swift 开发者周刊 </a>， 所以你会收到这封邮件。
                <br/> 我们保证你的邮箱地址将只用于 Swift 开发者周刊，你也可以随时取消订阅。
                <br/> 我们尊重并保护你的隐私。
                <br/> 如果你不愿意继续接收 Swift 开发者周刊，请点击
                <a href="%%user_defined_unsubscribe_link%%" style="color:#07c;text-decoration:none" target="_blank"> 退订 </a>。
                <br/> 本邮件服务提供商：
                <a href="http://sendcloud.sohu.com" style="color:#07c;text-decoration:none" target="_blank">SendCloud</a>。
            </p>
        </div>
    </div>
</body>
</html>
  `
  fs.writeFile(name, result)
})