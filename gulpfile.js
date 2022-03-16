const {src,dest,watch,parallel,task} = require('gulp')
const sass = require('gulp-sass')(require('sass')); // 使用sass
const gls = require('gulp-live-server') // 创建服务
const uglify = require('gulp-uglify'); // 压缩js
const cleanCSS = require('gulp-clean-css'); // 压缩css
const htmlmin = require('gulp-htmlmin');
const rename = require("gulp-rename");
const stylus = require('gulp-stylus');
// const livereload = require('gulp-livereload');
const connect = require("gulp-connect");


const htmlmin_options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
};
// 处理html：压缩、输出
function html(){
    return src('src/*.html').pipe(htmlmin(htmlmin_options)).pipe(dest('dist')).pipe(connect.reload());
}

// 处理pages中的html：压缩、输出
function pagesHtml(){
    return src('src/pages/*.html').pipe(htmlmin(htmlmin_options)).pipe(dest('dist/pages')).pipe(connect.reload());
}
// 处理css库：压缩，输出
function cssInit(){
    return src('src/css/*.css').pipe(cleanCSS({compatibility: 'ie8'})).pipe(dest('dist/css')).pipe(connect.reload());
}
// 处理样式：编译sass，压缩，输出
function css(){
    return src('src/styles/*.scss').pipe(sass()).pipe(cleanCSS({compatibility: 'ie8'})).pipe(rename("style.min.css")).pipe(dest('dist/css')).pipe(connect.reload());
}
// 处理样式：编译stylus，压缩，输出
function stylusCss(){
    return src('src/styles/*.styl').pipe(stylus()).pipe(cleanCSS({compatibility: 'ie8'})).pipe(dest('dist/css')).pipe(connect.reload());
}
// pipe(rename("index.css"))
// 处理js库，不需压缩直接输出
function jsLibInit(){
    return src('src/js/lib/*.js').pipe(dest('dist/js/lib')).pipe(connect.reload());
}
// 处理js库，不需压缩直接输出
function jsLibInit(){
    return src('src/js/lib/*.js').pipe(dest('dist/js/lib')).pipe(connect.reload());
}
// 处理static文件夹，不需压缩直接输出
function staticInit(){
    return src('src/static/**/*.*').pipe(dest('dist/static')).pipe(connect.reload());
}

// 处理js：抛去库，压缩，输出
function js(){
    return src(['src/js/**/*.js','!src/js/lib/**']).pipe(uglify()).pipe(dest('dist/js')).pipe(connect.reload());
}
// 处理图片：输出
function img(){
    return src('src/images/**').pipe(dest('dist/images')).pipe(connect.reload());
}
// 启动server····
function server(cb){
    connect.server({
        root: "dist",
        port: 80,
        livereload: true
    })
    console.log('http://localhost')
    console.log('http://127.0.0.1:80')
    cb()
}

// 启动server····
// function server(cb){
//     const server = gls.static('dist',80)
//     server.start()
//     cb()
// }

//启动临时服务器
// gulp.task("server", function(){
//     connect.server({
//         root: "dist",
//         port: 8887,
//         livereload: true
//     })
// })

// 监听变化
function watchChange(cb){
    watch('src/*.html', html)
    watch('src/styles/*.scss', css)
    watch('src/styles/*.styl', stylusCss)
    watch(['src/js/**/*.js','!src/js/lib/**'],js)
    watch('src/images/**',img)
    watch('src/static/**',img)
    watch('src/pages/*.html',pagesHtml)
    
    cb()
}


// exports.server = parallel(html,cssInit,css,img,jsLibInit,js,server,watchChange)
exports.html = html; // Public tasks, 执行gulp html
exports.css= css; 
exports.stylusCss= stylusCss; 
exports.default = parallel(html,pagesHtml,cssInit,css,stylusCss,img,jsLibInit,staticInit,js,server,watchChange)
// 'default'.default