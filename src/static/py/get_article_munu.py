import os
import json
import re

def get_details(content):
    details = ''
    more_line = re.findall(r'.*<!--[ ]{0,5}more[ ]{0,5}-->.*',content)
    if more_line:
        more_line = more_line[0]
        more_line_index = content.split('\n').index(more_line)
        print(more_line)
        print(more_line_index)
        details = '\n'.join(content.split('\n')[:more_line_index])
    return details

    

def main(outDir= './src', previewDir = './src/preview',json_data = './src/data'):
    mdFiles = [f for boot,dirs,files in os.walk(previewDir) for f in files if f.endswith('.html')]
    # for mdFile in mdFiles:
    #     with open(previewDir+'\\'+mdFile,'r' ,encoding='utf-8') as f:
    #         content = f.read()
    #     details = get_details(content)
    #     print(details)
    mdFiles = json.dumps({'actitle_munu':mdFiles},ensure_ascii=False)
    with open('%s/article_munu.json'%json_data,'w',encoding='utf-8') as f:
        f.write(mdFiles)
if __name__ == "__main__":
    main()