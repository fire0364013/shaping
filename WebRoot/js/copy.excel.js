//window.onload=intiTablePasteEvent;
function intiTablePasteEvent(tabname){
	var tbl=document.getElementById(tabname);
	var rows=tbl.rows;	
	var cells;
	for(var i=0;i<rows.length;i++){
		cells=rows[i].cells;		
		for(var j=0;j<cells.length;j++){			
			var node=cells[j].getElementsByTagName("input");
			if(!node||node.length<=0){
				node=cells[j].getElementsByTagName("textarea");
			}
			node=node[0]
			if(node&&node.tagName&&(node.tagName.toUpperCase()=="INPUT"||node.tagName.toUpperCase()=="SELECT"||node.tagName.toUpperCase()=="TEXTAREA")){				
				node.onpaste=function(){
					return doPaste(this);
				}
			}
		}
	}
}
function doPaste(inputObj){
	var txt=window.clipboardData.getData('text');
	if(!txt){
		return false;
	}
	while(txt.length > 0) {
		var c = txt.charAt( txt.length - 1 );
		if(c == '\n' || c == '\r' || c == '\t'){
			txt = txt.substring(0, txt.length - 1);
		}else{
			break;
		}
	}
	var pos = txt.indexOf("\n");
	if( pos < 0 ) {
		pos = txt.indexOf( "\t" );
		if( pos < 0 ) return true;
	}
	var re = /\r/g;
	txt = txt.replace(re, "");
	var prows = txt.split("\n");
	var data=new Array();
	for(var i=0;i<prows.length;i++){
		data[i]=prows[i].split("\t");
	}	
	var tbl=getTable(inputObj);	
	var vTbl=createVTable(tbl);
	var td=getTd(inputObj);
	var rowcol=getRowCol(tbl,td);
	var row=rowcol.row;
	var col=rowcol.col;
	var realCol=rowcol.realCol;
	var rows=tbl.rows;
	var cols,pcols,vtblCols;
	for(var i=row,ii=0;i<rows.length&&ii<data.length;i++,ii++){		
		cols=rows[i].cells;
		pcols=data[ii];
		vtblCols=vTbl[i];
		for(var j=col,jj=0,kk=realCol;j<cols.length&&jj<pcols.length;jj++,kk++){			
			if(vtblCols[kk]!="*"){
				var node=cols[j++].firstChild;
				if(node&&node.tagName&&(node.tagName.toUpperCase()=="INPUT"||node.tagName.toUpperCase()=="SELECT"||node.tagName.toUpperCase()=="TEXTAREA")){
					node.value.title=node.value=pcols[jj];
				}				
			}			
		}
	}
	return false;
}

//创建一个虚拟表格
function createVTable(tbl){		
  	var rows=tbl.rows;
  	var cells;
  	var rowColObj=getTblRowColNum(tbl);
  	var rowNum=rowColObj.rowNum;
  	var colNum=rowColObj.colNum;  	
  	var vTable=new Array(rowNum);  		
  	for(var i=0;i<rowNum;i++){
  		vTable[i]=new Array(colNum);  		
  	}  	
  	for(var i=0;i<rows.length;i++){
  		cells=rows[i].cells;  			
  		for(var j=0;j<cells.length;j++){
  			var colSpan=parseInt(cells[j].colSpan);
  			var rowSpan=parseInt(cells[j].rowSpan);  			
  			if(colSpan>1||rowSpan>1){
  				for(var x=0;x<rowSpan;x++){
  					for(var y=0;y<colSpan;y++){
  						if(x==0&&y==0){
  							continue;
  						}else{
  							vTable[i+x][j+y]="*";  							
  						}
  					}
  				}
  			}
  		}
  	}
  	return vTable;
}
//获取包容的input或textarea的Table
function getTable(inputObj){
	var node=inputObj;
	while(node){
		if(node.tagName.toUpperCase()=="TABLE"){
			break;
		}else{
			node=node.parentNode;
		}
	}
	return node; 
}
//获取包容的input或textarea的TD
function getTd(inputObj){
	var node=inputObj;
	while(node){
		if(node.tagName.toUpperCase()=="TD"){
			break;
		}else{
			node=node.parentNode;
		}
	}
	return node; 
}
//获取单元格所在的行列
function getRowCol(tbl,cell){	
	var row=-1,col=-1;
	var rows=tbl.rows;
	var cells;
	for(var i=0;i<rows.length;i++){
		cells=rows[i].cells;
		for(var j=0;j<cells.length;j++){
			if(cells[j]==cell){
				row=i;
				col=j;
				break;
			}
		}
	}
	var cells=tbl.rows[row].cells;
	var colNum=0;
	for(var i=0;i<col;i++){
		colNum+=parseInt(cells[i].colSpan);
	}
	var obj=new Object();
	obj.row=row;
	obj.col=col;
	obj.realCol=colNum;
	return obj;
}
//获取表格的行数和列数
function getTblRowColNum(tbl){
	var rows=tbl.rows;
	var rowNum=0,colNum=0;
	rowNum=rows.length;
	var tmp;
	for(var i=0;i<rows.length;i++){
		tmp=rows[i].cells.length;
		if(colNum<tmp){
			colNum=tmp;
		}
	}
 	var obj=new Object();
  	obj.rowNum=rowNum;
  	obj.colNum=colNum;
  	return obj;
}