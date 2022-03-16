window.onload = function () {
    contentList = document.querySelector('.content-list')
    const searchInput = document.querySelector(".search_input_text")
    const suggestContainer = document.getElementsByClassName("suggest")[0];
    const searchResult = document.getElementById("search_result");

    ajax('../static/data/article_munu.json', function (str) {
        var oJson = (new Function('return (' + str + ')'))();
        // const oJson = (new Function('return ('+str +')'))();
        dJson = oJson['actitle_munu']
        const newArr = []
        const newtextArr = []
        const suggests = []
        //搜索
        // 清除建议框内容
        function clearContent() {
            var size = searchResult.childNodes.length;
            for (var i = size - 1; i >= 0; i--) {
                searchResult.removeChild(searchResult.childNodes[i]);
            }
        };
        // 注册输入框键盘抬起事件
        searchInput.onkeyup = function (e) {
            if (this.value.length === 0) {
                clearContent();
                return;
            } else {
                // const result = []
                const newArr = []
                const newtextArr = []
                const suggests = []

                for (let i = 0; i < dJson.length; i++) {
                    let title = dJson[i].split('.')[0];
                    let htmlobj = $.ajax({ url: `../static/preview/${dJson[i]}`, async: false });
                    let details = get_details(htmlobj)
                    if (details === undefined) { details = '' }
                    if (title.indexOf(this.value) !== -1) {
                        newArr.push(title)
                    } else {
                        let index = details.indexOf(this.value)
                        if (index !== -1) {
                            let suggest = details.slice(index, index + 20)
                            if (suggest.indexOf('<')) {
                                suggest = suggest.split('<')[0]
                            }
                            suggest = `${suggest}...---${title}`
                            newtextArr.push(dJson[i])
                            suggests.push(suggest)
                        }
                    }
                }

                let result = []
                result = [...newArr, ...suggests].slice(0, 5)
                // console.log(result)
                if (result) {
                    searchResult.style.display = 'block'
                } else {
                    searchResult.style.display = 'none'
                }
                clearContent()
                for (let i = 0; i < result.length; i++) {

                    var liObj = document.createElement("li");
                    if (result[i].indexOf('---') === -1) {
                        title = result[i]
                    } else {
                        title = result[i].split('---')[1]
                    }
                    let href = `article.html?title=${encodeURI(title)}`
                    liObj.innerHTML = `<a href= "${href}">${result[i]}</a>`
                    searchResult.appendChild(liObj);
                }
            }
        }
        for (let i = 0; i < dJson.length; i++) {
            let title = dJson[i].split('.')[0];
            let href = 'article.html?title=' + encodeURI(title)
            let htmlobj = $.ajax({ url: `../static/preview/${dJson[i]}`, async: false });
            details = get_details(htmlobj)
            if (details === undefined) { details = '' }
            let cli = document.createElement('li')
            cli.innerHTML = `<li>
                    <h3 class="title">${title}</h3>
                    <span class="details">${details}...
                        <a href="${href}">查看全文</a>
                    </span>
                 </li>`
            contentList.appendChild(cli)
        }
        function get_details(htmlobj) {
            let details = ''
            let more_line = htmlobj.responseText.match(/.*<!--[ ]{0,5}more[ ]{0,5}-->.*/g)
            if (more_line) {
                let more_line_index = htmlobj.responseText.split('\n').indexOf(more_line[0])
                details = htmlobj.responseText.split('\n').splice(0, more_line_index).join('').replace(/<\/?.+?>/g, '<br/>').replace(/<br\/><br\/>/g, '<br/>').replace(/<br\/><br\/>/g, '<br/>').replace(/^<br\/>/g, '')
                details = details.split('<br/>').slice(0, 5).join('<br/>')
                return details
            }
        }
    })
    console.log($(window).width())
    if ($(window).width() < 1000) {
        $('.content-list li:nth-child(2n+1)').css('margin-right', '100px')
        $('.content-list li:nth-child(n)').css('margin-bottom', '20px')
    } else {
        $('.content-list li:nth-child(2n+1)').css('margin-right', '20px')
        $('.content-list li:nth-child(2n)').css('margin-bottom', '20px')
    }
}

