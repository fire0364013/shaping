package com.beauty.common.easyui;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class JDataGrid {
	public int total;
	public List<Map<String, Object>> rows;
	public List<JColumn> columns;

	public static List<Map<String, Object>> ConvertRows(List<Object> list) {
		List<Map<String, Object>> rowsList = new ArrayList<Map<String, Object>>();
		try {
			if (list != null) {
				for (Object obj : list) {
					Field[] fList = obj.getClass().getDeclaredFields();
					Map<String, Object> map = new HashMap<String, Object>();
					for (Field f : fList) {
						// 属性
						String key = f.toString();
						// 值
						String firstLetter = key.substring(0, 1).toUpperCase();
						String getter = "get" + firstLetter + key.substring(1);
						Method method = obj.getClass().getMethod(getter,
								new Class[] {});
						Object value = method.invoke(obj, new Object[] {});
						map.put(key, value);
					}
					rowsList.add(map);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return rowsList;
	}

	public String ConvertToJson() {
		StringBuilder sb = new StringBuilder();
		int count = 0;
		sb.append("{{'total':" + total + ",'rows':[");
		// 添加数据
		for (Map<String, Object> map : rows) {
			sb.append("{");
			Iterator it = map.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry<String, Object> entry = (Entry<String, Object>) it
						.next();
				String key = entry.getKey();
				String value = entry.getValue().toString();
				sb.append(key + ":" + value + ",");
			}
			sb.substring(0, sb.length() - 1);
			sb.append("}");
			if (count != rows.size() - 1) {
				sb.append(",");
			}
			count++;
		}
		sb.append("],");
		sb.append("\"columns\":[");
		// 添加列
		if (columns != null && columns.size() > 0) {
			for (int i = 0; i < columns.size(); i++) {
				sb.append(columns.get(i).ConvertToJson());
				if (i != columns.size() - 1) {
					sb.append(",");
				}
			}
		}
		sb.append("]}");
		String str = sb.toString();
		return str;
	}
}
