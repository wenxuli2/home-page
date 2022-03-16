//在js中引入
$(document).ready(function () {
    const title = decodeURI(location.href.split('=')[1])
    const header_offsetTop = new Array()
    if (title) {
        const external_html = $('.article').load(`../static/preview/${title}.html`, function () {
            headers = $(":header")
            for (let i = 0; i < headers.length; i++) {
                const el = headers[i];
                header_offsetTop.push([el.innerHTML, el.offsetTop])
            }
            for (let i = 0; i < header_offsetTop.length; i++) {
                const [header, offsetTop] = header_offsetTop[i];
                if (header !== "目录") {
                    $('.article_munu').append($(`<li top = ${offsetTop} index = ${i}>${header}<li>`))
                }
            }
            $(".article_munu").click(function (e) {
                document.documentElement.scrollTop = e.target.getAttribute('top')
            });
        })
    }

    $(".arrow").click(function (e) {
        let deg = eval('get' + $(".arrow").css('transform'));
        if (deg === 135) {
            $(".arrow").css('transform', 'rotate(-45deg)')
                .css('margin-left', '-4px')
            // $('.article_munu').css('width','5px')
            $('.article_munu').css('display', 'none')
            $('.article').css('margin-left', '20px')
        } else {
            $(".arrow").css('transform', 'rotate(135deg)')
                .css('margin-left', '172px')
            // $('.article_munu').css('width','180px')
            $('.article_munu').css('display', 'block')
            $('.article').css('margin-left', '200px')
        }
    })
    $(".gap").mousemove(function (event) {
        $('.article_munu').css('width', `${parseInt(event.pageX / 5) * 5}px`)
        // $('.gap').css('width',`${event.pageX}px`)
        // $(".gap").text();
    });
    /* 
    * 解析matrix矩阵，0°-360°，返回旋转角度 
    * 当a=b||-a=b,0<=deg<=180 
    * 当-a+b=180,180<=deg<=270 
    * 当a+b=180,270<=deg<=360 
    * 
    * 当0<=deg<=180,deg=d; 
    * 当180<deg<=270,deg=180+c; 
    * 当270<deg<=360,deg=360-(c||d); 
    * */
    function getmatrix(a, b, c, d, e, f) {
        var aa = Math.round(180 * Math.asin(a) / Math.PI);
        var bb = Math.round(180 * Math.acos(b) / Math.PI);
        var cc = Math.round(180 * Math.asin(c) / Math.PI);
        var dd = Math.round(180 * Math.acos(d) / Math.PI);
        var deg = 0;
        if (aa == bb || -aa == bb) {
            deg = dd;
        } else if (-aa + bb == 180) {
            deg = 180 + cc;
        } else if (aa + bb == 180) {
            deg = 360 - cc || 360 - dd;
        }
        return deg >= 360 ? 0 : deg;
    }
});