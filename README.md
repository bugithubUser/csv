# csv

### 添加 ###
```javascript
//将value添加至最后一行末尾
add(value)

//将value添加至第y+1行末尾
add(value,y)

//将array添加为最后一行
addRow(array)
```
### 移除 ###
```javascript
//移除第y+1行第x+1个元素
remove(y,x)

//移除第y+1行
remove(y)

//清空所有
remove()
```
### 设置 ###
```javascript
//将第y+1行第x+1个元素的值设置为value
set(value,y,x)

//将第y+1行设置为array
setRow(array,y)
```
### 输出 ###
```javascript
//输出csv文件源码
getContext()

//生成名为filename（包含拓展名）的csv文件并下载
outfile(filename)
```
