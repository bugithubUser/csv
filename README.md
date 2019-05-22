# csv

### 添加 ###
```javascript
//将value添加至最后一行末尾
add(value)
//将value添加至第y+1行末尾
add(value,y)

//将array添加为最后一行
addRow(array)

//添加一个表格（传入table元素或者css选择器）
addHTMLTable('.table.hover')
//同时设置td与th的处理方式（参数代表td或th，返回要添加的数据，默认为innerText）
addHTMLTable('.table.hover',function(td){return td.innerText.trim();})
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
### 获取 ###
```javascript
//获取第y+1行，第x+1个元素的值
get(y,x)

//获取csv文件源码
getContext()
```
### 输出文件 ###
```javascript
//生成名为csv.csv的文件并下载
outfile('csv.csv')
//输出多个csv拼合的文件
outfile('comboCsv.csv',[csv1,csv2,csv3])
```
