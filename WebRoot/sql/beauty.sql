
-- ----------------------------
-- Table structure for custom
-- ----------------------------
DROP TABLE IF EXISTS custom;
CREATE TABLE custom (
  CUSTOMID varchar(50) NOT NULL COMMENT '人员编号',
  CAR_ID varchar(30) DEFAULT NULL COMMENT '身份证号',
  BIRTHDAY date DEFAULT NULL COMMENT '出生日期',
  ADDRESS varchar(200) DEFAULT NULL COMMENT '住址',
  STATUS varchar(50) DEFAULT NULL COMMENT '状态',
  CHARACT varchar(30) DEFAULT NULL,
  REMARK varchar(500) DEFAULT NULL COMMENT '备注',
  ENTID varchar(30) DEFAULT NULL COMMENT '所属企业',
  CUSTOMNAME varchar(30) DEFAULT NULL COMMENT '客户姓名',
  SEX varchar(30) DEFAULT NULL COMMENT '性别',
  CONSUMPTIONLEVEL varchar(30) DEFAULT NULL COMMENT '消费级别',
  MOBILEPHONE varchar(30) DEFAULT NULL COMMENT '电话',
  FAMILYBACKGROUD varchar(30) DEFAULT NULL COMMENT '家庭背景',
  MARRIAGE varchar(30) DEFAULT NULL COMMENT '婚史',
  OCCUPATION varchar(30) DEFAULT NULL COMMENT '职业',
  SATISFACTION varchar(30) DEFAULT NULL COMMENT '以往整形满意度',
  DISSATISFIEDINFO varchar(500) DEFAULT NULL COMMENT '不满意地方',
  CONSUMPTIONQUOTA varchar(30) DEFAULT NULL COMMENT '消费额度',
  CARFULINFO varchar(500) DEFAULT NULL COMMENT '注意事项',
  PRIMARY KEY (CUSTOMID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='人员(custom)';

-- ----------------------------
-- Records of custom
-- ----------------------------
INSERT INTO custom VALUES ('111', null, '2014-07-28', null, null, null, null, '2', '王五111', '女', null, '222222', null, null, null, null, null, null, null);
INSERT INTO custom VALUES ('19', null, '2014-07-28', null, '在岗', 'A', null, '1', '王五192', '女', null, '222222', null, '已婚, A', 'A', '无', null, '5K', null);
INSERT INTO custom VALUES ('20', null, '2014-07-28', null, null, null, null, '1', '王五20', '女', null, '222222', null, null, null, null, null, null, null);
INSERT INTO custom VALUES ('21', null, '2014-07-28', null, null, null, null, '1', '王五21', '女', null, '222222', null, null, null, null, null, null, null);
INSERT INTO custom VALUES ('22', null, '2014-07-28', null, null, null, null, '2', '王五22', '女', null, '222222', null, null, null, null, null, null, null);
INSERT INTO custom VALUES ('23', null, '2014-07-28', null, null, null, null, '1', '王五23', '女', null, '222222', null, null, null, null, null, null, null);
INSERT INTO custom VALUES ('24', null, '2014-07-28', null, null, null, null, '2', '王五24', '女', null, '222222', null, null, null, null, null, null, null);
INSERT INTO custom VALUES ('25', null, '2014-07-28', null, null, null, null, '2', '王五25', '女', null, '222222', null, null, null, null, null, null, null);
INSERT INTO custom VALUES ('27', null, '2014-07-28', null, null, null, null, '2', '王五27', '女', null, '222222', null, null, null, null, null, null, null);
INSERT INTO custom VALUES ('28', null, '2014-07-28', null, null, 'A', null, '1', '王五28', '男', null, '1111', null, '已婚, A', 'A', '无', '11111', '5K', null);
INSERT INTO custom VALUES ('37', null, '2014-07-28', '123213', null, 'A', '123', '1', '123123', '男', null, '222222', '123', '已婚, A', 'A', '无', '123', '5K', '123');

-- ----------------------------
-- Table structure for departmentinfo
-- ----------------------------
DROP TABLE IF EXISTS departmentinfo;
CREATE TABLE departmentinfo (
  DEPTID varchar(20) NOT NULL COMMENT '部门编号',
  DEPTNAME varchar(100) NOT NULL COMMENT '部门名称',
  PARENTDEPTID decimal(8,0) NOT NULL COMMENT '父部门编号',
  ORDERID decimal(8,0) DEFAULT NULL COMMENT '序号',
  FLAG varchar(2) DEFAULT NULL COMMENT '0特殊，1普通',
  ENTID varchar(30) DEFAULT NULL COMMENT '所属企业',
  PRIMARY KEY (DEPTID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='部门(DEPARTMENTINFO)';

-- ----------------------------
-- Records of departmentinfo
-- ----------------------------
INSERT INTO departmentinfo VALUES ('1', '部门1', '0', '1', null, null);
INSERT INTO departmentinfo VALUES ('17', '部门17', '0', '8', null, null);
INSERT INTO departmentinfo VALUES ('18', '部门18', '0', '9', null, null);
INSERT INTO departmentinfo VALUES ('19', '部门19', '0', '10', null, null);
INSERT INTO departmentinfo VALUES ('2', '部门2', '0', '2', null, null);
INSERT INTO departmentinfo VALUES ('20', '部门20', '0', '11', null, null);
INSERT INTO departmentinfo VALUES ('3', '部门3', '0', '3', null, null);
INSERT INTO departmentinfo VALUES ('4', '部门4', '0', '4', null, null);
INSERT INTO departmentinfo VALUES ('5', '部门5', '0', '5', null, null);
INSERT INTO departmentinfo VALUES ('6', '部门6', '0', '6', null, null);

-- ----------------------------
-- Table structure for dictionaryindex
-- ----------------------------
DROP TABLE IF EXISTS dictionaryindex;
CREATE TABLE dictionaryindex (
  DICTIONARYCODE varchar(20) NOT NULL,
  DICTIONARYNAME varchar(20) DEFAULT NULL,
  PRIMARY KEY (DICTIONARYCODE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dictionaryindex
-- ----------------------------
INSERT INTO dictionaryindex VALUES ('KHXG', '顾客性格');
INSERT INTO dictionaryindex VALUES ('KHZY', '顾客职业');

-- ----------------------------
-- Table structure for dictionaryinfo
-- ----------------------------
DROP TABLE IF EXISTS dictionaryinfo;
CREATE TABLE dictionaryinfo (
  DINFOID varchar(20) NOT NULL,
  DICTIONNARYCODE varchar(20) DEFAULT NULL,
  DINFOCODE varchar(20) DEFAULT NULL,
  DINFONAME varchar(100) DEFAULT NULL,
  DORDER varchar(10) DEFAULT NULL,
  PRIMARY KEY (DINFOID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dictionaryinfo
-- ----------------------------
INSERT INTO dictionaryinfo VALUES ('1', 'KHXG', 'A', '理智型：深思熟虑，沉着冷静，善于自控', '1');
INSERT INTO dictionaryinfo VALUES ('2', 'KHXG', 'B', '疑虑型：犹豫不决，过敏多疑，易受暗示', '2');
INSERT INTO dictionaryinfo VALUES ('3', 'KHXG', 'C', '情绪性：心境多变，多愁善感，容易冲动', '3');
INSERT INTO dictionaryinfo VALUES ('4', 'KHXG', 'D', '外倾型：活泼开朗，善于交际，独立性强，不拘小节', '4');
INSERT INTO dictionaryinfo VALUES ('5', 'KHXG', 'E', '内倾型：沉郁文静，不善交际，处事拘谨，应变力差', '5');
INSERT INTO dictionaryinfo VALUES ('55', 'KHZY', 'C', '私营业主', '3');
INSERT INTO dictionaryinfo VALUES ('57', 'KHZY', 'B', '白领', '2');
INSERT INTO dictionaryinfo VALUES ('59', 'KHZY', 'D', '公司老板', '4');
INSERT INTO dictionaryinfo VALUES ('61', 'KHZY', 'A', '主妇', '1');

-- ----------------------------
-- Table structure for employeeinfo
-- ----------------------------
DROP TABLE IF EXISTS employeeinfo;
CREATE TABLE employeeinfo (
  EMPLOYEEINFOID varchar(50) NOT NULL COMMENT '人员编号',
  CAR_ID varchar(30) DEFAULT NULL COMMENT '身份证号',
  BIRTHDAY date DEFAULT NULL COMMENT '出生日期',
  NATION varchar(50) DEFAULT NULL COMMENT '民族',
  NATIVEPLACE varchar(100) DEFAULT NULL COMMENT '籍贯',
  EDUCATIONLEVEL varchar(30) DEFAULT NULL COMMENT '学历',
  GRADUATIONSCHOOL varchar(100) DEFAULT NULL COMMENT '毕业学校',
  GRADUATIONDATE date DEFAULT NULL COMMENT '毕业日期',
  MAJOR varchar(100) DEFAULT NULL COMMENT '所学专业',
  ADDRESS varchar(200) DEFAULT NULL COMMENT '住址',
  POST varchar(50) DEFAULT NULL COMMENT '职务',
  TECHNICALSHIP varchar(50) DEFAULT NULL COMMENT '职称',
  TECHNICALLEVEL varchar(50) DEFAULT NULL COMMENT '职称级别',
  ENTRYTIME date DEFAULT NULL COMMENT '入职时间',
  POLITICAL varchar(10) DEFAULT NULL COMMENT '政治面貌',
  STATIONNO varchar(50) DEFAULT NULL COMMENT '上岗证编号',
  STATUS varchar(50) DEFAULT NULL COMMENT '状态（在岗、离职、外聘）',
  REMARK varchar(500) DEFAULT NULL COMMENT '备注',
  NICKNAME varchar(30) DEFAULT NULL COMMENT '简称',
  ENTID varchar(30) DEFAULT NULL COMMENT '所属企业',
  EMPLOYEEINFONAME varchar(30) DEFAULT NULL COMMENT '人员名称',
  MOBILEPHONE varchar(30) DEFAULT NULL COMMENT '联系方式',
  SEX varchar(30) DEFAULT NULL COMMENT '性别',
  PRIMARY KEY (EMPLOYEEINFOID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='人员(EMPLOYEEINFO)';

-- ----------------------------
-- Records of employeeinfo
-- ----------------------------
INSERT INTO employeeinfo VALUES ('1', null, '2014-07-27', null, null, '研究生', null, '2014-07-27', '有机化学', null, '站长', '高级工程师', null, '2014-07-27', null, null, '在岗', null, null, '1', '张三22', '111111', '女');
INSERT INTO employeeinfo VALUES ('111', null, '2014-07-27', null, null, '大专', null, '2014-07-27', '计算机', null, '办公室', '高级工', null, '2014-07-27', null, null, '在岗', null, null, '2', '张三111', '111111', '女');
INSERT INTO employeeinfo VALUES ('19', null, '2014-07-27', null, null, '高中', null, '2014-07-27', null, null, '办公室', '技师', null, '2014-07-27', null, null, '在岗', null, null, '1', '张三19', '111111', '女');
INSERT INTO employeeinfo VALUES ('20', null, '2014-07-27', null, null, '本科', null, '2014-07-27', '自动化', null, '办公室', '工程师', null, '2014-07-27', null, null, '在岗', null, null, '3', '张三20', '111111', '女');
INSERT INTO employeeinfo VALUES ('21', null, '2014-07-27', null, null, '本科', null, '2014-07-27', '财会', null, '办公室', '助理会计师', null, '2014-07-27', null, null, '在岗', null, null, '3', '张三21', '111111', '女');
INSERT INTO employeeinfo VALUES ('22', null, '2014-07-27', null, null, '本科', null, '2014-07-27', '播音与主持', null, '办公室', '政工师', null, '2014-07-27', null, null, '在岗', null, null, '2', '张三22', '111111', '女');
INSERT INTO employeeinfo VALUES ('23', null, '2014-07-27', null, null, '本科', null, '2014-07-27', null, null, '现场检测室', null, null, '2014-07-27', null, null, '在岗', null, null, '1', '张三23', '111111', '女');
INSERT INTO employeeinfo VALUES ('24', null, '2014-07-27', null, null, '本科', null, '2014-07-27', '法律', null, '办公室', null, null, '2014-07-27', null, null, '在岗', null, null, '4', '张三24', '111111', '女');
INSERT INTO employeeinfo VALUES ('25', null, '2014-07-27', null, null, '初中', null, '2014-07-27', null, null, '办公室', '高级工', null, '2014-07-27', null, null, '在岗', null, null, '4', '张三25', '111111', '女');
INSERT INTO employeeinfo VALUES ('27', null, '2014-07-27', null, null, '本科', null, '2014-07-27', '电算会计', null, '办公室（财会）', '高级会计师', null, '2014-07-27', null, null, '在岗', null, null, '4', '张三27', '111111', '女');
INSERT INTO employeeinfo VALUES ('36', '', null, '', '', '', '', null, '', '', '', '中级技师', '', null, '', null, '在岗', '', null, '3', '张三34', '111111', '女');

-- ----------------------------
-- Table structure for entpriseinfo
-- ----------------------------
DROP TABLE IF EXISTS entpriseinfo;
CREATE TABLE entpriseinfo (
  ENTID varchar(40) NOT NULL COMMENT '企业编号',
  ENTNAME varchar(80) DEFAULT NULL COMMENT '企业名称',
  PROVINCE varchar(20) DEFAULT NULL COMMENT '省份',
  CITY varchar(20) DEFAULT NULL COMMENT '城市',
  REGION varchar(20) DEFAULT NULL COMMENT '行政区',
  ADDRESS varchar(80) DEFAULT NULL COMMENT '详细地址',
  ORGANIZATIONCODE varchar(40) DEFAULT NULL COMMENT '组织机构代码',
  FICTITIOUSMAN varchar(50) DEFAULT NULL COMMENT '企业法人',
  LINKMAN varchar(40) DEFAULT NULL COMMENT '联系人',
  TELPHONE varchar(20) DEFAULT NULL COMMENT '联系电话',
  MOBILEPHONE varchar(30) DEFAULT NULL COMMENT '手机',
  FAX varchar(20) DEFAULT NULL COMMENT '传真',
  EMAIL varchar(40) DEFAULT NULL COMMENT '邮箱',
  POSTALCODE varchar(10) DEFAULT NULL COMMENT '邮编',
  SOURCETYPECODE varchar(10) DEFAULT NULL COMMENT '污染源类型编号',
  SCALECODE varchar(10) DEFAULT NULL COMMENT '企业规模编号',
  PRACTICEDATE datetime DEFAULT NULL COMMENT '开业时间',
  REMARK varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (ENTID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='企业信息';

-- ----------------------------
-- Records of entpriseinfo
-- ----------------------------
INSERT INTO entpriseinfo VALUES ('', 'test', '410000', '410100', '410101', '水电费', '', '', '水电费', '水电费', null, '', '', '', '003', '0', null, '');
INSERT INTO entpriseinfo VALUES ('1', '美容院1', '410000', '410100', '410101', '河南郑州', null, null, null, null, null, null, null, null, '001', null, null, null);
INSERT INTO entpriseinfo VALUES ('2', '美容院2', '410000', '410100', '410101', '河南郑州', null, null, null, null, null, null, null, null, '001', null, null, null);
INSERT INTO entpriseinfo VALUES ('3', '美容院3', '410000', '410100', '410101', '河南郑州', null, null, null, null, null, null, null, null, '001', null, null, null);
INSERT INTO entpriseinfo VALUES ('4', '美容医院1', '410000', '410100', '410101', '河南郑州', null, null, 'sdf', 'sdf', null, null, null, null, '002', '0', null, null);
INSERT INTO entpriseinfo VALUES ('5', '美容医院2', '410000', '410100', '410101', '河南郑州', null, null, null, null, null, null, null, null, '002', null, null, null);

-- ----------------------------
-- Table structure for iteminfo
-- ----------------------------
DROP TABLE IF EXISTS iteminfo;
CREATE TABLE iteminfo (
  ITEMID varchar(50) NOT NULL COMMENT '项目编号',
  ITEMNAME varchar(100) NOT NULL COMMENT '项目名称',
  ITEMTYPEID varchar(10) DEFAULT NULL COMMENT '项目类型编号',
  CREATEBY varchar(50) DEFAULT NULL COMMENT '创建人',
  CREATETIME datetime NOT NULL COMMENT '创建日期',
  REMARK varchar(500) DEFAULT NULL COMMENT '备注',
  ORDERID decimal(8,0) DEFAULT NULL COMMENT '序号',
  STANDFEE varchar(50) DEFAULT NULL COMMENT '费用标准',
  ENTID varchar(20) DEFAULT NULL COMMENT '所属企业',
  PRIMARY KEY (ITEMID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='测试项目信息';

-- ----------------------------
-- Records of iteminfo
-- ----------------------------
INSERT INTO iteminfo VALUES ('394', '割双眼皮', '1', '100', '2014-07-26 00:00:00', '水电费', '2', '200', '1');
INSERT INTO iteminfo VALUES ('395', '隆臀', '5', '100', '2014-07-26 00:00:00', '121', '12', '122', '1');
INSERT INTO iteminfo VALUES ('95', '隆胸', '2', null, '2014-07-26 00:00:00', 'sdf', '109', '200', '1');
INSERT INTO iteminfo VALUES ('96', '隆鼻', '2', null, '2014-07-26 00:00:00', 'sdf', '10', '200', '2');
INSERT INTO iteminfo VALUES ('97', '削骨', '2', null, '2014-07-26 00:00:00', 'sdf', '11', '100', '2');
INSERT INTO iteminfo VALUES ('98', '抽脂', '2', null, '2014-07-26 00:00:00', 'sdf22', '8', '100', '1');
INSERT INTO iteminfo VALUES ('99', '瘦腿', '2', null, '2014-07-26 00:00:00', 'sfd', '7', '200', '2');

-- ----------------------------
-- Table structure for moduleinfo
-- ----------------------------
DROP TABLE IF EXISTS moduleinfo;
CREATE TABLE moduleinfo (
  MODULEID varchar(30) NOT NULL COMMENT '模块编号',
  MODULENAME varchar(100) DEFAULT NULL COMMENT '模块名称',
  PARENTMODULEID varchar(30) DEFAULT NULL COMMENT '父模块编号',
  MODULETYPE varchar(50) DEFAULT NULL COMMENT '模块类型',
  URL varchar(200) DEFAULT NULL,
  REMINDHQL varchar(1000) DEFAULT NULL COMMENT '提醒HQL语句',
  ORDERID decimal(8,0) DEFAULT NULL COMMENT '序号',
  SQLTYPE varchar(30) DEFAULT NULL COMMENT '是SQL查询或HQL查询',
  PRIMARY KEY (MODULEID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='模块(MODULEINFO)';

-- ----------------------------
-- Records of moduleinfo
-- ----------------------------
INSERT INTO moduleinfo VALUES ('01', '任务管理', '0', '1', null, null, '1', null);
INSERT INTO moduleinfo VALUES ('0101', '委托任务登记', '01', '1', 'projects/taskregister/taskregister!waiweiList.action', 'from Projects p where p.userinfo.userid=@userid and p.status=\'Register\'', '1', 'HQL');
INSERT INTO moduleinfo VALUES ('0102', '委托任务审核', '01', '1', 'projects/taskregister/taskregister!yiyuanList.action', 'from Projects p where p.userinfo.userid=@userid and p.status=\'TaskApprove\'', '2', 'HQL');
INSERT INTO moduleinfo VALUES ('0103', '成交任务查询', '01', '1', 'projects/taskregister/taskregister!xiehuiList.action', null, '3', null);
INSERT INTO moduleinfo VALUES ('11', '人员管理', '0', '1', null, null, '11', null);
INSERT INTO moduleinfo VALUES ('1101', '人员基本信息管理', '11', '1', 'employeeinfo/employeeinfo!list.action', null, '1', null);
INSERT INTO moduleinfo VALUES ('1103', '客户基本信息管理', '11', '1', 'custom/custom!list.action', null, '3', null);
INSERT INTO moduleinfo VALUES ('13', '统计管理', '0', '1', null, null, '13', null);
INSERT INTO moduleinfo VALUES ('1301', '企业员工信息查询', '13', '1', 'statisticalquery/statisticalquery!toemployeelist.action', null, '1', null);
INSERT INTO moduleinfo VALUES ('1302', '客户信息查询', '13', '1', 'statisticalquery/statisticalquery!tocustomlist.action', null, '2', null);
INSERT INTO moduleinfo VALUES ('1303', '任务单查询', '13', '1', 'statisticalquery/statisticalquery!toprojectlist.action', null, '3', null);
INSERT INTO moduleinfo VALUES ('14', '基础信息管理', '0', '1', null, null, '14', null);
INSERT INTO moduleinfo VALUES ('1401', '企业基本信息管理', '14', '1', 'entpriseinfo/entpriseinfo!list.action', null, '1', null);
INSERT INTO moduleinfo VALUES ('1402', '项目类别管理', '14', '1', 'itemtype/itemtype!list.action', null, '2', null);
INSERT INTO moduleinfo VALUES ('1403', '收费项目管理', '14', '1', 'iteminfo/iteminfo!list.action', null, '3', null);
INSERT INTO moduleinfo VALUES ('1409', '行政区域管理', '14', '1', 'region/region!list.action', null, '9', null);
INSERT INTO moduleinfo VALUES ('1421', '数据字典维护', '14', '1', 'dictionary/dictionaryindex!list.action', null, null, null);
INSERT INTO moduleinfo VALUES ('15', '系统管理', '0', '1', null, null, '15', null);
INSERT INTO moduleinfo VALUES ('1501', '用户基本信息管理', '15', '1', 'userinfo/userinfo!list.action', null, '1', null);
INSERT INTO moduleinfo VALUES ('1502', '部门基本信息管理', '15', '1', 'departmentinfo/departmentinfo!list.action', null, '2', null);
INSERT INTO moduleinfo VALUES ('1503', '部门分组信息管理', '15', '1', 'group/departmentgroup!list.action', null, '3', null);
INSERT INTO moduleinfo VALUES ('1504', '系统角色管理', '15', '1', 'role/role!list.action', null, '4', null);
INSERT INTO moduleinfo VALUES ('1505', '系统模块管理', '15', '1', 'module/module!list.action', null, '5', null);
INSERT INTO moduleinfo VALUES ('1506', '系统权限管理', '15', '1', 'permission/permission!list.action', null, '6', null);
INSERT INTO moduleinfo VALUES ('1507', '系统日志管理', '15', '1', 'systemlog/systemlog!list.action', null, '7', null);
INSERT INTO moduleinfo VALUES ('1508', '数据备份管理', '15', '1', 'databackup/databackup!list.action', null, '8', null);

-- ----------------------------
-- Table structure for moduleright
-- ----------------------------
DROP TABLE IF EXISTS moduleright;
CREATE TABLE moduleright (
  ID decimal(8,0) NOT NULL COMMENT '编号',
  ROLEID varchar(30) DEFAULT NULL COMMENT '角色编号',
  MODULEID varchar(30) DEFAULT NULL COMMENT '模块编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='模块权限(MODULERIGHT)';

-- ----------------------------
-- Records of moduleright
-- ----------------------------
INSERT INTO moduleright VALUES ('10523', '29', '01');
INSERT INTO moduleright VALUES ('10524', '29', '0101');
INSERT INTO moduleright VALUES ('10525', '29', '11');
INSERT INTO moduleright VALUES ('10526', '29', '1101');
INSERT INTO moduleright VALUES ('10527', '29', '1103');
INSERT INTO moduleright VALUES ('10612', '19', '01');
INSERT INTO moduleright VALUES ('10613', '19', '0101');
INSERT INTO moduleright VALUES ('10614', '19', '0102');
INSERT INTO moduleright VALUES ('10615', '19', '11');
INSERT INTO moduleright VALUES ('10616', '19', '1101');
INSERT INTO moduleright VALUES ('10617', '19', '1103');
INSERT INTO moduleright VALUES ('10618', '19', '13');
INSERT INTO moduleright VALUES ('10619', '19', '1301');
INSERT INTO moduleright VALUES ('10620', '19', '1302');
INSERT INTO moduleright VALUES ('10621', '19', '1303');
INSERT INTO moduleright VALUES ('10622', '19', '14');
INSERT INTO moduleright VALUES ('10623', '19', '1401');
INSERT INTO moduleright VALUES ('10624', '19', '1402');
INSERT INTO moduleright VALUES ('10625', '19', '1403');
INSERT INTO moduleright VALUES ('10626', '19', '1409');
INSERT INTO moduleright VALUES ('10627', '19', '1421');
INSERT INTO moduleright VALUES ('10628', '19', '15');
INSERT INTO moduleright VALUES ('10629', '19', '1501');
INSERT INTO moduleright VALUES ('10630', '19', '1502');
INSERT INTO moduleright VALUES ('10631', '19', '1504');
INSERT INTO moduleright VALUES ('10632', '19', '1505');
INSERT INTO moduleright VALUES ('10633', '19', '1506');
INSERT INTO moduleright VALUES ('10634', '19', '1507');
INSERT INTO moduleright VALUES ('10635', '32', '01');
INSERT INTO moduleright VALUES ('10636', '32', '0103');
INSERT INTO moduleright VALUES ('10637', '32', '13');
INSERT INTO moduleright VALUES ('10638', '32', '1301');
INSERT INTO moduleright VALUES ('10639', '32', '1302');
INSERT INTO moduleright VALUES ('10640', '32', '1303');
INSERT INTO moduleright VALUES ('10641', '30', '01');
INSERT INTO moduleright VALUES ('10642', '30', '0102');
INSERT INTO moduleright VALUES ('10643', '30', '11');
INSERT INTO moduleright VALUES ('10644', '30', '1101');
INSERT INTO moduleright VALUES ('10645', '30', '14');
INSERT INTO moduleright VALUES ('10646', '30', '1403');

-- ----------------------------
-- Table structure for monitoritemtype
-- ----------------------------
DROP TABLE IF EXISTS monitoritemtype;
CREATE TABLE monitoritemtype (
  ITEMTYPEID varchar(10) NOT NULL COMMENT '项目类型编号',
  ITEMTYPENAME varchar(100) DEFAULT NULL COMMENT '项目类型名称',
  SAMPLETYPESIGN varchar(10) DEFAULT NULL,
  PARENTITEMTYPEID varchar(10) DEFAULT NULL,
  POLLUTANTTYPE varchar(30) DEFAULT NULL,
  PRIMARY KEY (ITEMTYPEID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目类型';

-- ----------------------------
-- Records of monitoritemtype
-- ----------------------------
INSERT INTO monitoritemtype VALUES ('1', '面部2', null, null, null);
INSERT INTO monitoritemtype VALUES ('2', '腿部', '腿部', '0', null);
INSERT INTO monitoritemtype VALUES ('3', '胸部', '胸部', '0', null);
INSERT INTO monitoritemtype VALUES ('5', '皮肤', '皮肤', '0', null);

-- ----------------------------
-- Table structure for pollutionsourcetype
-- ----------------------------
DROP TABLE IF EXISTS pollutionsourcetype;
CREATE TABLE pollutionsourcetype (
  SOURCETYPECODE varchar(10) NOT NULL COMMENT '污染源类型编号',
  SOURCETYPENAME varchar(30) NOT NULL COMMENT '污染源类型名称',
  SOURCETYPE varchar(2) DEFAULT NULL COMMENT '污染源类型（1表示企业、2表示大环境，3表示空气自动站，4表示水质自动站）',
  PRIMARY KEY (SOURCETYPECODE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pollutionsourcetype
-- ----------------------------
INSERT INTO pollutionsourcetype VALUES ('001', '美容院', '1');
INSERT INTO pollutionsourcetype VALUES ('002', '美容医院', '2');
INSERT INTO pollutionsourcetype VALUES ('003', '美容协会', '3');

-- ----------------------------
-- Table structure for projectattachment
-- ----------------------------
DROP TABLE IF EXISTS projectattachment;
CREATE TABLE projectattachment (
  ATTACHMENTID varchar(20) NOT NULL COMMENT '附件编号',
  PROJECTID varchar(20) DEFAULT NULL COMMENT '项目编号',
  ATTACHMENTTYPEID varchar(20) DEFAULT NULL COMMENT '附件类型编号',
  ATTACHMENTNAME varchar(50) DEFAULT NULL COMMENT '附件名称',
  UPLOADPERSON varchar(40) DEFAULT NULL COMMENT '上传人',
  UPLOADTIME datetime DEFAULT NULL COMMENT '上传时间',
  ATTACHMENT varchar(200) DEFAULT NULL COMMENT '附件路径',
  REMARK varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (ATTACHMENTID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目附件';

-- ----------------------------
-- Records of projectattachment
-- ----------------------------

-- ----------------------------
-- Table structure for projectitem
-- ----------------------------
DROP TABLE IF EXISTS projectitem;
CREATE TABLE projectitem (
  PROJECTITEMID varchar(20) NOT NULL COMMENT '任务项目ID',
  PROJECTCODE varchar(20) DEFAULT NULL COMMENT '任务编号',
  ITEMTYPEID varchar(10) DEFAULT NULL COMMENT '项目类型ID',
  ITEMID varchar(10) DEFAULT NULL COMMENT '项目ID',
  itemfee varchar(10) DEFAULT NULL,
  PRIMARY KEY (PROJECTITEMID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of projectitem
-- ----------------------------
INSERT INTO projectitem VALUES ('4335', '635', '1', '394', '106');
INSERT INTO projectitem VALUES ('4336', '635', '2', '98', '305');
INSERT INTO projectitem VALUES ('4337', '635', '2', '96', '251');
INSERT INTO projectitem VALUES ('4346', '637', '2', '95', '200');

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
  PROJECTCODE varchar(40) NOT NULL COMMENT '监测项目编码',
  PROJECTNAME varchar(200) DEFAULT NULL COMMENT '监测项目名称',
  REGISTBY varchar(40) DEFAULT NULL COMMENT '登记人',
  REGISTDATE datetime DEFAULT NULL COMMENT '登记日期',
  ENTRUSTENTID varchar(40) DEFAULT NULL COMMENT '委托单位编号',
  ISRETURN varchar(2) DEFAULT NULL COMMENT '项目是否退回',
  ENTRUSTDATE datetime DEFAULT NULL COMMENT '委托日期',
  COMPLETEDATE datetime DEFAULT NULL COMMENT '要求完成日期',
  SAMPLESOURCEID varchar(10) DEFAULT NULL COMMENT '样品来源编号',
  MONITORTYPEID varchar(20) DEFAULT NULL COMMENT '业务类型编号',
  STATUS varchar(40) DEFAULT NULL,
  MONITORPURPOSE varchar(200) DEFAULT NULL COMMENT '监测范围',
  REPORTFORM varchar(50) DEFAULT NULL COMMENT '报告格式(测试报告、综合报告)',
  WORKFLOWCODE varchar(40) DEFAULT NULL COMMENT '流程编码',
  TASKDOWNDATE datetime DEFAULT NULL COMMENT '任务下达日期',
  REMARK varchar(500) DEFAULT NULL COMMENT '备注',
  PROJECTREALCODE varchar(40) DEFAULT NULL,
  XCJCQC varchar(300) DEFAULT NULL COMMENT '质控要求',
  JCFXQC varchar(300) DEFAULT NULL,
  XCCYQC varchar(300) DEFAULT NULL,
  MONITORYEAR varchar(36) DEFAULT NULL COMMENT '监测年份--环境质量',
  MONITORMONTH varchar(36) DEFAULT NULL COMMENT '监测月份--污染源、环境质量',
  JCMONTHS varchar(36) DEFAULT NULL COMMENT '监测月份--外委',
  PARENTPROJECTCODE varchar(20) DEFAULT NULL COMMENT '主任务code',
  ISSUBPACKAGE varchar(2) DEFAULT NULL COMMENT '是否分包',
  ISSURE varchar(2) DEFAULT NULL COMMENT '是否提供不确定度',
  ISKEEPSAMPLE varchar(2) DEFAULT NULL COMMENT '是否留样',
  ISUNSTANDARD varchar(2) DEFAULT NULL COMMENT '是否使用非标方法',
  ISCONTAINER varchar(2) DEFAULT NULL COMMENT '是否返回容器',
  FEEPAY varchar(10) DEFAULT NULL COMMENT '交付方式',
  REPORTNUM varchar(4) DEFAULT NULL COMMENT '报告份数',
  DETECTIONFEE varchar(20) DEFAULT NULL COMMENT '检测费用',
  PAYMENTTYPE varchar(20) DEFAULT NULL COMMENT '交付方式',
  MONITORENTID varchar(200) DEFAULT NULL COMMENT '监测企业id',
  MONITORENTNAME varchar(200) DEFAULT NULL COMMENT '监测企业名称',
  COMPLETIONTYPE varchar(2) DEFAULT NULL COMMENT '完成日期类别',
  COMPLETIONINFO varchar(20) DEFAULT NULL COMMENT '完成日期',
  PROJECTTYPE varchar(5) DEFAULT NULL COMMENT '任务类型  外委—WW、应急—YJ、纠纷—JF、执法—ZF、监察—JC、验收—YS',
  PROJECTSOURCE varchar(5) DEFAULT NULL COMMENT '任务来源  国家—G、省—S、时—Sh',
  PROJECTELEMENT varchar(5) DEFAULT NULL COMMENT '任务要素  地表水—DB、饮用水—YY等',
  NEXTAUDITPERSON varchar(20) DEFAULT NULL COMMENT '下一步审核人',
  REPORTSUBMITDATE varchar(20) DEFAULT NULL COMMENT '数据上报时间',
  REPORTSUBMITTYPE varchar(2) DEFAULT NULL COMMENT '数据上报方式',
  CHECKMAN varchar(20) DEFAULT NULL COMMENT '按委托方|按环保行政主管部门',
  CHECKTYPE varchar(20) DEFAULT NULL COMMENT '监测方案实时监测|监测要求实时监测',
  APPROVEMAN varchar(40) DEFAULT NULL COMMENT '监测站进行现场勘查，按技术规范编制监测方案，方案经双方认可后实施监测|经环保行政主管部门批准后实施监测',
  CONFIRM varchar(22) DEFAULT NULL COMMENT '默认监测站已认证|认可方法',
  CUSTOMREQUEST varchar(40) DEFAULT NULL COMMENT '客户要求的方法',
  INTENTIONITEM varchar(200) DEFAULT NULL COMMENT '意向项目',
  INTENTIONITEMINFO varchar(400) DEFAULT NULL COMMENT '意向项目全称',
  CUSTOMID varchar(20) DEFAULT NULL COMMENT '客户编号',
  AGENTPERSON varchar(20) DEFAULT NULL COMMENT '代理人',
  CHARGEDOCTOR varchar(20) DEFAULT NULL,
  DEALDATE datetime DEFAULT NULL,
  counselor varchar(20) DEFAULT NULL COMMENT '询师咨',
  PRIMARY KEY (PROJECTCODE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目';

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO projects VALUES ('635', '测试1', '100', '2014-08-01 18:07:09', '1', '同意', null, null, null, null, 'deal', null, null, null, null, '123', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '662.0', '现金', '4', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '', '21', '20', '25', '2014-08-03 17:26:08', null);
INSERT INTO projects VALUES ('637', '美容医院1', '100', '2014-08-01 18:07:09', '1', null, null, null, null, null, 'TaskApprove', null, null, null, null, '', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '200.0', null, '4', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '123', '19', '21', '24', null, '27');

-- ----------------------------
-- Table structure for region
-- ----------------------------
DROP TABLE IF EXISTS region;
CREATE TABLE region (
  REGIONCODE varchar(20) NOT NULL COMMENT '区域编码',
  REGIONNAME varchar(50) DEFAULT NULL COMMENT '行政区域名称',
  PARENTREGIONCODE varchar(20) DEFAULT NULL,
  ISUSED varchar(2) DEFAULT NULL,
  PRIMARY KEY (REGIONCODE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='行政区域';

-- ----------------------------
-- Records of region
-- ----------------------------
INSERT INTO region VALUES ('410000', '河南省', '0', '1');
INSERT INTO region VALUES ('410100', '郑州市', '410000', '1');
INSERT INTO region VALUES ('410101', '市辖区', '410100', '1');
INSERT INTO region VALUES ('410102', '中原区', '410100', '1');
INSERT INTO region VALUES ('410103', '二七区', '410100', '1');
INSERT INTO region VALUES ('410104', '管城区', '410100', '1');
INSERT INTO region VALUES ('410105', '金水区', '410100', '1');
INSERT INTO region VALUES ('410106', '上街区', '410100', '1');
INSERT INTO region VALUES ('410108', '惠济区', '410100', '1');
INSERT INTO region VALUES ('410122', '中牟县', '410100', '1');
INSERT INTO region VALUES ('410181', '巩义市', '410100', '1');
INSERT INTO region VALUES ('410182', '荥阳市', '410100', '1');
INSERT INTO region VALUES ('410183', '新密市', '410100', '1');
INSERT INTO region VALUES ('410184', '新郑市', '410100', '1');
INSERT INTO region VALUES ('410185', '登封市', '410100', '1');

-- ----------------------------
-- Table structure for roleinfo
-- ----------------------------
DROP TABLE IF EXISTS roleinfo;
CREATE TABLE roleinfo (
  ROLEID varchar(30) NOT NULL COMMENT '角色编号',
  ROLENAME varchar(100) NOT NULL COMMENT '角色名称',
  ORDERID decimal(8,0) DEFAULT NULL COMMENT '序号',
  ALLOWENDIT decimal(8,0) DEFAULT '1' COMMENT '允许编辑',
  ALLOWDELETE decimal(8,0) DEFAULT '1' COMMENT '允许删除',
  DELETEFLAG char(10) DEFAULT '0' COMMENT '删除标记',
  UPDATEUSERID varchar(50) DEFAULT NULL COMMENT '最后更新用户编号',
  UPDATETIME timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  PRIMARY KEY (ROLEID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色(ROLEINFO)';

-- ----------------------------
-- Records of roleinfo
-- ----------------------------
INSERT INTO roleinfo VALUES ('19', '系统管理员', '19', null, null, null, '100', '2014-02-12 00:00:00');
INSERT INTO roleinfo VALUES ('29', '美容院', '29', null, null, null, '100', '2014-02-12 00:00:00');
INSERT INTO roleinfo VALUES ('30', '美容医院', '30', null, null, null, '100', '2014-02-12 00:00:00');
INSERT INTO roleinfo VALUES ('32', '美容协会', '32', null, null, null, '100', '2014-08-04 13:26:48');

-- ----------------------------
-- Table structure for scale
-- ----------------------------
DROP TABLE IF EXISTS scale;
CREATE TABLE scale (
  SCALECODE varchar(10) NOT NULL COMMENT '企业规模编号',
  SCALENAME varchar(30) NOT NULL COMMENT '企业规模名称',
  PRIMARY KEY (SCALECODE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of scale
-- ----------------------------
INSERT INTO scale VALUES ('0', '其他');
INSERT INTO scale VALUES ('1', '特大型');
INSERT INTO scale VALUES ('2', '大一型');
INSERT INTO scale VALUES ('3', '大二型');
INSERT INTO scale VALUES ('4', '中一型');
INSERT INTO scale VALUES ('5', '中二型');
INSERT INTO scale VALUES ('6', '小型');
INSERT INTO scale VALUES ('7', '微型');

-- ----------------------------
-- Table structure for sequence
-- ----------------------------
DROP TABLE IF EXISTS sequence;
CREATE TABLE sequence (
  SEQUENCETYPE varchar(50) NOT NULL COMMENT '序列类型',
  NEXTVALUE varchar(20) DEFAULT NULL COMMENT '下一序列值',
  INDENTITYVALUE varchar(10) DEFAULT NULL COMMENT '增长值',
  DESCRIPTION varchar(50) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (SEQUENCETYPE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sequence
-- ----------------------------
INSERT INTO sequence VALUES ('SEQ_CERTIFICATEINFO', '10257', '1         ', '上岗证表序列');
INSERT INTO sequence VALUES ('SEQ_CLIENTCONTACTINFO', '1020', '1         ', '客户联系人序列');
INSERT INTO sequence VALUES ('SEQ_CUSTOMINFO', '39', '1         ', '客户表序列');
INSERT INTO sequence VALUES ('SEQ_DEPAR', '25', '1         ', '部门表序列');
INSERT INTO sequence VALUES ('SEQ_DEPARTGROUP', '43', '1', '部门组序列');
INSERT INTO sequence VALUES ('SEQ_Dictionaryinfo', '192', '1', '数据字典信息详情');
INSERT INTO sequence VALUES ('SEQ_EMPLOYEEINFO', '39', '1         ', '人员表序列');
INSERT INTO sequence VALUES ('SEQ_ENTERPRISE', '7', '1', '企业表序列');
INSERT INTO sequence VALUES ('SEQ_INDUSTRY', '1', '1         ', '行业类型序列');
INSERT INTO sequence VALUES ('SEQ_ITEMINFO', '396', '1         ', '项目详细表序列');
INSERT INTO sequence VALUES ('SEQ_MODUEL_RIGHT', '10647', '1         ', '模块权限表序列');
INSERT INTO sequence VALUES ('SEQ_MONITORTYPE', '28', '1         ', '监测类型序列');
INSERT INTO sequence VALUES ('SEQ_POLLUTIONSOURCETYPE', '4', '1         ', '污染源类型序列');
INSERT INTO sequence VALUES ('SEQ_PROJECTATTACHMENT', '157', '1         ', '项目附件的序列');
INSERT INTO sequence VALUES ('SEQ_PROJECTITEM', '4347', '1', '任务项目表');
INSERT INTO sequence VALUES ('SEQ_PROJECTS', '638', '1         ', '监测任务（项目）序列');
INSERT INTO sequence VALUES ('SEQ_REGISTERTYPE', '4', '1         ', '登记注册类型序列');
INSERT INTO sequence VALUES ('SEQ_ROLE', '33', '1         ', '角色表序列');
INSERT INTO sequence VALUES ('SEQ_USER', '150', '1         ', '用户表序列');
INSERT INTO sequence VALUES ('SEQ_USERROLEINFO', '218', '1         ', '用户角色表序列');

-- ----------------------------
-- Table structure for systemlog
-- ----------------------------
DROP TABLE IF EXISTS systemlog;
CREATE TABLE systemlog (
  LOGID varchar(20) NOT NULL COMMENT '日志记录编号',
  OPERATIONUSER varchar(20) DEFAULT NULL COMMENT '操作用户',
  OPERATETIME timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '操作时间',
  MODULEID varchar(30) DEFAULT NULL COMMENT '模块编号',
  OPERATECONTENT varchar(200) DEFAULT NULL COMMENT '操作内容',
  PRIMARY KEY (LOGID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of systemlog
-- ----------------------------
INSERT INTO systemlog VALUES ('1088831215258', '100', '2014-08-08 09:51:28', null, '登录了系统');
INSERT INTO systemlog VALUES ('11248978477646', '100', '2014-08-03 17:54:17', null, '登录了系统');
INSERT INTO systemlog VALUES ('11575998864068', '100', '2014-08-03 17:59:45', null, '登录了系统');
INSERT INTO systemlog VALUES ('12113862278858', '148', '2014-08-03 18:08:42', null, '登录了系统');
INSERT INTO systemlog VALUES ('12657574401456', '100', '2014-08-01 17:42:55', null, '登录了系统');
INSERT INTO systemlog VALUES ('13043272656661', '100', '2014-08-01 17:49:21', null, '注销了系统');
INSERT INTO systemlog VALUES ('1332988960777', '100', '2014-08-08 09:55:32', null, '注销了系统');
INSERT INTO systemlog VALUES ('1340563362836', '148', '2014-08-08 09:55:40', null, '登录了系统');
INSERT INTO systemlog VALUES ('13508358443974', '100', '2014-08-01 17:57:06', null, '登录了系统');
INSERT INTO systemlog VALUES ('13894526750368', '100', '2014-08-01 18:03:32', null, '登录了系统');
INSERT INTO systemlog VALUES ('13949815024018', '100', '2014-08-01 18:04:27', '1501', '增加了用户id为148的记录');
INSERT INTO systemlog VALUES ('14004321027820', '100', '2014-08-01 18:05:22', '1421', '添加了字典详情编号为12的记录');
INSERT INTO systemlog VALUES ('14007780448323', '100', '2014-08-01 18:05:25', '1421', '删除了编号为191的记录');
INSERT INTO systemlog VALUES ('14013155211704', '100', '2014-08-01 18:05:31', '1421', '删除了编号为12的记录');
INSERT INTO systemlog VALUES ('14022650415682', '100', '2014-08-01 18:05:40', '1401', '删除了企业id为46的记录');
INSERT INTO systemlog VALUES ('14031343728511', '100', '2014-08-01 18:05:49', '1401', '添加了企业id为的记录');
INSERT INTO systemlog VALUES ('14035494064345', '100', '2014-08-01 18:05:53', '1401', '删除了企业id为的记录');
INSERT INTO systemlog VALUES ('14111808536816', '100', '2014-08-01 18:07:09', '0101', '添加了任务编码为637的记录');
INSERT INTO systemlog VALUES ('14117592617102', '100', '2014-08-01 18:07:15', '0101', '删除了任务编码为636的记录');
INSERT INTO systemlog VALUES ('14193640955008', '100', '2014-08-01 18:08:31', null, '登录了系统');
INSERT INTO systemlog VALUES ('154203852555907', '148', '2014-08-05 09:36:52', null, '登录了系统');
INSERT INTO systemlog VALUES ('158608987237087', '148', '2014-08-05 10:50:17', null, '登录了系统');
INSERT INTO systemlog VALUES ('158609505409941', '148', '2014-08-05 10:50:18', null, '登录了系统');
INSERT INTO systemlog VALUES ('159041319653711', '148', '2014-08-05 10:57:30', null, '注销了系统');
INSERT INTO systemlog VALUES ('159048280846886', '100', '2014-08-05 10:57:37', null, '登录了系统');
INSERT INTO systemlog VALUES ('210175896839719', '149', '2014-08-10 19:56:15', null, '登录了系统');
INSERT INTO systemlog VALUES ('210196519358255', '149', '2014-08-10 19:56:36', null, '注销了系统');
INSERT INTO systemlog VALUES ('210205440782721', '100', '2014-08-10 19:56:45', null, '登录了系统');
INSERT INTO systemlog VALUES ('210404606827978', '100', '2014-08-10 20:00:04', null, '注销了系统');
INSERT INTO systemlog VALUES ('210410313030716', '148', '2014-08-10 20:00:10', null, '登录了系统');
INSERT INTO systemlog VALUES ('210454983912868', '148', '2014-08-10 20:00:54', null, '注销了系统');
INSERT INTO systemlog VALUES ('210458840322103', '100', '2014-08-10 20:00:58', null, '登录了系统');
INSERT INTO systemlog VALUES ('210629404520374', '100', '2014-08-10 20:03:49', null, '注销了系统');
INSERT INTO systemlog VALUES ('210636384624321', '149', '2014-08-10 20:03:56', null, '登录了系统');
INSERT INTO systemlog VALUES ('213171736117018', '100', '2014-08-10 20:46:11', null, '登录了系统');
INSERT INTO systemlog VALUES ('213186618255154', '100', '2014-08-10 20:46:26', null, '注销了系统');
INSERT INTO systemlog VALUES ('213189554446478', '100', '2014-08-10 20:46:29', null, '登录了系统');
INSERT INTO systemlog VALUES ('213387215116221', '100', '2014-08-10 20:49:47', null, '注销了系统');
INSERT INTO systemlog VALUES ('213421654162390', '100', '2014-08-10 20:50:21', null, '登录了系统');
INSERT INTO systemlog VALUES ('22926492516811', '148', '2014-08-08 15:55:26', null, '登录了系统');
INSERT INTO systemlog VALUES ('23634914807090', '148', '2014-08-08 16:07:14', null, '登录了系统');
INSERT INTO systemlog VALUES ('23785935926120', '100', '2014-08-08 16:09:45', null, '登录了系统');
INSERT INTO systemlog VALUES ('23789978609197', '100', '2014-08-08 16:09:49', null, '注销了系统');
INSERT INTO systemlog VALUES ('23794895973085', '148', '2014-08-08 16:09:54', null, '登录了系统');
INSERT INTO systemlog VALUES ('23875766455789', '148', '2014-08-08 16:11:15', null, '登录了系统');
INSERT INTO systemlog VALUES ('2481338093732', '100', '2014-08-08 10:14:41', null, '登录了系统');
INSERT INTO systemlog VALUES ('254672355575753', '100', '2014-08-06 13:31:21', null, '登录了系统');
INSERT INTO systemlog VALUES ('254743646582803', '100', '2014-08-06 13:32:32', null, '登录了系统');
INSERT INTO systemlog VALUES ('254798365632463', '100', '2014-08-06 13:33:27', null, '注销了系统');
INSERT INTO systemlog VALUES ('254813448570253', '100', '2014-08-06 13:33:42', null, '登录了系统');
INSERT INTO systemlog VALUES ('255064416491165', '100', '2014-08-06 13:37:53', null, '登录了系统');
INSERT INTO systemlog VALUES ('255374151838797', '100', '2014-08-06 13:43:03', null, '登录了系统');
INSERT INTO systemlog VALUES ('255402980708867', '100', '2014-08-06 13:43:31', null, '登录了系统');
INSERT INTO systemlog VALUES ('256371384996670', '100', '2014-08-06 13:59:40', null, '登录了系统');
INSERT INTO systemlog VALUES ('256455785846710', '100', '2014-08-06 14:01:04', null, '登录了系统');
INSERT INTO systemlog VALUES ('256666770914156', '100', '2014-08-06 14:04:35', null, '登录了系统');
INSERT INTO systemlog VALUES ('257208911161688', '100', '2014-08-06 14:13:37', null, '登录了系统');
INSERT INTO systemlog VALUES ('257276603311074', '100', '2014-08-06 14:14:45', null, '登录了系统');
INSERT INTO systemlog VALUES ('257811412099334', '100', '2014-08-06 14:23:40', null, '登录了系统');
INSERT INTO systemlog VALUES ('259238879985762', '100', '2014-08-06 14:47:27', null, '登录了系统');
INSERT INTO systemlog VALUES ('259311264151524', '100', '2014-08-06 14:48:40', null, '注销了系统');
INSERT INTO systemlog VALUES ('259315863542054', '100', '2014-08-06 14:48:44', null, '登录了系统');
INSERT INTO systemlog VALUES ('259391582388913', '100', '2014-08-06 14:50:00', '1402', '删除了编号为的记录');
INSERT INTO systemlog VALUES ('273956051896660', '100', '2014-08-11 13:39:16', null, '登录了系统');
INSERT INTO systemlog VALUES ('275421642791457', '100', '2014-08-11 14:03:41', null, '登录了系统');
INSERT INTO systemlog VALUES ('275799781280122', '100', '2014-08-11 14:09:59', null, '注销了系统');
INSERT INTO systemlog VALUES ('275805092888343', '148', '2014-08-11 14:10:05', null, '登录了系统');
INSERT INTO systemlog VALUES ('2891090913270', '100', '2014-08-08 10:21:31', null, '登录了系统');
INSERT INTO systemlog VALUES ('364006551548118', '100', '2014-08-12 14:40:06', null, '登录了系统');
INSERT INTO systemlog VALUES ('367848989912392', '148', '2014-08-12 15:44:08', null, '登录了系统');
INSERT INTO systemlog VALUES ('367866084044239', '148', '2014-08-12 15:44:26', null, '注销了系统');
INSERT INTO systemlog VALUES ('367871098013432', '100', '2014-08-12 15:44:31', null, '登录了系统');
INSERT INTO systemlog VALUES ('368097307169952', '100', '2014-08-12 15:48:17', null, '登录了系统');
INSERT INTO systemlog VALUES ('368128763843570', '100', '2014-08-12 15:48:48', null, '注销了系统');
INSERT INTO systemlog VALUES ('368988518671023', '100', '2014-08-12 16:03:08', null, '登录了系统');
INSERT INTO systemlog VALUES ('372345028717988', '100', '2014-08-12 16:59:05', null, '登录了系统');
INSERT INTO systemlog VALUES ('3908617957928', '100', '2014-08-08 10:38:28', null, '注销了系统');
INSERT INTO systemlog VALUES ('3914031366334', '149', '2014-08-08 10:38:34', null, '登录了系统');
INSERT INTO systemlog VALUES ('4029438360579', '149', '2014-08-08 10:40:29', null, '注销了系统');
INSERT INTO systemlog VALUES ('4040480964833', '100', '2014-08-08 10:40:40', null, '登录了系统');
INSERT INTO systemlog VALUES ('4069676860739', '100', '2014-08-08 10:41:09', null, '注销了系统');
INSERT INTO systemlog VALUES ('4073505109899', '148', '2014-08-08 10:41:13', null, '登录了系统');
INSERT INTO systemlog VALUES ('4465889021536', '100', '2014-08-08 10:47:45', null, '登录了系统');
INSERT INTO systemlog VALUES ('4478529164648', '100', '2014-08-08 10:47:58', null, '注销了系统');
INSERT INTO systemlog VALUES ('4488242731519', '148', '2014-08-08 10:48:08', null, '登录了系统');
INSERT INTO systemlog VALUES ('4570491359930', '148', '2014-08-08 10:49:30', null, '注销了系统');
INSERT INTO systemlog VALUES ('4575028020083', '100', '2014-08-08 10:49:35', null, '登录了系统');
INSERT INTO systemlog VALUES ('4841122710664', '100', '2014-08-08 10:54:01', null, '登录了系统');
INSERT INTO systemlog VALUES ('5111039008399', '100', '2014-08-08 10:58:31', null, '注销了系统');
INSERT INTO systemlog VALUES ('5116876488386', '148', '2014-08-08 10:58:36', null, '登录了系统');
INSERT INTO systemlog VALUES ('5483393472026', '100', '2014-08-03 16:18:12', null, '?????');
INSERT INTO systemlog VALUES ('5538659108020', '100', '2014-08-03 16:19:07', null, '?????');
INSERT INTO systemlog VALUES ('5730845700086', '100', '2014-08-03 16:22:19', null, '?????');
INSERT INTO systemlog VALUES ('5735022901318', '148', '2014-08-03 16:22:24', null, '?????');
INSERT INTO systemlog VALUES ('5740139729034', '148', '2014-08-03 16:22:29', null, '?????');
INSERT INTO systemlog VALUES ('5744748372460', '100', '2014-08-03 16:22:33', null, '?????');
INSERT INTO systemlog VALUES ('5773701916263', '100', '2014-08-03 16:23:02', null, '?????');
INSERT INTO systemlog VALUES ('5777149895356', '148', '2014-08-03 16:23:06', null, '?????');
INSERT INTO systemlog VALUES ('6060246939479', '148', '2014-08-08 11:14:20', null, '注销了系统');
INSERT INTO systemlog VALUES ('6065190875501', '100', '2014-08-08 11:14:25', null, '登录了系统');
INSERT INTO systemlog VALUES ('6298573516166', '148', '2014-08-03 16:31:47', null, '?????');
INSERT INTO systemlog VALUES ('6552020222837', '100', '2014-08-08 11:22:32', null, '注销了系统');
INSERT INTO systemlog VALUES ('6555755321323', '148', '2014-08-08 11:22:35', null, '登录了系统');
INSERT INTO systemlog VALUES ('6911834150284', '148', '2014-08-03 16:42:00', null, '登录了系统');
INSERT INTO systemlog VALUES ('7639943628533', '100', '2014-08-08 11:40:39', null, '登录了系统');
INSERT INTO systemlog VALUES ('7958646250195', '100', '2014-08-08 11:45:58', null, '注销了系统');
INSERT INTO systemlog VALUES ('7963840516696', '148', '2014-08-08 11:46:03', null, '登录了系统');
INSERT INTO systemlog VALUES ('81567966958634', '100', '2014-08-04 13:26:16', null, '登录了系统');
INSERT INTO systemlog VALUES ('81568052782847', '100', '2014-08-04 13:26:17', null, '登录了系统');
INSERT INTO systemlog VALUES ('81645217820879', '100', '2014-08-02 12:52:43', null, '登录了系统');
INSERT INTO systemlog VALUES ('81691617458698', '100', '2014-08-04 13:28:20', '1501', '增加了用户id为149的记录');
INSERT INTO systemlog VALUES ('81714198484658', '100', '2014-08-04 13:28:43', null, '注销了系统');
INSERT INTO systemlog VALUES ('81721952286354', '149', '2014-08-04 13:28:50', null, '登录了系统');
INSERT INTO systemlog VALUES ('82011759213690', '149', '2014-08-04 13:33:40', null, '注销了系统');
INSERT INTO systemlog VALUES ('82017934979305', '149', '2014-08-04 13:33:46', null, '登录了系统');
INSERT INTO systemlog VALUES ('82159103028631', '149', '2014-08-04 13:36:08', null, '登录了系统');
INSERT INTO systemlog VALUES ('82264764146187', '149', '2014-08-04 13:37:53', null, '注销了系统');
INSERT INTO systemlog VALUES ('82271247662657', '149', '2014-08-04 13:38:00', null, '登录了系统');
INSERT INTO systemlog VALUES ('82313004092145', '149', '2014-08-04 13:38:41', null, '注销了系统');
INSERT INTO systemlog VALUES ('82460227072202', '100', '2014-08-04 13:41:09', null, '登录了系统');
INSERT INTO systemlog VALUES ('82466188078177', '100', '2014-08-04 13:41:15', null, '注销了系统');
INSERT INTO systemlog VALUES ('82473438848533', '149', '2014-08-04 13:41:22', null, '登录了系统');
INSERT INTO systemlog VALUES ('82789601675940', '149', '2014-08-04 13:46:38', null, '登录了系统');
INSERT INTO systemlog VALUES ('82917857173940', '149', '2014-08-04 13:48:46', null, '登录了系统');
INSERT INTO systemlog VALUES ('82973762748749', '149', '2014-08-04 13:49:42', null, '登录了系统');
INSERT INTO systemlog VALUES ('83517892783159', '149', '2014-08-04 13:58:46', null, '登录了系统');
INSERT INTO systemlog VALUES ('84410222560086', '149', '2014-08-04 14:13:39', null, '登录了系统');
INSERT INTO systemlog VALUES ('84452881917708', '149', '2014-08-04 14:14:21', null, '登录了系统');
INSERT INTO systemlog VALUES ('84509575712081', '149', '2014-08-04 14:15:18', null, '注销了系统');
INSERT INTO systemlog VALUES ('84514620288059', '100', '2014-08-04 14:15:23', null, '登录了系统');
INSERT INTO systemlog VALUES ('862537851281682', '100', '2014-08-18 09:08:57', null, '登录了系统');
INSERT INTO systemlog VALUES ('862660450525892', '100', '2014-08-18 09:11:00', null, '登录了系统');
INSERT INTO systemlog VALUES ('863027383738802', '100', '2014-08-18 09:17:07', null, '登录了系统');
INSERT INTO systemlog VALUES ('863088655891553', '100', '2014-08-18 09:18:08', null, '登录了系统');
INSERT INTO systemlog VALUES ('863532839125401', '100', '2014-08-18 09:25:32', null, '登录了系统');
INSERT INTO systemlog VALUES ('86525704978804', '148', '2014-08-04 14:48:54', null, '登录了系统');
INSERT INTO systemlog VALUES ('86619978452193', '148', '2014-08-04 14:50:28', null, '注销了系统');
INSERT INTO systemlog VALUES ('86632052651478', '148', '2014-08-04 14:50:41', null, '登录了系统');
INSERT INTO systemlog VALUES ('86705316915077', '148', '2014-08-04 14:51:54', null, '登录了系统');
INSERT INTO systemlog VALUES ('86739542482283', '148', '2014-08-04 14:52:28', null, '登录了系统');
INSERT INTO systemlog VALUES ('8674852695487', '100', '2014-08-03 17:11:23', null, '登录了系统');
INSERT INTO systemlog VALUES ('867526484217838', '100', '2014-07-31 16:48:50', null, '登录了系统');
INSERT INTO systemlog VALUES ('867540543516252', '100', '2014-07-31 16:49:04', '1501', '修改了用户id为9的记录');
INSERT INTO systemlog VALUES ('867549643114221', '100', '2014-07-31 16:49:13', '1501', '修改了用户id为9的记录');
INSERT INTO systemlog VALUES ('8681278759761', '100', '2014-08-03 17:11:30', null, '注销了系统');
INSERT INTO systemlog VALUES ('868305149874193', '100', '2014-07-31 17:01:49', null, '登录了系统');
INSERT INTO systemlog VALUES ('8684799504985', '148', '2014-08-03 17:11:33', null, '登录了系统');
INSERT INTO systemlog VALUES ('86993842168311', '148', '2014-08-04 14:56:42', null, '登录了系统');
INSERT INTO systemlog VALUES ('87050957813296', '148', '2014-08-04 14:57:39', null, '登录了系统');
INSERT INTO systemlog VALUES ('9097387055059', '148', '2014-08-03 17:18:26', null, '登录了系统');
INSERT INTO systemlog VALUES ('9101812374685', '100', '2014-08-02 21:00:32', null, '?????');
INSERT INTO systemlog VALUES ('92991506677241', '100', '2014-08-04 16:36:40', null, '登录了系统');
INSERT INTO systemlog VALUES ('93540569855896', '100', '2014-08-04 16:45:49', null, '登录了系统');
INSERT INTO systemlog VALUES ('93672159690970', '100', '2014-08-04 16:48:01', null, '登录了系统');
INSERT INTO systemlog VALUES ('93747968975149', '100', '2014-08-04 16:49:16', null, '注销了系统');
INSERT INTO systemlog VALUES ('93759122012688', '100', '2014-08-04 16:49:28', null, '登录了系统');
INSERT INTO systemlog VALUES ('93875737912201', '100', '2014-08-04 16:51:24', '1401', '添加了企业id为的记录');
INSERT INTO systemlog VALUES ('93964345382337', '100', '2014-08-04 16:52:53', null, '注销了系统');
INSERT INTO systemlog VALUES ('93969661662327', '148', '2014-08-04 16:52:58', null, '登录了系统');
INSERT INTO systemlog VALUES ('9565440954734', '100', '2014-08-08 12:12:45', null, '登录了系统');
INSERT INTO systemlog VALUES ('9628813741348', '100', '2014-08-08 12:13:48', null, '登录了系统');
INSERT INTO systemlog VALUES ('97328603595981', '100', '2014-08-04 17:48:57', null, '登录了系统');
INSERT INTO systemlog VALUES ('97330477480062', '100', '2014-08-04 17:48:59', null, '登录了系统');
INSERT INTO systemlog VALUES ('97354437476548', '100', '2014-08-04 17:49:23', null, '注销了系统');
INSERT INTO systemlog VALUES ('97366341931847', '100', '2014-08-04 17:49:35', null, '登录了系统');
INSERT INTO systemlog VALUES ('97557053703662', '100', '2014-08-04 17:52:46', '1401', '添加了企业id为的记录');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS userinfo;
CREATE TABLE userinfo (
  USERID varchar(30) NOT NULL COMMENT '用户编号',
  DEPTID varchar(20) DEFAULT NULL COMMENT '部门编号',
  LOGINNAME varchar(50) NOT NULL COMMENT '用户登录名',
  PASSWORD varchar(50) NOT NULL COMMENT '用户密码',
  REALNAME varchar(50) NOT NULL COMMENT '姓名',
  SEX varchar(50) DEFAULT NULL COMMENT '性别',
  EMAIL varchar(100) DEFAULT NULL COMMENT 'EMAIL',
  LINKPHONE varchar(20) DEFAULT NULL COMMENT '电话',
  FAX varchar(20) DEFAULT NULL COMMENT '传真',
  MOBILEPHONE varchar(50) DEFAULT NULL COMMENT '手机',
  PHOTO varchar(500) DEFAULT NULL COMMENT '照片',
  SIGNPICTURE longblob COMMENT '电子签章图片',
  USERSTATUS varchar(2) DEFAULT NULL COMMENT '用户状态（1为正常、0为注销）',
  LASTLOGINTIME datetime DEFAULT NULL COMMENT '最后登录时间',
  CLIENTIP varchar(20) DEFAULT NULL,
  MANAGEDEPTS varchar(200) DEFAULT NULL COMMENT '分管部门',
  CREATEBY varchar(50) DEFAULT NULL COMMENT '创建人',
  CREATETIME datetime DEFAULT NULL COMMENT '创建时间',
  ORDERID decimal(8,0) DEFAULT NULL COMMENT '序号',
  PROJECTLEADER char(1) DEFAULT NULL COMMENT '是否是项目负责人（是为1，不是为0）',
  NICKNAME varchar(30) DEFAULT NULL COMMENT '简称',
  ENTID varchar(30) DEFAULT NULL COMMENT '所属企业',
  PRIMARY KEY (USERID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户(USERINFO)';

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO userinfo VALUES ('100', '4', 'admin', 'admin', '系统管理员', '男', '11', '11', '11', '11', null, 0x3C424C4F423E, '1', null, null, null, null, null, null, null, 'nick', '1');
INSERT INTO userinfo VALUES ('146', null, 'test2', '11', '美容医院1', '男', '11', '11', '11', '11', null, 0x3C424C4F423E, '1', null, null, null, null, '2014-07-28 00:00:00', '11', null, null, '4');
INSERT INTO userinfo VALUES ('147', null, 'test1', '11', '美容院1', '男', '11', '11', '11', '11', null, 0x3C424C4F423E, '1', null, null, null, null, '2014-07-28 00:00:00', '11', null, null, '2');
INSERT INTO userinfo VALUES ('148', null, 'test', 'test', 'test', '男', '', '', '', '', '', null, '1', null, null, null, null, '2014-08-01 18:04:27', null, null, null, '4');
INSERT INTO userinfo VALUES ('149', null, 'xiehui', 'xiehui', '协会', '男', '', '', '', '', '', null, '1', null, null, null, null, '2014-08-04 13:28:20', null, null, null, '5');
INSERT INTO userinfo VALUES ('9', '18', '张秀英', '123', '张秀英', '男', '11', '11', '11', '11', null, 0x3C424C4F423E, '1', null, null, null, null, null, null, '0', 'nick', '2');

-- ----------------------------
-- Table structure for userroleinfo
-- ----------------------------
DROP TABLE IF EXISTS userroleinfo;
CREATE TABLE userroleinfo (
  ID decimal(8,0) NOT NULL,
  USERID varchar(30) DEFAULT NULL COMMENT '用户编号',
  ROLEID varchar(30) DEFAULT NULL COMMENT '角色编号',
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userroleinfo
-- ----------------------------
INSERT INTO userroleinfo VALUES ('33', '49', '13');
INSERT INTO userroleinfo VALUES ('34', '50', '13');
INSERT INTO userroleinfo VALUES ('38', '2', '02');
INSERT INTO userroleinfo VALUES ('40', '4', '03');
INSERT INTO userroleinfo VALUES ('43', '7', '04');
INSERT INTO userroleinfo VALUES ('44', '7', '16');
INSERT INTO userroleinfo VALUES ('45', '12', '18');
INSERT INTO userroleinfo VALUES ('47', '13', '05');
INSERT INTO userroleinfo VALUES ('48', '14', '05');
INSERT INTO userroleinfo VALUES ('49', '16', '11');
INSERT INTO userroleinfo VALUES ('50', '15', '11');
INSERT INTO userroleinfo VALUES ('52', '18', '12');
INSERT INTO userroleinfo VALUES ('53', '18', '06');
INSERT INTO userroleinfo VALUES ('54', '17', '06');
INSERT INTO userroleinfo VALUES ('55', '17', '12');
INSERT INTO userroleinfo VALUES ('60', '21', '12');
INSERT INTO userroleinfo VALUES ('61', '22', '12');
INSERT INTO userroleinfo VALUES ('62', '23', '12');
INSERT INTO userroleinfo VALUES ('64', '25', '12');
INSERT INTO userroleinfo VALUES ('65', '26', '12');
INSERT INTO userroleinfo VALUES ('67', '28', '07');
INSERT INTO userroleinfo VALUES ('68', '28', '12');
INSERT INTO userroleinfo VALUES ('75', '35', '08');
INSERT INTO userroleinfo VALUES ('76', '36', '20');
INSERT INTO userroleinfo VALUES ('77', '37', '10');
INSERT INTO userroleinfo VALUES ('78', '38', '10');
INSERT INTO userroleinfo VALUES ('79', '39', '10');
INSERT INTO userroleinfo VALUES ('80', '40', '09');
INSERT INTO userroleinfo VALUES ('83', '43', '13');
INSERT INTO userroleinfo VALUES ('84', '44', '13');
INSERT INTO userroleinfo VALUES ('85', '45', '13');
INSERT INTO userroleinfo VALUES ('86', '46', '13');
INSERT INTO userroleinfo VALUES ('87', '47', '13');
INSERT INTO userroleinfo VALUES ('88', '48', '13');
INSERT INTO userroleinfo VALUES ('89', '51', '13');
INSERT INTO userroleinfo VALUES ('90', '52', '13');
INSERT INTO userroleinfo VALUES ('91', '53', '13');
INSERT INTO userroleinfo VALUES ('92', '54', '13');
INSERT INTO userroleinfo VALUES ('93', '55', '13');
INSERT INTO userroleinfo VALUES ('94', '29', '07');
INSERT INTO userroleinfo VALUES ('95', '29', '12');
INSERT INTO userroleinfo VALUES ('96', '29', '13');
INSERT INTO userroleinfo VALUES ('97', '5', '03');
INSERT INTO userroleinfo VALUES ('98', '5', '13');
INSERT INTO userroleinfo VALUES ('102', '31', '12');
INSERT INTO userroleinfo VALUES ('103', '31', '13');
INSERT INTO userroleinfo VALUES ('104', '32', '12');
INSERT INTO userroleinfo VALUES ('105', '32', '13');
INSERT INTO userroleinfo VALUES ('108', '20', '09');
INSERT INTO userroleinfo VALUES ('109', '20', '12');
INSERT INTO userroleinfo VALUES ('110', '20', '13');
INSERT INTO userroleinfo VALUES ('111', '41', '09');
INSERT INTO userroleinfo VALUES ('112', '41', '13');
INSERT INTO userroleinfo VALUES ('115', '42', '09');
INSERT INTO userroleinfo VALUES ('116', '42', '13');
INSERT INTO userroleinfo VALUES ('117', '19', '06');
INSERT INTO userroleinfo VALUES ('118', '19', '12');
INSERT INTO userroleinfo VALUES ('119', '19', '13');
INSERT INTO userroleinfo VALUES ('120', '24', '12');
INSERT INTO userroleinfo VALUES ('121', '24', '13');
INSERT INTO userroleinfo VALUES ('125', '33', '12');
INSERT INTO userroleinfo VALUES ('126', '33', '13');
INSERT INTO userroleinfo VALUES ('127', '30', '12');
INSERT INTO userroleinfo VALUES ('128', '30', '13');
INSERT INTO userroleinfo VALUES ('142', '1', '01');
INSERT INTO userroleinfo VALUES ('143', '1', '13');
INSERT INTO userroleinfo VALUES ('146', '3', '03');
INSERT INTO userroleinfo VALUES ('152', '34', '08');
INSERT INTO userroleinfo VALUES ('153', '34', '13');
INSERT INTO userroleinfo VALUES ('154', '27', '04');
INSERT INTO userroleinfo VALUES ('157', '6', '04');
INSERT INTO userroleinfo VALUES ('158', '105', '12');
INSERT INTO userroleinfo VALUES ('159', '11', '06');
INSERT INTO userroleinfo VALUES ('163', '110', '01');
INSERT INTO userroleinfo VALUES ('164', '110', '02');
INSERT INTO userroleinfo VALUES ('172', '111', '01');
INSERT INTO userroleinfo VALUES ('173', '111', '03');
INSERT INTO userroleinfo VALUES ('174', '111', '26');
INSERT INTO userroleinfo VALUES ('213', '100', '19');
INSERT INTO userroleinfo VALUES ('214', '147', '29');
INSERT INTO userroleinfo VALUES ('215', '146', '30');
INSERT INTO userroleinfo VALUES ('216', '148', '30');
INSERT INTO userroleinfo VALUES ('217', '149', '32');


-----zhangcd  2014.8.23 添加医美版本模块管理
INSERT INTO moduleinfo VALUES ('1405', '医美版本管理', '14', '1', '/beauty/beautyversion/beautyversion!list.action', null,null, null);
INSERT INTO moduleright VALUES ('10647', '19', '1405');

-----zhangcd  2014.8.24 添加企业广告图片管理
INSERT INTO moduleinfo VALUES ('1406', '企业广告图片', '14', '1', '/beauty/advertinfo/advertinfo!list.action', null,null, null);
INSERT INTO moduleright VALUES ('10648', '19', '1406');































