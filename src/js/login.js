
const sigup = document.querySelector("#signup")
const login = document.querySelector("#login")
const middle = document.querySelector(".middle")
const JSlogin = document.querySelector("#JSlogin")
const Close = document.querySelector(".close")
const btnSubmit = document.querySelector('.btn-submit')
const JSmy = document.querySelector('#JSmy')
const mySettingContainer = document.querySelector('.my-setting-container')

JSlogin.onclick = function () {
    middle.style.display = "block"

}
Close.onclick = function () {
    middle.style.display = "none"
}
btnSubmit.onclick = function () {
    middle.style.display = "none"
    localStorage.setItem('login', JSON.stringify({ uname: '', password: '' }))
    JSlogin.style.display = "none"
}
sigup.onclick = function () {
    console.log('====')
    toggleClass(middle, "middle-flip");
}
login.onclick = function () {
    toggleClass(middle, "middle-flip");
}

JSmy.onclick = function () {
    mySettingContainer.style.display = "flex"
}
mySettingContainer.onclick = function () {
    localStorage.removeItem('login')
    JSmy.style.display = "none"
    mySettingContainer.style.display = "none"
    JSlogin.style.display = "block"
}
let loginData = JSON.parse(localStorage.getItem('login'))
// console.log(Boolean(loginData))
if (Boolean(loginData)) {
    JSmy.style.display = "block"
    JSlogin.style.display = "none"
} else {
    JSmy.style.display = "none"
    JSlogin.style.display = "block"
}




// // 点击sigup触发翻转样式
// $("#sigup").click(function () {
//     $(".middle").toggleClass("middle-flip");
// });
// // 点击login触发翻转样式
// $("#login").click(function () {
//     $(".middle").toggleClass("middle-flip");
// });
//判断样式是否存在
function hasClass(ele, cls) {
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}
//为指定的dom元素添加样式
function addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
}
//删除指定dom元素的样式
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, " ");
    }
}
//如果存在(不存在)，就删除(添加)一个样式
function toggleClass(ele, cls) {
    if (hasClass(ele, cls)) {
        removeClass(ele, cls);
    } else {
        addClass(ele, cls);
    }
}