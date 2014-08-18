package test;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

import com.beauty.common.utils.ParseUtil;

public class ExcelOperate {
	/**
	 * 
	 * 读取Excel的内容，第一维数组存储的是一行中格列的值，二维数组存储的是多少个行
	 * 
	 * @param file
	 *            读取数据的源Excel
	 * 
	 * @param ignoreRows
	 *            读取数据忽略的行数，比喻行头不需要读入 忽略的行数为1
	 * @param sheetname
	 * 			  读取数据的表格名
	 * 
	 * @return 读出的Excel中数据的内容
	 * 
	 * @throws FileNotFoundException
	 * 
	 * @throws IOException
	 */
	public static String getData(File file, int ignoreRows,String sheetname)

	throws FileNotFoundException, IOException {

		List<String[]> result = new ArrayList<String[]>();

		int rowSize = 0;

		BufferedInputStream in = new BufferedInputStream(new FileInputStream(

		file));

		// 打开HSSFWorkbook

		POIFSFileSystem fs = new POIFSFileSystem(in);

		HSSFWorkbook wb = new HSSFWorkbook(fs);

		HSSFCell cell = null;

//		for (int sheetIndex = 0; sheetIndex < wb.getNumberOfSheets(); sheetIndex++) {

//			HSSFSheet st = wb.getSheetAt(sheetIndex);
			 HSSFSheet st = wb.getSheet(sheetname);
			// 第一行为标题，不取

			for (int rowIndex = ignoreRows; rowIndex <= st.getLastRowNum(); rowIndex++) {
				HSSFRow row = st.getRow(rowIndex);

				if (row == null) {

					continue;

				}

				int tempRowSize = row.getLastCellNum() + 1;

				if (tempRowSize > rowSize) {

					rowSize = tempRowSize;

				}

				String[] values = new String[rowSize];

				Arrays.fill(values, "");

				boolean hasValue = false;

				for (short columnIndex = 0; columnIndex <= row.getLastCellNum(); columnIndex++) {

					String value = "";

					cell = row.getCell(columnIndex);

					if (cell != null) {

						// 注意：一定要设成这个，否则可能会出现乱码

						cell.setEncoding(HSSFCell.ENCODING_UTF_16);

						switch (cell.getCellType()) {

						case HSSFCell.CELL_TYPE_STRING:

							value = cell.getStringCellValue();

							break;

						case HSSFCell.CELL_TYPE_NUMERIC:

							if (HSSFDateUtil.isCellDateFormatted(cell)) {

								Date date = cell.getDateCellValue();

								if (date != null) {

									value = new SimpleDateFormat()

									.format(date);

								} else {

									value = "";

								}

							} else {

								value = new DecimalFormat().format(cell

								.getNumericCellValue());

							}

							break;

						case HSSFCell.CELL_TYPE_FORMULA:

							// 导入时如果为公式生成的数据则无值

							if (!cell.getStringCellValue().equals("")) {

								value = cell.getStringCellValue();

							} else {

								value = cell.getNumericCellValue() + "";

							}

							break;

						case HSSFCell.CELL_TYPE_BLANK:

							break;

						case HSSFCell.CELL_TYPE_ERROR:

							value = "";

							break;

						case HSSFCell.CELL_TYPE_BOOLEAN:

							value = (cell.getBooleanCellValue() == true ? "Y"

							: "N");

							break;

						default:

							value = "";

						}

					}

					if (columnIndex == 0 && value.trim().equals("")) {

						break;

					}

					values[columnIndex] = rightTrim(value);

					hasValue = true;

				}

				if (hasValue) {

					result.add(values);

				}

			}

//		}

		in.close();

		String[][] returnArray = new String[result.size()][rowSize];

		for (int i = 0; i < returnArray.length; i++) {

			returnArray[i] = (String[]) result.get(i);

		}
		
		int rowLength = returnArray.length;
		StringBuffer bf = new StringBuffer();
		
		for (int i = 0; i < rowLength; i++) {

			for (int j = 0; j < returnArray[i].length; j++) {
				bf.append(returnArray[i][j] + "\t\t");
			}
			bf.append("\n");
		}

		return bf.toString();

	}

	/**
	 * 
	 * 去掉字符串右边的空格
	 * 
	 * @param str
	 *            要处理的字符串
	 * 
	 * @return 处理后的字符串
	 */

	public static String rightTrim(String str) {

		if (str == null) {

			return "";

		}

		int length = str.length();

		for (int i = length - 1; i >= 0; i--) {

			if (str.charAt(i) != 0x20) {

				break;

			}

			length--;

		}

		return str.substring(0, length);

	}
	

	public static void main(String[] args) throws Exception {

		File file = new File("E:/bb.xls");
		String fileAlina = getData(file, 0,"测量参数");
		//A项目获取项目别名		
		int startPos = fileAlina.indexOf("A道元素")+4;
		String itemContent = fileAlina.substring(startPos);
		int endPos = itemContent.indexOf("\n");
		String currentItemAAlias = itemContent.substring(0, endPos).toString().trim();
		currentItemAAlias = currentItemAAlias.equals("None")||currentItemAAlias.equals("none")?"":currentItemAAlias;
		//B项目获取项目别名
		startPos = fileAlina.indexOf("B道元素")+4;
		itemContent = fileAlina.substring(startPos);
		endPos = itemContent.indexOf("\n");
		String currentItemBAlias = itemContent.substring(0, endPos).toString().trim();
		currentItemBAlias = currentItemBAlias.equals("None")||currentItemBAlias.equals("none")?"":currentItemBAlias;
//		
//		//获取数据列表列名数组
		String colContent = ExcelOperate.getData(file, 0, "输出报告");
		System.out.println(colContent);
		endPos = colContent.indexOf("\n");
		String colomnContent = colContent.substring(0,endPos).toString().trim();
		String[] colomnList = colomnContent.split("\t");
		colomnList = ParseUtil.ListTrim(colomnList);
		//获取样品编号、检测值的列号
		int samplecodeIndex = ParseUtil.getIndexByValueTrim(colomnList, "样品名称", 0);
		int signalAIndex = ParseUtil.getIndexByValueTrim(colomnList, "A道荧光值", 0);
		int valueAIndex = ParseUtil.getIndexByValueTrim(colomnList, "A道浓度", 0);
		int signalBIndex = ParseUtil.getIndexByValueTrim(colomnList, "B道荧光值", 0);
		int valueBIndex = ParseUtil.getIndexByValueTrim(colomnList, "B道浓度", 0);
//		
//		//获取数据列表----样品数据
		startPos = colContent.indexOf("\n");
		String datalistContent = colContent.substring(startPos).trim();
//		//行数据数组
		String[] rowDataContentList = ParseUtil.ListTrim(datalistContent.split("\n"));
		
		for(int i=0; i<rowDataContentList.length; i++){
			//当前行的数据数组
			String currentRowDataContent = rowDataContentList[i];
			String[] cellDataContentList = ParseUtil.ListTrim(currentRowDataContent.split("\t\t"));
			if(cellDataContentList.length < 8) continue; //去掉非法数据行
			//当前行的项目别名和数据
			String currentsamplecode = cellDataContentList[samplecodeIndex];
			String signalAvalue = cellDataContentList[signalAIndex];
			String currentAvalue = cellDataContentList[valueAIndex];
			String signalBvalue = cellDataContentList[signalBIndex];
			String currentBvalue = cellDataContentList[valueBIndex];
			
			//通过查询项目参数映射配置表，获取项目编号、方法编号、参数编号
		}		
	}
}
