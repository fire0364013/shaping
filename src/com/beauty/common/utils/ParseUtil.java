package com.beauty.common.utils;

import java.util.ArrayList;

public class ParseUtil {
	// 清除数组空白项，以及非空项的头尾空格
	public static String[] ListTrim(String[] tempStrList) {
		ArrayList<String> tempArrayList = new ArrayList<String>();
		for (int i = 0; i < tempStrList.length; i++) {
			if (!(tempStrList[i] == null || tempStrList[i].equals("") || tempStrList[i]
					.toString().replace(" ", "") == "")) {
				tempArrayList.add(tempStrList[i].trim());
			}
		}
		String[] retArray = new String[tempArrayList.size()];
		for (int i = 0; i < tempArrayList.size(); i++) {
			retArray[i] = tempArrayList.get(i);
		}
		return retArray;
	}

	// 获取数组特定项的索引,firstOrLast:0为第一个索引,1为最后一个索引
	public static int getIndexByValueTrim(String[] List, String value, int firstOrLast) {
		int retIndex = 0;
		for (int i = 0; i < List.length; i++) {
			if (List[i].trim().equals(value)) {
				retIndex = i;
				if (firstOrLast == 0)
					break;
			}
		}

		return retIndex;
	}
	//获取数组特定项的索引,firstOrLast:0为第一个索引,1为最后一个索引
	public static int getIndexByValue(String[] List, String value, int firstOrLast)
	{
		int retIndex = 0;
		for(int i=0; i<List.length; i++ )
		{
			if(List[i].equals(value))
			{
				retIndex = i;
				if(firstOrLast == 0) break;
			}	
		}
		
		return retIndex;
	}
}
