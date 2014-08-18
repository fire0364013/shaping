package com.beauty.common.report;

import java.util.*;

import com.runqian.base4.util.*;
import com.runqian.report4.model.expression.*;
import com.runqian.report4.usermodel.*;

public class tGroup extends Function {

	public Object calculate(Context arg0, boolean arg1) {
		// 报表中调用该函数传递过来的参数列表
		if (this.paramList.size() == 0) {
			throw new ReportError("tGroup函数参数列表为空");
		}

		// 取得计算表达式（得到传递给报表的参数）
		Expression param1 = (Expression) this.paramList.get(0);
		if (param1 == null) {
			throw new ReportError("tGroup函数出现无效参数");
		}

		// ==================================================================
		// 运算表达式,并取得运算结果(Object)
		Object result1 = Variant2.getValue(param1.calculate(arg0, arg1), false,
				false);
		if (result1 == null)
			return ObjectCache.getInteger(0);

		if (result1 instanceof List) {
			// 如结果为List,求得List中保存不同对象的个数
			List list = (List) result1;
			Hashtable ht = new Hashtable();
			Iterator it = list.iterator();
			for (; it.hasNext();) {
				ht.put(it.next(), "");
			}
			// 返回实际的不同值中的人数
			Iterator it2 = ht.keySet().iterator();
			List tgroup = new ArrayList();
			tgroup = new ArrayList();
			while (it2.hasNext()) {
				tgroup.add(it2.next());
			}
			return tgroup;
		}
		return null;
		// ===================================================================
	}
}