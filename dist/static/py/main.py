from pygments.lexers import get_lexer_by_name
from pygments.formatters import html
from pygments import highlight
import mistune
import codecs
import shutil
import sys
import os




# 自定义库
import get_article_munu

class HighlightRenderer(mistune.Renderer):
    def block_code(self, code, lang):
        if not lang:
            return '\n<pre class="highlight"><code class="code">%s</code></pre>\n' % \
                mistune.escape(code)
        lexer = get_lexer_by_name(lang, stripall=True)
        formatter = html.HtmlFormatter()
        return highlight(code, lexer, formatter)
 
def md2html(s,pre=False,outDir=False):
    with codecs.open(s, mode='r', encoding='utf-8') as mdfile:
        md_text = mdfile.read()
        extras = ['code-friendly', 'fenced-code-blocks', 'footnotes']
        renderer = HighlightRenderer()
        markdown = mistune.Markdown(renderer=renderer)
        # [print(i) for i in dir(markdown)]
        # [print(i) for i in dir(markdown(md_text))]
        # print(markdown(md_text).title)
        # print(help(markdown.output_heading))
        # print(markdown.output_heading)

        html_text = markdown(md_text)
        # html_text = html_text.replace('highlight', 'cnblogs_code ')
        html_name = '%s.html' % (s[:-3])
        if outDir:
            html_name = '%s/%s.html' % (outDir,os.path.basename(s[:-3]))

        print( html_name)
        if pre:
            html_text = html_text +'\n' + pre
        
        with codecs.open(html_name, 'w', encoding='utf-8', errors='xmlcharrefreplace') as output_file:
            output_file.write(html_text)
 
 
def getAllFile(path, suffix='.'):
    "recursive is enable"
    f = os.walk(path)
    fpath = []
 
    for root, dir, fname in f:
        for name in fname:
            if name.endswith(suffix):
                fpath.append(os.path.join(root, name))
 
    return fpath
 
 
def convertAll(path,outDir=False):
    flist = getAllFile(path, ".md")
    for fname in flist:
        print(fname)
        md2html(fname,pre,outDir)
 

pre='''
<script>
function initCopyCode(){
const copyHtml=`<button class="btn-copy"data-clipboard-snippet="">copy</button>`;
$(".highlight .code").before(copyHtml);
var clipboard=new ClipboardJS('.btn-copy');
new ClipboardJS('.btn-copy',{
target:function(trigger){
console.log(trigger)
trigger.innerHTML=`ok`
setTimeout(()=>{
trigger.innerHTML=`copy`
},1000);
return trigger.nextElementSibling;
}
})
}
window.onload=initCopyCode();
</script>
'''
if __name__ == "__main__":
    path = r'H:\notes-md'
    outDir= '%s/src'%os.getcwd()
    previewDir = '%s/src/preview'%os.getcwd()
    json_data = '%s/src/data'%os.getcwd()

    if os.path.exists(previewDir):
        shutil.rmtree(previewDir)
        os.makedirs(previewDir)
    else:
        os.makedirs(previewDir)
    convertAll(path,previewDir)
    get_article_munu.main(outDir,previewDir,json_data)