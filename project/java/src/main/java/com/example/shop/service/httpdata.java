package com.example.shop.service;
import java.sql.PreparedStatement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.example.shop.contrl.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.util.Collections;

import java.sql.Statement;


import java.util.*;

@RestController
public class httpdata {
        @Autowired
        JdbcTemplate jdbcTemplate;
        private Userdata userdata;


        private Listdata listdata;

        private Level level;

        private Leveldetail leveldetail;

        private Moviedata moviedata;


    @PostMapping("/api3/insertlistdata")
    public Object insertlistdata(@RequestBody Listdata listdata) {
        LocalDateTime currentTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedTime = currentTime.format(formatter);
         String datetime1 = listdata.getDatetime1();
         String datetime2 = listdata.getDatetime2();
         String datetime3 = listdata.getDatetime3();
         String userid = listdata.getUserid();
         String field1 = listdata.getField1();
         String field2 = listdata.getField2();
         String field3 = listdata.getField3();
         String field4 = listdata.getField4();
         String field5 = listdata.getField5();
         String field6 = listdata.getField6();
         String field7 = listdata.getField7();
         String typestr = listdata.getTypestr();
         String typesubstr = listdata.getTypesubstr();
         String userid2 = listdata.getUserid2();
         String trans_pic1 = listdata.getTrans_pic1();
         String trans_pic2 = listdata.getTrans_pic2();
         String status = listdata.getStatus();
         String userid3 = listdata.getUserid3();
        jdbcTemplate.update("insert into listdata(userid3,datetime1,datetime2,datetime3,userid,field1,field2,field3,field4,field5,field6,field7,typestr,typesubstr,userid2,trans_pic1,trans_pic2,status) " +
                "values (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", userid3,formattedTime,datetime2,datetime3,userid,field1,field2,field3,field4,field5,field6,field7,typestr,typesubstr,userid2,trans_pic1,trans_pic2,status);

        return "success";
    }

    @PostMapping("/api3/updatelistdata")
    public Object updatelistdata(@RequestBody Listdata listdata) {
        int id = listdata.getId();
        String datetime1 = listdata.getDatetime1();
        String datetime2 = listdata.getDatetime2();
        String datetime3 = listdata.getDatetime3();
        String userid = listdata.getUserid();
        String field1 = listdata.getField1();
        String field2 = listdata.getField2();
        String field3 = listdata.getField3();
        String field4 = listdata.getField4();
        String field5 = listdata.getField5();
        String field6 = listdata.getField6();
        String field7 = listdata.getField7();
        String typestr = listdata.getTypestr();
        String typesubstr = listdata.getTypesubstr();
        String userid2 = listdata.getUserid2();
        String trans_pic1 = listdata.getTrans_pic1();
        String trans_pic2 = listdata.getTrans_pic2();
        String status = listdata.getStatus();
        String userid3 = listdata.getUserid3();
        String sql = "update listdata set userid3=?, datetime1=?,datetime2=?,datetime3=?,userid=?,field1=?,field2=?,field3=?,field4=?,field5=?,field6=?,field7=?,typestr=?,typesubstr=?,userid2=?,trans_pic1=?,trans_pic2=?,status=? where id=?";
        jdbcTemplate.update(sql,userid3,datetime1,datetime2,datetime3,userid,field1,field2,field3,field4,field5,field6,field7,typestr,typesubstr,userid2,trans_pic1,trans_pic2,status, id);
        return "ok";
    }







    @PostMapping("/api3/querylistdata")
    public List<Map<String, Object>> querylistdata(@RequestBody Listdata listdata) {
        String field1 = listdata.getField1();
        String typestr = listdata.getTypestr();
        String status = listdata.getStatus();
        String userid = listdata.getUserid();
        String typesubstr = listdata.getTypesubstr();
        String sql = "select a.*,b.userName as userName1,c.userName as userName2,d.userName as userName3 from listdata a " +
                "left join userdata b on a.userid = b.id " +
                "left join userdata c on a.userid2 = c.id " +
                "left join userdata d on a.userid3 = d.id " +
                "where a.id > 0 ";
        List<Object> params = new ArrayList<>();
        if (field1 != null && !field1.isEmpty()) {
            sql += " and a.field1 LIKE ?";
            params.add("%" + field1 + "%");
        }
        if (typestr != null && !typestr.isEmpty()) {
            sql += " and a.typestr = ?";
            params.add(typestr);
        }
        if (typesubstr != null && !typesubstr.isEmpty()) {
            sql += " and a.typesubstr = ?";
            params.add(typesubstr);
        }
        if (status != null && !status.isEmpty()) {
            sql += " and a.status = ?";
            params.add(status);
        }
        if (userid != null && !userid.isEmpty()) {
            sql += " and a.userid = ?";
            params.add(userid);
        }
        sql += " ORDER BY a.datetime1 DESC";

        List<Map<String, Object>> list_maps = jdbcTemplate.queryForList(sql, params.toArray());
        return list_maps;
    }



    @PostMapping("/api3/listdataremove")
    public Object listdataremove(@RequestBody Listdata listdata) {
        int id = listdata.getId();
        String sql = "delete from listdata where id = " + id;
        jdbcTemplate.update(sql);
        return "ok";
    }


    @PostMapping("/api3/selectjxquery")
    public List<Map<String, Object>> selectjxquery(@RequestBody Moviedata moviedata) {
        String userid = moviedata.getUserid();
        String datestr = moviedata.getDatestr();
        String sql = "SELECT * FROM moviedata WHERE userid = ? and datestr = ? ";
        List<Map<String, Object>> list_maps = jdbcTemplate.queryForList(sql,userid,datestr);
        return list_maps;
    }




    @PostMapping("/api3/addwenjuandata")
    public Object addwenjuandata(@RequestBody Moviedata moviedata) {
        String userid= moviedata.getUserid();
        String datestr= moviedata.getDatestr();
        String datetime= moviedata.getDatetime();
        String result1 = moviedata.getResult1();
        String result2 = moviedata.getResult2();
        String result3 = moviedata.getResult3();
        String result4 = moviedata.getResult4();
        String result5 = moviedata.getResult5();
        String result6 = moviedata.getResult6();
        String result7 = moviedata.getResult7();
        String result8 = moviedata.getResult8();
        String result9 = moviedata.getResult9();
        String result10 = moviedata.getResult10();
        String result11 = moviedata.getResult11();
        String result12 = moviedata.getResult12();
        String result13 = moviedata.getResult13();
        String result14 = moviedata.getResult14();
        String result15 = moviedata.getResult15();


        jdbcTemplate.update("insert into moviedata (userid,datestr,datetime,result1,result2,result3,result4,result5,result6,result7,result8,result9,result10,result11,result12,result13,result14,result15) " +
                "values (?,?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?, ?, ?)", userid,datestr,datetime,result1,result2,result3,result4,result5,result6,result7,result8,result9,result10,result11,result12,result13,result14,result15);
        return "success";

    }



    @PostMapping("/api3/querysysinformation")
    public Map<String, Object> querysysinformation(@RequestBody Moviedata moviedata) {
        String keyword = moviedata.getKeyword();
        int current = moviedata.getCurrent();
        int size = moviedata.getSize();
        int countdata = (current - 1) * size;
        String userid = moviedata.getUserid();

        // 查询总记录数
        String countSql = "SELECT COUNT(*) AS total FROM moviedata WHERE id > 0";
        List<Object> countParams = new ArrayList<>();
        if (userid != null && !userid.isEmpty()) {
            countSql += " AND userid = ?";
            countParams.add(userid);
        }
        int total = jdbcTemplate.queryForObject(countSql, countParams.toArray(), Integer.class);

        // 查询分页数据
        String dataSql = "SELECT a.*,b.userName FROM moviedata a left join userdata b on a.userid = b.id WHERE a.id > 0";
        List<Object> dataParams = new ArrayList<>();
        if (userid != null && !userid.isEmpty()) {
            dataSql += " AND userid = ?";
            dataParams.add(userid);
        }
        dataSql += " LIMIT ?, ?";
        dataParams.add(countdata);
        dataParams.add(size);
        List<Map<String, Object>> list_maps = jdbcTemplate.queryForList(dataSql, dataParams.toArray());

        // 构建结果对象，包含总记录数和分页数据
        Map<String, Object> result = new HashMap<>();
        result.put("count", total);
        result.put("data", list_maps);
        return result;
    }






    @PostMapping("/api3/querylevel")
    public List<Map<String, Object>> querylevel(@RequestBody Level level) {
        String sql = "SELECT * FROM level";
        List<Map<String, Object>> list_maps = jdbcTemplate.queryForList(sql);
        return list_maps;
    }


    @PostMapping("/api3/addlevel")
        public Object addlevel(@RequestBody Level level) {
            LocalDateTime currentTime = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedTime = currentTime.format(formatter);
            int parentid = level.getParentid();
            String label = level.getLabel();

            jdbcTemplate.update("insert into level(parentid,label) " +
                    "values (?,?)", parentid,label);
            return "success";
        }


        @PostMapping("/api3/dellevel")
        public Object dellevel(@RequestBody Level level) {
            int id = level.getId();
            String sql = "delete from level where id = ? or parentid = ?";
            jdbcTemplate.update(sql, id,id);
            return "ok";
        }


    @PostMapping("/api3/querylevelbyid")
    public List<Map<String, Object>> querylevelbyid(@RequestBody Leveldetail leveldetail) {
        int levelid = leveldetail.getLevelid();
        String sql = "SELECT * FROM leveldetail WHERE levelid = ? ";
        List<Map<String, Object>> list_maps = jdbcTemplate.queryForList(sql,levelid);
        return list_maps;
    }





    @PostMapping("/api3/adddetaillevel")
        public Object adddetaillevel(@RequestBody Leveldetail leveldetail) {
            LocalDateTime currentTime = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedTime = currentTime.format(formatter);
            int levelid = leveldetail.getLevelid();
            String detail = leveldetail.getDetail();

            String sql1 = "delete from leveldetail where levelid = ? ";
            jdbcTemplate.update(sql1, levelid);


            jdbcTemplate.update("insert into leveldetail(levelid,detail) " +
                    "values (?,?)", levelid,detail);
            return "success";
        }


        @PostMapping("/api3/updatedetaillevel")
        public Object updatedetaillevel(@RequestBody Leveldetail leveldetail) {
            int levelid = leveldetail.getLevelid();
            String detail = leveldetail.getDetail();
            String sql = "update leveldetail set  detail=? where levelid=?";
            jdbcTemplate.update(sql, detail, levelid);
            return "ok";
        }












        @PostMapping("/proxy")
        public String proxyfun(@RequestBody LocationRequest locationRequest) {
            // 根据接收到的经纬度动态构建目标 URL
            double latitude = locationRequest.getLatitude();
            double longitude = locationRequest.getLongitude();
            String location = latitude + "," + longitude;
            String TARGET_URL = "https://apis.map.qq.com/ws/geocoder/v1/?coord_type=5&get_poi=1&output=json&key=GJDBZ-BQCEK-FKEJJ-APLSW-QRZ6Z-2CF3D&poi_options=policy%3D1%3Bpage_size%3D20%3Bpage_index%3D1&location=" + location;

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // 发送请求到目标 API
            ResponseEntity<String> response = restTemplate.exchange(TARGET_URL, HttpMethod.GET, entity, String.class);

            return response.getBody();
        }




        @PostMapping("/api3/modifyPwd")
        public Object modifyPwd(@RequestBody Userdata userdata) {
            LocalDateTime currentTime = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedTime = currentTime.format(formatter);
            String password = userdata.getPassword();
            int id = userdata.getId();

            String sql = "UPDATE userdata SET password = ? where id = ?";
            jdbcTemplate.update(sql, password, id);
            return "success";
        }


        @PostMapping("/api3/addSysUser")
        public Object addSysUser(@RequestBody Userdata userdata) {
            this.userdata = userdata;
            String trans_pic = userdata.getTrans_pic();
            String empNo = userdata.getEmpNo();
            String userName = userdata.getUserName();
            String email = userdata.getEmail();
            String password = userdata.getPassword();
            String mobile = userdata.getMobile();
            String remark = userdata.getRemark();
            String role = userdata.getRole();
            String tapstr = userdata.getTapstr();
            String taptext = userdata.getTaptext();
            String nandu = userdata.getNandu();
            int status = userdata.getStatus();
            int isadmin = userdata.getIsadmin();

            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement("insert into userdata(empNo,nandu,taptext,tapstr,trans_pic,userName,email,password,mobile,remark,role,status,isadmin) values (?,?,?,?,?,?,?,?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, empNo);
                ps.setString(2, nandu);
                ps.setString(3, taptext);
                ps.setString(4, tapstr);
                ps.setString(5, trans_pic);
                ps.setString(6, userName);
                ps.setString(7, email);
                ps.setString(8, password);
                ps.setString(9, mobile);
                ps.setString(10, remark);
                ps.setString(11, role);
                ps.setInt(12, status);
                ps.setInt(13, isadmin);
                return ps;
            }, keyHolder);

            // 获取生成的主键
            Number generatedId = keyHolder.getKey();
            if (generatedId != null) {
                return generatedId.intValue();
            } else {
                return "插入数据时获取主键失败";
            }
        }

        @PostMapping("/api3/updateSysUser")
        public Object updateSysUser(@RequestBody Userdata userdata) {
            this.userdata = userdata;
            int id = userdata.getId();
            String empNo = userdata.getEmpNo();
            String trans_pic = userdata.getTrans_pic();
            String userName = userdata.getUserName();
            String email = userdata.getEmail();
            String mobile = userdata.getMobile();
            String remark = userdata.getRemark();
            String nandu = userdata.getNandu();
            String role = userdata.getRole();
            int status = userdata.getStatus();
            int isadmin = userdata.getIsadmin();
            String sql = "update userdata set empNo=?,userName=?,email=?,mobile=?,remark=?,role=?,status=?,isadmin=?,trans_pic=?,nandu=? where id = "
                    + id;
            Object[] objects = new Object[10];
            objects[0] = empNo;
            objects[1] = userName;
            objects[2] = email;
            objects[3] = mobile;
            objects[4] = remark;
            objects[5] = role;
            objects[6] = status;
            objects[7] = isadmin;
            objects[8] = trans_pic;
            objects[9] = nandu;
            jdbcTemplate.update(sql, objects);



            return "ok";
        }


        @PostMapping("/api3/updateSysUserext")
        public Object updateSysUserext(@RequestBody Userdata userdata) {
            this.userdata = userdata;
            int id = userdata.getId();
            String empNo = userdata.getEmpNo();
            String password = userdata.getPassword();
            String trans_pic = userdata.getTrans_pic();
            String userName = userdata.getUserName();
            String email = userdata.getEmail();
            String mobile = userdata.getMobile();
            String remark = userdata.getRemark();
            String role = userdata.getRole();
            String taptext = userdata.getTaptext();
            String tapstr = userdata.getTapstr();
            int status = userdata.getStatus();
            int isadmin = userdata.getIsadmin();

            String sql = "update userdata set empNo=?,userName=?,email=?,mobile=?,remark=?,role=?,status=?,isadmin=?,trans_pic=?,tapstr = ?,taptext = ? where id = "
                    + id;
            Object[] objects = new Object[11];
            objects[0] = empNo;
            objects[1] = userName;
            objects[2] = email;
            objects[3] = mobile;
            objects[4] = remark;
            objects[5] = role;
            objects[6] = status;
            objects[7] = isadmin;
            objects[8] = trans_pic;
            objects[9] = tapstr;
            objects[10] = taptext;


            jdbcTemplate.update(sql, objects);
            return "ok";
        }

        @PostMapping("/api3/userremove")
        public Object userremove(@RequestBody Userdata userdata) {
            this.userdata = userdata;
            int id = userdata.getId();
            String sql = "delete from userdata where id = " + id;
            jdbcTemplate.update(sql);
            return "ok";
        }





        @PostMapping("/api3/userQueryList")
        public List<Map<String, Object>> userQueryList(@RequestBody Userdata userdata) {
            String userName = userdata.getUserName();
            int status = userdata.getStatus();
            String sql = "select * from userdata where status = "
                    + status;


            List<Object> params = new ArrayList<>();

            if (userName != null && !userName.isEmpty()) {
                sql += " and userName LIKE ?";
                params.add("%" + userName + "%");
            }

            List<Map<String, Object>> list_maps = jdbcTemplate.queryForList(sql, params.toArray());
            return list_maps;
        }

        @PostMapping("/api3/userQueryListbyid")
        public List<Map<String, Object>> userQueryListbyid(@RequestBody Userdata userdata) {
            this.userdata = userdata;
            int id = userdata.getId();
            String sql = "select * from userdata where id = "
                    + id;
            List<Map<String, Object>> list_maps = jdbcTemplate.queryForList(sql);
            return list_maps;
        }





        // 用户编辑修改状态
        @PostMapping("/api3/updateUserstatus")
        public Object updateUserstatus(@RequestBody Userdata userdata) {
            this.userdata = userdata;
            int id = userdata.getId();
            int status = userdata.getStatus();
            String sql = "update userdata set status=? where id = " + id;
            Object[] objects = new Object[1];
            objects[0] = status;
            jdbcTemplate.update(sql, objects);
            return "ok";
        }

        //自己信息修改
        @PostMapping("/api3/updateSysUserbyme")
        public Object updateSysUserbyme(@RequestBody Userdata userdata) {
            this.userdata = userdata;
            int id = userdata.getId();
            String userName = userdata.getUserName();
            String email = userdata.getEmail();
            String mobile = userdata.getMobile();
            String sql = "update userdata set userName=?,email=?,mobile=? where id = "
                    + id;
            Object[] objects = new Object[3];

            objects[0] = userName;
            objects[1] = email;
            objects[2] = mobile;

            jdbcTemplate.update(sql, objects);
            return "ok";
        }



        // 登录
        @PostMapping("/api3/login")
        public List<Map<String, Object>> login(@RequestBody Userdata userdata) {
            this.userdata = userdata;
            String empNo = userdata.getEmpNo();
            String password = userdata.getPassword();
            String sql = "select  * from userdata where status = 0 and empNo = " + "'"
                    + empNo + "' and password = '" + password + "'";
            System.out.println(sql);
            List<Map<String, Object>> list_maps = jdbcTemplate.queryForList(sql);
            return list_maps;
        }

        // 修改用户密码
        @PostMapping("/api3/resetPassword")
        public Object resetPassword(@RequestBody Userdata userdata) {
            this.userdata = userdata;
            int id = userdata.getId();
            String password = userdata.getPassword();
            String sql = "update userdata set password=? where id = " + id;
            Object[] objects = new Object[1];
            objects[0] = password;
            jdbcTemplate.update(sql, objects);
            return "ok";
        }

}


class LocationRequest {
    private double latitude;
    private double longitude;

    // 必须提供无参构造函数
    public LocationRequest() {}

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}

