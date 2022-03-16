

var suggestContainer = document.getElementsByClassName("suggest")[0];
var searchInput = document.getElementsByClassName("search_input_text")[0];
var search_box = document.getElementsByClassName("search_box")[0];
var searchResult = document.getElementById("search_result");
const searchLogs = document.querySelector(".search_logs")
const searchShowImages =document.querySelector(".search-engine-logo img")

var target_url = 'https://www.baidu.com/s?word='
searchLogs.addEventListener("click", function (e) {
  if (e.target.className === "search_log_google"){
    searchShowImages.src = './images/google-white.png'
    target_url = `https://www.google.com/search?q=`;
  } else if (e.target.className === "search_log_baidu"){
    searchShowImages.src = './images/baidu-white.png'
    target_url = `https://www.baidu.com/s?word=`
  } else if (e.target.className === "search_log_github"){
    searchShowImages.src = './images/github-white.png'
    target_url = `https://github.com/search?q=`
  } else if (e.target.className === "search_log_juejin"){
    // searchShowImages.src = './images/juejin-white.png'
    target_url = `https://juejin.cn/search?query=`
  } else if (e.target.className === "search_log_developer"){
    // searchShowImages.src = './images/developer-white.png'
    target_url = `https://developer.mozilla.org/zh-CN/search?q=`
  }
}, false);



// 清除建议框内容
function clearContent() {
  var size = searchResult.childNodes.length;
  for (var i = size - 1; i >= 0; i--) {
    searchResult.removeChild(searchResult.childNodes[i]);
  }
};

var timer = null;
// 注册输入框键盘抬起事件
searchInput.onkeyup = function (e) {
  suggestContainer.style.display = "block";
  // 如果输入框内容为空 清除内容且无需跨域请求
  if (this.value.length === 0) {
    clearContent();
    return;
  }
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (e.keyCode !== 40 && e.keyCode !== 38) {
    // 函数节流优化
    this.timer = setTimeout(() => {
      // 创建script标签JSONP跨域
      var script = document.createElement("script");
      script.src = "https://www.baidu.com/su?&wd=" + encodeURI(this.value.trim()) +
        "&p=3&cb=handleSuggestion";
      document.body.appendChild(script);
    }, 130)
  }

};

// 回调函数处理返回值
function handleSuggestion(res) {
  // 清空之前的数据！！
  clearContent();
  var result = res.s;
  // 截取前五个搜索建议项
  if (result.length > 4) {
    result = result.slice(0, 5)
  }
  for (let i = 0; i < result.length; i++) {
    // 动态创建li标签
    var liObj = document.createElement("li");
    liObj.innerHTML = result[i];
    searchResult.appendChild(liObj);
  }
  // 自执行匿名函数--删除用于跨域的script标签
  (function () {
    var s = document.querySelectorAll('script');
    for (var i = 1, len = s.length; i < len; i++) {
      document.body.removeChild(s[i]);
    }
  })()
}


function jumpPage(target_url) {
  window.open(`${target_url}${encodeURI(searchInput.value)}`);
  // window.open(`https://www.google.com/search?q=${encodeURI(searchInput.value)}`);
}

// 事件委托 点击li标签或者点击搜索按钮跳转到百度搜索页面
search_box.addEventListener("click", function (e) {
  if (e.target.nodeName.toLowerCase() === 'li') {
    var keywords = e.target.innerText;
    searchInput.value = keywords;
    jumpPage(target_url);
  } else if (e.target.id === 'btn') {
    jumpPage(target_url);
    
  } 
  // console.log(searchInput.value)  
  // console.log(e.path[1].className)
  if (searchInput.value && e.path[1].className ==="search_logs"){
    
    jumpPage(target_url);
  }
}, false);

// 双击直接跳转到目标网站
const oBtn = document.querySelector('.search_logs');
oBtn.ondblclick = function(e){
    console.log('双击');
    if (e.target.className === "search_log_google"){
      target_url = `https://www.google.com/`; 
    } else if (e.target.className === "search_log_baidu"){
      searchShowImages.src = './images/baidu-white.png'
      target_url = `https://www.baidu.com/`
    } else if (e.target.className === "search_log_github"){
      target_url = `https://github.com`
    } else if (e.target.className === "search_log_juejin"){
      target_url = `https://juejin.cn`
    } else if (e.target.className === "search_log_developer"){
      target_url = `https://developer.mozilla.org/zh-CN`
    }
    jumpPage(target_url);
}
var i = 0;
var flag = 1;

// 事件委托 监听键盘事件
search_box.addEventListener("keydown", function (e) {
  var size = searchResult.childNodes.length;
  if (e.keyCode === 13) {
    jumpPage(target_url);
  };
  // 键盘向下事件
  if (e.keyCode === 40) {
    if (flag === 0) {
      i = i + 2;
    }
    flag = 1;
    e.preventDefault();
    if (i >= size) {
      i = 0;
    }
    if (i < size) {
      searchInput.value = searchResult.childNodes[i++].innerText;
    }
  };
  // 键盘向上事件
  if (e.keyCode === 38) {
    if (flag === 1) {
      i = i - 2;
    }
    flag = 0;
    e.preventDefault();
    if (i < 0) {
      i = size - 1;
    }
    if (i > -1) {
      searchInput.value = searchResult.childNodes[i--].innerText;
    }
  };
}, false);
// 点击页面任何其他地方 搜索结果框消失





document.onclick = () => clearContent()
