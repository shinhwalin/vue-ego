`project`SELECT * ,(SELECT COUNT(*) FROM project) AS total FROM project WHERE 1=1  ORDER BY id LIMIT 5 OFFSET 66
SELECT * FROM project WHERE 1=1  ORDER BY id


SELECT * ,(SELECT COUNT(*) FROM project) "listSize" FROM project WHERE 1=1 ORDER BY id LIMIT 8 OFFSET 0





INSERT INTO project(            
title,         
image ,        
sellPoint ,    
price ,        
cid   ,        
category  ,    
num    ,       
barcode  ,     
STATUS  ,      
created  ,     
updated  ,     
descs   ,      
paramsInfo)VALUE(
'测试1',
'1',
'1',
'1',
'1',
'1',
'1',
'1',
'1',
'1',
'1',
'1',
'1'
)  

SELECT * FROM project WHERE 1=1 AND TITLE LIKE '%' || 44 || '%' ORDER BY id LIMIT 0 OFFSET 8

SELECT * FROM project WHERE 1=1 AND TITLE LIKE CONCAT('%',44,'%') ORDER BY id LIMIT 8 OFFSET 0

`project``descs``descs`

SELECT * FROM project  WHERE STATUS = '1'
SELECT * FROM project ORDER BY id DESC


SELECT * FROM sjz_assets_status

INSERT INTO `vue-ego`.`sjz_assets_status` (`status_code`, `status_desc`) VALUES ('01', '状态1')


CREATE TABLE `sjz_assets_status` (
  `id` INT(11) NOT NULL,
  `status_code` TEXT NOT NULL,
  `status_desc` TEXT NOT NULL
) ENGINE=INNODB DEFAULT CHARSET=utf8;

ALTER TABLE `sjz_assets_status`
  ADD PRIMARY KEY (`id`);
  
  ALTER TABLE `sjz_assets_status`
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
  

