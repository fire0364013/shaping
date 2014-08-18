package com.beauty.common.easyui;

public class JColumn {
	public Integer rowspan;
	public Integer colspan;
	public Boolean checkbox;
	public String field;
	public String title;
	public Integer width;
	public String align;

	public String ConvertToJson() {
		StringBuilder sb = new StringBuilder();
		sb.append("{");
		if (rowspan != null) {
			sb.append("\"rowspan\":\"" + rowspan + "\"");
		}
		if (colspan != null) {
			sb.append("\"colspan\":\"" + colspan + "\"");
		}
		if (checkbox != null) {
			sb.append("\"checkbox\":\"" + checkbox + "\"");
		}
		sb.append("\"field\":\"" + field + "\"");
		sb.append("\"width\":\"" + width + "\"");
		sb.append("\"align\":\"" + align + "\"");
		sb.append("\"title\":\"" + title + "\"");
		sb.replace(sb.length() - 1, 1, "");
		sb.append("}");
		String str = sb.toString();
		return str;
	}

	public Integer getRowspan() {
		return rowspan;
	}

	public void setRowspan(Integer rowspan) {
		this.rowspan = rowspan;
	}

	public Integer getColspan() {
		return colspan;
	}

	public void setColspan(Integer colspan) {
		this.colspan = colspan;
	}

	public Boolean getCheckbox() {
		return checkbox;
	}

	public void setCheckbox(Boolean checkbox) {
		this.checkbox = checkbox;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	public String getAlign() {
		return align;
	}

	public void setAlign(String align) {
		this.align = align;
	}

}
