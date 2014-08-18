package com.beauty.biz.web.common;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.awt.image.CropImageFilter;
import java.awt.image.FilteredImageSource;
import java.awt.image.ImageFilter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Date;

import javax.imageio.ImageIO;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;

import com.beauty.biz.entity.Unit;
import com.beauty.common.web.StrutsAction;
import com.sun.net.httpserver.HttpContext;

/**
 * 公用跳转到报表页面
 * 
 * @author
 * 
 */
public class PicAction extends StrutsAction<Unit> {
	private String p;
	private float z;
	private Integer t;
	private Integer l;
	private Integer w;
	private Integer h;

	public void ProcessRequest() throws Exception {
		try {
			HttpContext context;
			String imgPath = p;
			float zoomLevel = z;
			int left = t;// left
			int top = l;// top
			int width = w;
			int height = h;
			getResponse().setContentType("image/jpeg");
			String[] imgPaths = imgPath.split("/");
			int i = imgPaths.length;
			String imgName = imgPaths[i - 1];
			String filePath = getRequest().getSession().getServletContext()
					.getRealPath("/lims/tempUserPic/" + imgName);
			abscut(filePath, top, left, width, zoomLevel, height);
			System.out.println("filePath:" + filePath);
			System.out.println("top:" + top);
			System.out.println("left:" + left);
			System.out.println("width:" + width);
			System.out.println("height:" + height);
			sendMsg("success");
		} catch (Exception e) {
			sendMsg("fail");
		}
	}

	public static void abscut(String srcImageFile, int x, int y, int destWidth,
			float zoomLevel, int destHeight) {
		try {
			Image img;
			ImageFilter cropFilter;
			x = (int) (x / zoomLevel);
			y = (int) (y / zoomLevel);
			destWidth = (int) (destWidth / zoomLevel);
			destHeight = (int) (destHeight / zoomLevel);
			// 读取源图像
			BufferedImage bi = ImageIO.read(new File(srcImageFile));
			int srcWidth = (int) (bi.getWidth() / zoomLevel); // 源图宽度
			int srcHeight = (int) (bi.getHeight() / zoomLevel); // 源图高度
			if (srcWidth >= destWidth && srcHeight >= destHeight) {// 如果图片大小小于要截取框的大小，则保存原图
				Image image = bi.getScaledInstance(srcWidth, srcHeight,
						Image.SCALE_DEFAULT);
				// 改进的想法:是否可用多线程加快切割速度
				// 四个参数分别为图像起点坐标和宽高
				// 即: CropImageFilter(int x,int y,int width,int height)
				cropFilter = new CropImageFilter(x, y, destWidth, destHeight);
				img = Toolkit.getDefaultToolkit().createImage(
						new FilteredImageSource(image.getSource(), cropFilter));
				BufferedImage tag = new BufferedImage(destWidth, destHeight,
						BufferedImage.TYPE_INT_RGB);

				System.out.println("srcWidth:" + srcWidth);
				System.out.println("srcHeight:" + srcHeight);
				System.out.println("destWidth:" + destWidth);
				System.out.println("destHeight:" + destHeight);

				Graphics g = tag.getGraphics();
				g.drawImage(img, 0, 0, null); // 绘制缩小后的图
				g.dispose();
				// 输出为文件
				// 此处是截取图片的名字 ~~begin~~~~
				String filename = srcImageFile.substring(srcImageFile
						.lastIndexOf("\\"), srcImageFile.length());
				int fileLength = filename.length();
				String fileNamePre = srcImageFile.substring(0, srcImageFile
						.length()
						- fileLength);
				filename = filename.substring(1, filename.length());
				filename = "New" + filename;
				// 此处是截取图片的名字 ~~end~~~~
				String fileEnd = fileNamePre + "\\" + filename;
				ImageIO.write(tag, "JPEG", new File(fileEnd));
				// ImageIO.write(tag, "JPEG", new File(srcImageFile));
			} else {
				cropFilter = new CropImageFilter(x, y, destWidth, destHeight);
				Image image = bi.getScaledInstance(srcWidth, srcHeight,
						Image.SCALE_DEFAULT);
				img = Toolkit.getDefaultToolkit().createImage(
						new FilteredImageSource(image.getSource(), cropFilter));
				BufferedImage tag = new BufferedImage(srcWidth, srcHeight,
						BufferedImage.TYPE_INT_RGB);
				Graphics g = tag.getGraphics();
				g.drawImage(img, 0, 0, null); // 原图
				g.dispose();
				// 此处是截取图片的名字 ~~begin~~~~
				String filename = srcImageFile.substring(srcImageFile
						.lastIndexOf("\\"), srcImageFile.length());
				int fileLength = filename.length();
				String fileNamePre = srcImageFile.substring(0, srcImageFile
						.length()
						- fileLength);
				filename = filename.substring(1, filename.length());
				filename = "New" + filename;
				// 此处是截取图片的名字 ~~end~~~~
				String fileEnd = fileNamePre + "\\" + filename;
				ImageIO.write(tag, "JPEG", new File(fileEnd));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String getP() {
		return p;
	}

	public void setP(String p) {
		this.p = p;
	}

	public float getZ() {
		return z;
	}

	public void setZ(float z) {
		this.z = z;
	}

	public Integer getT() {
		return t;
	}

	public void setT(Integer t) {
		this.t = t;
	}

	public Integer getL() {
		return l;
	}

	public void setL(Integer l) {
		this.l = l;
	}

	public Integer getW() {
		return w;
	}

	public void setW(Integer w) {
		this.w = w;
	}

	public Integer getH() {
		return h;
	}

	public void setH(Integer h) {
		this.h = h;
	}

}
