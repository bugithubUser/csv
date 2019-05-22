function Csv()
{
	var csvTable=[];
	// 添加值
	this.add=function(value,y=csvTable.length-1<0?0:csvTable.length-1)
	{
		if(csvTable[y]===undefined) csvTable[y]=[];
		csvTable[y].push(value);
	}
	// 添加行
	this.addRow=function(array)
	{
		csvTable.push(array);
	}
	// 添加表格
	this.addHTMLTable=function(tableTrait,getValueFun=function(td){return td.innerText})
	{
		var targetTable=typeof(tableTrait)=='string'?document.querySelector(tableTrait):tableTrait;
		var currentCsv=this;
		var trs=targetTable.getElementsByTagName('tr');
		[].forEach.call(trs,function(trE,trI,trA)
		{
			console.log(trI)
			var tempArray=[];
			[].forEach.call(trE.children,function(tdE,tdI,tdA)
			{
				tempArray.push(getValueFun(tdE));
			});
			currentCsv.addRow(tempArray);
		});
	}
	// 移除
	this.remove=function(y,x)
	{
		if(y===undefined) csvTable=[];
		else if(x===undefined) csvTable.splice(y);
		else csvTable[y].splice(x);
	}
	// 设置值
	this.set=function(value,y,x)
	{
		if(csvTable[y]===undefined) csvTable[y]=[];
		csvTable[y][x]=value;
	}
	// 设置行
	this.setRow=function(array,y)
	{
		csvTable[y]=array;
	}
	// 获取某个格子的数据
	this.get=function(y,x)
	{
		return csvTable[y][x];
	}
	// 获取csv源码
	this.getContext=function()
	{
		var context='';
		for(var i=0;i<csvTable.length;i++)
		{
			if(csvTable[i]!==undefined)
			{
				for(var j=0;j<csvTable[i].length;j++)
				{
					if(typeof(csvTable[i][j])=="number"||typeof(csvTable[i][j])=="string") context+=csvEscape(csvTable[i][j])+',';
					else context+=',';
				}
			}
			context+="\n";
		}
		return context;
	}
	// 导出文件
	this.outfile=function(fileName='csv.csv',csvArray=[this])
	{
		var content='';
		csvArray.forEach(function(E,I,A)
		{
			content+=E.getContext();
		});
		var tempDownloadLink=document.createElement('a');
		tempDownloadLink.style.display='none';
		tempDownloadLink.download=fileName;
		tempDownloadLink.href='data:text/csv;charset=utf-8,\uFEFF'+content;
		document.body.append(tempDownloadLink);
		tempDownloadLink.click();
		tempDownloadLink.remove();
	}
	// 转义处理
	var csvEscape=function(text)
	{
		return '"'+(text+'').replace(/"/g,'""')+'"';
	}
}
