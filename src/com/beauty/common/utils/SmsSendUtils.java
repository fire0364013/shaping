package com.beauty.common.utils;

import org.smslib.IOutboundMessageNotification;
import org.smslib.OutboundMessage;
import org.smslib.Service;
import org.smslib.Message.MessageEncodings;
import org.smslib.modem.SerialModemGateway;


public class SmsSendUtils {
	public static class OutboundNotification implements IOutboundMessageNotification {

		public void process(String gatewayId, OutboundMessage msg) {
			System.out.println("Outbound handler called from Gateway: "
					+ gatewayId);
			System.out.println(msg);
		}
	}
	@SuppressWarnings("deprecation")
	public static String sendMsgProcess(String mobilePhones,String sendcontent){
		String sendResult = "success";
		Service srv;
		OutboundMessage msg;
		OutboundNotification outboundNotification = new OutboundNotification();
		srv = new Service();
		SerialModemGateway gateway = new SerialModemGateway("modem.com1",
				"COM1", 9600, "无限传输", "W3100G-M"); // 设置端口与波特率
		gateway.setInbound(true); // 设置网关可以写入信息
		gateway.setOutbound(true); // 设置网关可以读取信息
		gateway.setSimPin("0000"); // 设置SIM PIN
		gateway.setOutboundNotification(outboundNotification);
		srv.addGateway(gateway);
		System.out.println("初始化成功，准备开启服务");
		try {
//			System.out.println(srv.getStartMillis());
			srv.startService();
			System.out.println("服务启动成功");
			String[] phones = mobilePhones.split(",");
			for (int i = 0; i < phones.length; i++) {
				msg = new OutboundMessage(phones[i], sendcontent);
				msg.setEncoding(MessageEncodings.ENCUCS2); // 中文
				srv.sendMessage(msg);
			}
		} catch (Exception e) {
			sendResult = "fail";
			e.printStackTrace();
		} finally {
			try {
				srv.stopService();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return sendResult;
	}
}
