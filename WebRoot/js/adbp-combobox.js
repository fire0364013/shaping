//ComboBox过滤后台JSON数据
function comboboxFilter(url,param) {
	var result = null;
	$.ajax({
		url : url,
		type : 'post',
		data : param,
		dataType: 'json',
		async: false,
		success : function(data) {
			var temp = data['rows'];
			if(temp == undefined) {
				result = data;
			} else {
				result = temp;
			}
		}
	});
	return result;
};

// 下拉选择器
AdbpHelper.combobox = function(config) {
	this.selectElement = "#" + config.selectElement || "#combobox";// 选择器
	this.loadUrl = config.loadUrl; // 加载数据url
	this.onSelect = config.onSelect;
	this.param = config.param;
	
	if (config.codeItem) { // 是否为系统编码
		this.textField = 'name';
		this.valueField = 'code';
	} else {
		this.textField = config.textField || 'name';
		this.valueField = config.valueField || 'id';
	};

	if (config.loadUrl || config.data) {
		var jsonData, firstValue;
		if (config.data) {
			jsonData = config.data;
		} else {
			jsonData = comboboxFilter(this.loadUrl,this.param);
		}
		if (!$.isEmptyObject(jsonData)) {
			firstValue = jsonData[0][this.valueField];
		}
		
		$(this.selectElement).combobox({
			data : jsonData,
			valueField : this.valueField,
			textField : this.textField
		});
		
		if (this.onSelect) {
			$(this.selectElement).combobox({
				'onSelect': this.onSelect
			});
		};		
		
		if (config.selectFirst) {// 是否选中第一个
			$(this.selectElement).combobox('select', firstValue);
		}
	};

	if (config.ajaxAdd) {
		this.addInput = "#" + config.ajaxAdd.input || "#input";// 输入框
		this.addInputDiv = "#" + config.ajaxAdd.inputDiv || "#inputDiv";// 输入框所在div
		this.addSaveUrl = config.ajaxAdd.saveUrl; // 保存url
	};
	
	// 保存
	this.save = function() {
		var inputValue = $(this.addInput).val();
		if (inputValue) {
			var inputTemp = this.addInput;
			var inputDivTemp = this.addInputDiv;
			$.ajax({
				url : this.addSaveUrl,
				type : 'post',
				dataType: 'json',
				data : {
					'name' : inputValue
				},
				async: false,
				success : function(data) {
					$(inputTemp).val("");
					$(inputDivTemp).hide('slow');
				}
			});
			
			// 重新加载
			if (this.loadUrl) {
				$(this.selectElement).combobox({
					data : comboboxFilter(this.loadUrl),
					valueField : this.valueField,
					textField : this.textField
				});
			}
		}
	};
	
	this.select = function(value) {
		$(this.selectElement).combobox('select', value);
	};
	
	this.clear = function(value) {
		$(this.selectElement).combobox('clear');
		$(this.selectElement).combobox('setValue', "");
	};
	
	this.getValue = function() {
		return $(this.selectElement).combobox('getValue');
	};
	
	this.getText = function() {
		return $(this.selectElement).combobox('getText');
	};
	
	this.disable = function() {
		$(this.selectElement).combobox('disable');
	};
	
	this.getData = function() {
		return $(this.selectElement).combobox('getData');
	};
};