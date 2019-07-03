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
	// 添加Csv对象
	this.addCsv=function(csvObject)
	{
		csvObject.getAll().forEach(function(E,I,A)
		{
			csvTable.addRow(E);
		});
	}
	// 添加二维数组
	this.addArray=function(arrays)
	{
		arrays.forEach(function(E,I,A)
		{
			this.addRow(E);
		},this);
	}
	// 添加csv/json文件
	this.addFile=function(fileType=undefined)
	{
		var sourceCode='';
		var readCsvFun=(function *(thisCsvObject)
		{
			tempCsvInput.onchange=function()
			{
				if(tempCsvInput.value!='')
				{
					var readCsv=new FileReader();
					readCsv.onload=function(event)
					{
						sourceCode=event.target.result;
						readCsvFun.next();
					};
					readCsv.readAsText(tempCsvInput.files[0]);
				}
				tempCsvInput.remove();
			};
			document.body.append(tempCsvInput);
			tempCsvInput.click();
			yield;
			if(fileType===undefined) fileType=tempCsvInput.value.match(/(?<=\.)[^.]*$/)[0].toLowerCase();
			if(fileType=='csv') thisCsvObject.addCsvCode.call(thisCsvObject,sourceCode);
			else if(fileType=='json') thisCsvObject.addArray(JSON.parse(sourceCode));
			else throw Error('输入文件类型错误，应选择csv或json文件');
		})(this);

		readCsvFun.next();
	}
	// 解析并添加csv代码
	this.addCsvCode=function(csvCode)
	{
		var grids=csvCode.match(/(?<=^|,)(([^\n,"]*)|("([^"]*("")*)*"))(?=$|,)\n?/gm);
		var tempArray=[];
		var thisCsvObject=this;
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
	// 获取所有数据（副本）
	this.getAll=function()
	{
		return JSON.parse(JSON.stringify(csvTable));
	}
	// 获取csv源码
	this.getSource=function()
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
	this.outfile=function(encodeType='csv',fileName=undefined)
	{
		var sourceCode;
		if(encodeType=='csv') sourceCode='data:text/csv;charset=utf-8,\uFEFF'+this.getSource();
		else if(encodeType=='json') sourceCode='data:text/json;charset=utf-8,'+JSON.stringify(csvTable);
		else throw Error('输出文件类型错误，应选择csv或json类型');

		var tempDownloadLink=document.createElement('a');
		tempDownloadLink.style.display='none';
		tempDownloadLink.download=fileName===undefined?'未命名.'+encodeType:fileName;
		tempDownloadLink.href=sourceCode;
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

//var csv=new Csv();
