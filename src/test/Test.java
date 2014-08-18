package test;

import java.util.ArrayList;
import java.util.List;

import edu.emory.mathcs.backport.java.util.Collections;

/**
 * 测试
 * 
 * @author
 * @version 1.0
 */
public class Test {

	public static void main(String[] args) throws IllegalArgumentException,
			IllegalAccessException {
		System.out.println(Integer.parseInt("001"));
		// ApplicationContext context = new
		// ClassPathXmlApplicationContext("applicationContext.xml");
		// AnalysesetManager analysesetManager =
		// (AnalysesetManager)context.getBean("analysesetManager");
		// BigDecimal de = BigDecimal.valueOf(232.2092);
		// MathContext m = new MathContext(5,RoundingMode.HALF_UP);
		// System.out.println(de.divide(BigDecimal.ONE,m).toString());
		// String str = analysesetManager.getDeviceTypeIdsByItems("39,40");
		// System.out.println("类型名称："+str);
		// List<DeviceType> list =
		// deviceTypeManager.getDeviceTypeByTypeId("01,02,03,04");
		// for(DeviceType d : list){
		// System.out.println("类型名称："+d.getDevicetypename());
		// }
		// String sql =
		// "(select distinct sitem.iitemid.itemid from Sampleitem sitem where sitem.anlyseperson.userid='40' and (sitem.STATUS='SampeTest' or  sitem.status='SampeGrant')";
		// List<WorkflowActionRecord> warList =
		// workflowDao.getWorkflowActionRecordList("185");
		// List<WorkflowStepAction> warList =
		// workflowManager.getAllPreviousWorkflowStepActionByCurrentStep("WT_PROJECT","TaskApprove","提交");
		// ProjectCharge p=
		// (ProjectCharge)projectChargeDao.createNativeQuery("from ProjectCharge p where p.project.projectid = ?",
		// "251").uniqueResult();
		// for(WorkflowStepAction war : warList){
		// Query q =hibernateDao.createQuery(sql, null);
		// sampleitemManager.addParallelSample("WT120003005005");//.getSampleitemStatus("40");//projectsDao.monitormonthIsRepeat("2012",
		// "9", "49", "1", "JD");
		// System.out.println("合同编号："+str);
		// // }

		/*
		 * List<Integer> list = new ArrayList<Integer>(); list.add(1);
		 * list.add(2); list.add(3); list.add(4); list.add(5); list.add(6);
		 * list.add(8); list.add(12); list.add(7); list.add(9); list.add(7); //
		 * Collections.max(list); //Set<String> set = new HashSet<String>();
		 * //set.addAll(list); // list.removeAll(list); //list.addAll(set); //
		 * Integer[] arr = new Integer[list.size()]; // arr =
		 * (Integer[])list.toArray(); // for(int i=0;i<arr.length;i++){ //
		 * for(int j=0;j<arr.length;j++){ // // } // } // for(String s : list){
		 * System.out.println(Collections.max(list));
		 */
		// }

		// Double d = new
		// Double("000000000000000000000000000000000000000000000");
		// System.out.println(d);
		// ProjectChargeManager projectChargeManager =
		// (ProjectChargeManager)context.getBean("projectChargeManager");
		//		
		// ProjectCharge p =
		// (ProjectCharge)projectChargeManager.queryList("from ProjectCharge p where p.project.projectid = ?",
		// "185").list();
		//		
		// if(null!=p){
		// System.out.println(p.getProjectchargeid());
		// // query.list().size();
		// }
		// RoleManager roleManager =
		// (RoleManager)context.getBean("roleManager");
		// User user = userManager.getUser(1);
		// System.out.println("ID： "+user.getId()+" 姓名： "+user.getUserName()+" 密码："+user.getPassword());
		// Role role = roleManager.getRole(1);
		// System.out.println("ID： "+role.getId()+" 角色名： "+role.getName());
		// User user = new User();
		// user.setId(1);
		// user.setUserName("张三");
		// user.setPassword("zhangsan");

		// Field[] list = user.getClass().getDeclaredFields();
		// for(Field field : list){
		// System.out.println(field.getName().toUpperCase()+"___"+field.get(user));
		// }

		// Map<String,Object> data = user.getFieldValue();
		// Set<String> key = data.keySet();
		// // Iterator<String> iterator = key.iterator();
		// while(!key.isEmpty()){
		// System.out.println(key+":"+data.get(key));
		// }

		// Role role = roleManager.getRole(5);
		// Assert.assertEquals("超级管理员",role.getName());
		// System.out.println("ID： "+role.getRoleid()+" 角色名： "+role.getRolename());
		// System.out.println("MODULES:"+role.getModules());

		/*
		 * List<Map<String,String>> rowData = new
		 * ArrayList<Map<String,String>>();
		 * 
		 * Map<String,String> map = new HashMap<String,String>();
		 * map.put("1#2#1", "1.2"); map.put("1#2#2", "1.2"); map.put("1#2#3",
		 * "1.2"); rowData.add(map); String temp = ""; for(Map<String,String> m
		 * : rowData){ Set<String> set = m.keySet(); for(String s : set){
		 * if(s.contains("1") && s.contains("2")){ temp = temp + m.get(s)+","; }
		 * } } temp = temp.substring(0, temp.length()-1); String arr[] =
		 * temp.split(","); int arrLength = arr.length;
		 * 
		 * double tempDbl = 0.0d; for(int i=0; i<arrLength; i++){ tempDbl =
		 * tempDbl + new Double(arr[i]); }
		 * 
		 * 
		 * System.out.println(""+(tempDbl/arrLength));
		 */

		// double dbl = 0.0d;
		// System.out.println(""+dbl);

		// int count = 0;
		// for(int i=0;i<5;i++){
		// count++;
		// }
		// System.out.println(count);

		/*
		 * Map<String,String> map = new HashMap<String,String>(); map.put("1",
		 * "11"); map.put("1", "12"); map.put("2", "21"); map.put("2", "22");
		 * map.put("2", "23");
		 * 
		 * for(String s : map.keySet()){
		 * 
		 * System.out.println(s+"__"+map.get(s)); }
		 */

		// List<String> list2 = new ArrayList<String>();
		// String itemids = "";
		// List<String> list = new ArrayList<String>();
		// list.add("a");
		// list.add("d");
		// list.add("c");
		// list.add("a");
		// list.add("b");
		// list.add("d");
		// list.add("c");
		// list.add("b");
		//		
		// for(String s : list){
		// // if(!list2.contains(s)){
		// // list2.add(s);
		// // }
		// if(!itemids.contains(s)){
		// itemids = itemids + s +",";
		// }
		// }
		//		
		// //for(String s : list2){
		//			
		// System.out.println(itemids.substring(0, itemids.length()-1));
		// //}
		// String a = "b";
		// String str="a,";
		// str+=a+",";
		// System.out.println(str.substring(0, str.length()-1));
		// List<Double> list = new ArrayList<Double>();
		// List<Double> list2 = new ArrayList<Double>();
		// list.add(1d);
		// list.add(2d);
		// list.add(3d);
		// list.add(4d);
		// list.add(5d);
		// list.add(6d);
		// for(Double d : list){
		// System.out.println(d.toString());
		// }
		// double maxVal = (Double)Collections.max(list);
		// double minVal = (Double)Collections.min(list);
		//		
		// for(Double dou : list)
		// {
		// if(dou!=maxVal && dou!=minVal){
		// list2.add(dou);
		// }
		//			
		// }
		// System.out.println("--------------------------------------");
		// for(Double d : list2){
		// System.out.println(d.toString());
		// }
		// System.out.println("--------------------------------------");
		// Double ret = 0.0d;
		// for(Double dou : list2)
		// {
		// ret = ret + dou;
		// }
		// ret = ret/list2.size();
		// System.out.println(ret.toString());
		// Double ddd = Math.pow(10,3.5);
		// System.out.println(ddd.intValue());

		String str = "1" + 3;
		System.out.println(str);

	}
}
