# csv.js主要功能
- csv对象用一个二维数组存储数据
- 输入csv、json（二维数组）、HTML表格数据
- 输出csv、json文件

### 起手
```javascript
//创建csv对象
var csv=new Csv();
```
### 添加数据 ###
```javascript
///添加值
//将value添加至最后一行末尾
csv.add(value)
//将value添加至第y+1行末尾
csv.add(value,y)

///添加多个值（数组形式）
//将array添加为最后一行
addRow(array)

///添加HTML表格
//添加一个表格（传入table元素或者css选择器）
addHTMLTable('.table.hover')
//同时设置td与th的处理方式（参数代表td或th，返回要添加的数据，默认为innerText）
addHTMLTable('.table.hover',function(td){return td.innerText.trim();})

///添加其他csv对象
csv.addCsv(csv1)

///添加二维数组
csv.addArray(arrays)

///添加csv代码（参数为代码字符串）
csv.addCsvCode(csvCode)

///添加csv/json文件（参数为'csv'或'json'）
csv.addFile(fileType)

```
### 移除数据 ###
```javascript
//移除第y+1行第x+1个元素
remove(y,x)
//移除第y+1行
remove(y)
//清空所有
remove()
```
### 设置/更改数据 ###
```javascript
///设置值
//将第y+1行第x+1个元素的值设置为value
set(value,y,x)

///设置行
//将第y+1行设置为array
setRow(array,y)
```
### 获取数据 ###
```javascript
///获取某个值
//获取第y+1行，第x+1个元素的值
get(y,x)

///获取所有数据
csv.getAll()

///获取csv文件源码
csv.getSource()
```
### 输出文件 ###
```javascript
//输出文件（'csv'或'json'）
csv.outfile(encodeType)
//同时指定文件名
csv.outfile('csv','csvTest.csv')
```
