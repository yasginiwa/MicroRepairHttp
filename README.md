# MicroRepairHttp
微检修NodeJS API服务器

mysql数据库 hgdb

//  主数据表
CREATE TABLE `t_repair` (
  `r_id` int(11) NOT NULL AUTO_INCREMENT,
  `deviceId` varchar(50) NOT NULL,
  `cate` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL,
  `audioDesc` varchar(255) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `engineer` varchar(255) NOT NULL,
  PRIMARY KEY (`r_id`)
)

//  主用户表
CREATE TABLE `t_authUsers` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  PRIMARY KEY (`u_id`)
)