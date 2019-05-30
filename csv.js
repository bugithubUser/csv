function Csv()
{
	var csvTable=[];
	var tempCsvInput=document.createElement('input');
	tempCsvInput.style.display='none';
	tempCsvInput.type='file';

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
	this.addHTMLTable=function(tableTrait,getValueFun=function(T){return T.innerText})
	{
		var targetTable=typeof(tableTrait)=='string'?document.querySelector(tableTrait):tableTrait;
		var currentCsv=this;
		var trs=targetTable.getElementsByTagName('tr');
		[].forEach.call(trs,function(trE,trI,trA)
		{
			var tempArray=[];
			[].forEach.call(trE.children,function(tdE,tdI,tdA)
			{
				tempArray.push(getValueFun(tdE));
			});
			currentCsv.addRow(tempArray);
		});
	}
	//添加csv文件
	this.addCsvFile=function()
	{
		var csvContent='';
		var readCsvFun=(function *(thisCsvObject)
		{
			tempCsvInput.onchange=function()
			{
				if(tempCsvInput.value!='')
				{
					var readCsv=new FileReader();
					readCsv.onload=function(event)
					{
						csvContent=event.target.result;
						readCsvFun.next();
					};
					readCsv.readAsText(tempCsvInput.files[0]);
				}
				tempCsvInput.remove();
			};
			document.body.append(tempCsvInput);
			tempCsvInput.click();
			yield;
			thisCsvObject.addCsvCode(csvContent,thisCsvObject);
		})(this);

		readCsvFun.next();
	}
	//解析并添加csv代码
	this.addCsvCode=function(csvCode,thisCsvObject)
	{
		var grids=csvCode.match(/(?<=^|,)(([^\n,"]*)|("([^"]*("")*)*"))(?=$|,)\n?/gm);
		var tempArray=[];
		grids.forEach(function(V,I,A)
		{
			if(V.charAt(V.length-1)=='\n') V=V.slice(0,-1);
			if(V.charAt(0)=='"') V=V.slice(1,-1).replace(/(""){1}?/g,'"');
			tempArray.push(V);
			if(grids[I].charAt(grids[I].length-1)=='\n'||I==A.length-1)
			{
				thisCsvObject.addRow(tempArray);
				tempArray=[];
			}
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
	this.getContent=function()
	{
		var context='';
		tempCsvInput.remove();
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
			context=context.replace(/,(?=$)/,"\n");
		}
		return context;
	}
	// 导出文件
	this.outfile=function(fileName='csv.csv',csvArray=[this])
	{
		var content='';
		csvArray.forEach(function(E,I,A)
		{
			content+=E.getContent();
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
		return /[\n,"]+?/.test(text)?'"'+(text+'').replace(/"/g,'""')+'"':text;
	}
}
