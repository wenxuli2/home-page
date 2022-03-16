window.onload = function () {
    const linkLogs = document.querySelector('.link_logs');
    const cli = document.createElement('li')
    const plusIcon = document.querySelector('.plus-icon-container-li')
    const linkForm = document.querySelector("#linkForm")
    const JSaddLinkFormClose = document.querySelector('#JSaddLinkFormClose')
    const JSsubmit = document.querySelector("#JSsubmit")
    const JScontainer = document.querySelector("#JScontainer")
    const JSlinkLogs = document.querySelector("#JSlinkLogs")
    const JSplusIcon = document.querySelector(".plus-icon-container-li")
    const JSlinkLogClose = document.querySelector(".close")
    const JSlinkLogCloses = document.querySelectorAll(".close")
    const selectDiv = document.querySelector('.selectDiv');
    const dashDiv = document.querySelector('.dashDiv');
    const dashDivSelectd = document.querySelector('.dashDivSelectd');
    const JSsetting = document.querySelector('#JSsetting')

    init()
    // 设置-自定义布局
    JSsetting.onclick = function () {
        selectDiv.parentNode.parentNode.style.visibility = "visible"
    }
    selectDiv.parentNode.parentNode.addEventListener('mouseleave', e => {
        selectDiv.parentNode.parentNode.style.visibility = "hidden"
    })
    selectDiv.addEventListener('click', e => {
        let displaySelect = JSON.parse(localStorage.getItem('displaySelect'))
        displaySelect === 'none' ? localStorage.setItem('displaySelect', JSON.stringify("block")) : localStorage.setItem('displaySelect', JSON.stringify("none"))
        displaySelect = JSON.parse(localStorage.getItem('displaySelect'))
        
        document.querySelector(".plus-icon-container-li").style.display = displaySelect === "none" ? "none" : "inline-block"
        dashDiv.style.display = displaySelect === "none" ? "block" : "none"
        dashDivSelectd.style.display = displaySelect
        for (let i = 0; i < document.querySelectorAll(".close").length; i++) {
            const el = document.querySelectorAll(".close")[i];
            el.style.display = displaySelect
        }
    })
    plusIcon.addEventListener('click', async (e) => {
        console.log('0000')
        linkForm.style.display = 'block'
        const link_url = await navigator.clipboard.readText();
        if (link_url.indexOf('://') !== -1) {
            linkForm[0].value = link_url
            linkForm[1].value = `${linkForm[0].value}/favicon.ico`
            linkForm[2].value = getLinkName(linkForm[0].value)
        }
    })
    linkForm[0].addEventListener('keydown', e => {
        linkForm[1].value = `${linkForm[0].value}/favicon.ico`
        linkForm[2].value = getLinkName(linkForm[0].value)
    })
    // 关闭表单
    JSaddLinkFormClose.addEventListener('click', function () {
        linkForm.style.display = 'none'
    })
    //提交后关闭表单
    JSsubmit.onclick = function () {
        let image_url = linkForm[1].value
        checkImageUrl(image_url).then(() => {
            console.log('有效链接')
            linkForm.style.display = 'none'
        }).catch(() => {
            console.log('无效链接')
            alert('图片url链接无效')
        })
        let FormData = [
            {
                'url': '',
                'image_url': '',
            }
        ]
        console.log(localStorage.getItem('FormData') !== null)
        if (localStorage.getItem('FormData') !== null) {
            FormData = JSON.parse(localStorage.getItem('FormData'))
        }
        console.log(image_url)
        FormData.push({ 'url': linkForm[0].value, 'image_url': linkForm[1].value , 'linkName': linkForm[2].value })
        // FormData去重、去空
        const clearDuplicate = (arr, key) => arr.filter((ele, index, a) => a.map(e => e[key]).indexOf(ele[key]) === index && ele[key])
        FormData = FormData.filter(e => e.url.indexOf('://') !== -1)
        FormData = clearDuplicate(FormData, 'url')
        appendContainerLis(FormData)
        localStorage.removeItem('FormData')
        localStorage.setItem('FormData', JSON.stringify(FormData))
    }
    JSlinkLogs.addEventListener('click', e => {
        if (e.target.className === "close") {
            let index = e.target.getAttribute("index")
            e.target.parentNode.parentNode.removeChild(e.target.parentNode)
            let FormData = JSON.parse(localStorage.getItem('FormData'))
            FormData.splice(index, 1)
            console.log(FormData)
            localStorage.removeItem('FormData')
            localStorage.setItem('FormData', JSON.stringify(FormData))
            e.preventDefault()
        } 
    })
    // 初始化
    function init() {
        //读取本地data，将数据写入localStorage
        // localStorage.clear()
        let FormData = JSON.parse(localStorage.getItem('FormData'))
        if (FormData === null) {
            ajax('static/data/FormData.json', function (str) {
                const oJson = (new Function(`return (${str})`))();
                localStorage.setItem('FormData', JSON.stringify(oJson['data']))
            })
        }
        //addLink
        FormData = JSON.parse(localStorage.getItem('FormData'))
        appendContainerLis(FormData)
    }
    function appendContainerLis(FormData) {
        let displaySelect = JSON.parse(localStorage.getItem('displaySelect'))
        // 清除除了加号外的所有子节点
        for (let i = 0; i <= JSlinkLogs.childNodes.length; i++) {

            if (JSlinkLogs.childNodes[i] && JSlinkLogs.childNodes[i].className !== "plus-icon-container-li") {
                JSlinkLogs.removeChild(JSlinkLogs.childNodes[i])
            }
        }
        FormData = FormData.map(e => {
            e.image_url === "" ? e.image_url = `${e.url}/favicon.ico` : ''
            return e
        })
        for (let i = 0; i < FormData.length; i++) {
            const { url, image_url, linkName } = FormData[i];
            let cli = document.createElement('li')
            cli.innerHTML = `<a title = ${linkName} href = ${url} class = 'link-url' ><img src="${image_url}" )><i class = "close" index= ${i}></i></a>`
            if (JSplusIcon) { JSlinkLogs.insertBefore(cli, JSplusIcon) }
        }
    }
    //阻止form页面跳转
    function onSubmit() {
        return false
    }
    // 检测图片url是否有效
    function checkImageUrl(image_url) {
        return new Promise(function (resolve, reject) {
            const ImgObj = new Image();
            ImgObj.src = image_url;
            ImgObj.onload = function (res) {
                resolve(res);
            }
            ImgObj.onerror = function (err) {
                reject(err)
            }
        })
    }
    // 截取url中域名域名的主体，并且首字母大写
    function getLinkName(url) {
        try {
            let linkName = url.split('//')[1].split('.')[0]
            console.log()
            linkName = linkName[0].toUpperCase() + linkName.slice(1, 100)
            return linkName
        } catch (error) {
            return ''
        }
    }
}