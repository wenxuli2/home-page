import shutil
import sys
import os
previewDir = '%s/src/preview'%os.getcwd()
json_data = '%s/src/data'%os.getcwd()
if os.path.exists(previewDir):
    shutil.rmtree(previewDir)
else:
    os.makedirs(previewDir)