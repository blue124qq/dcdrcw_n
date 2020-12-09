
//var yqW = document.documentElement.clientWidth;
//var yqH = document.documentElement.clientHeight;
//var yqLeft = (yqW - 1100) * 0.5 - 160 - 10;
//var yqTop = (yqH - 685) * 0.5;
//var yqDiv = document.createElement("div");
//yqDiv.innerHTML = "<div class='yiqingDiv' style='position: fixed; left:" + yqLeft + "px;top:" + yqTop + "px;width:160px;'>"
//    + "<a href='/reg_0.shtml' title='抗疫期间，招聘免费，求职免费' target='_blank' style='color:#fff;border:0;width: 100%;height: auto;display: inline-block;'>"
//    + "<img src='/images/yiqingadv.png' alt='抗疫期间，招聘免费，求职免费' style='border:0;width: 100%;height:auto;position: relative;bottom: 0;left: 0;' />" 
//    + "</a>"
//    + "<div style='margin-top: 10px;background: #fff;border-radius: 4px;padding-bottom: 9px;'>"
//    + "<h3 style='padding-top: 5px;text-align: center;color: red;font-size: 16px;font-weight: bold;'>提醒</h3>"
//    + " <p style='padding: 5px 10px 0px;font-size: 15px;color: #333;line-height: 24px;'>1、近期各地线下<span style='color: red;'>招聘会</span>排期可能一律暂停，请反复确认；</p>"
//    + "<p style='padding: 5px 10px 0px;font-size: 15px;color: #333;line-height: 24px;'>2、各考试请按时间报名，具体<span style='color: red;'>考试时间</span>看官方系统通知；</p>"
//    + "<p style='padding: 5px 10px 0px;font-size: 15px;color: #333;line-height: 24px;'>3、各地培训机构暂停中，<span style='color: red;'>培训课程</span>请反复确认；</p>"
//    + "<p style='padding: 5px 10px 0px;font-size: 15px;color: #333;line-height: 24px;'>4、各高校<span style='color: red;'>校招</span>排期一律暂停，请反复确认。</p>"
//    + "</div>"
//    + "</div>";
//document.body.appendChild(yqDiv);



//右侧浮动
var ycyqW = document.documentElement.clientWidth;
var ycyqH = document.documentElement.clientHeight;
var ycyqLeft = (ycyqW - 1100) * 0.5 + 1100 + 10;
var ycyqTop = (ycyqH - 331) * 0.5;
var ycyqDiv = document.createElement("div");
ycyqDiv.innerHTML = "<div class='pptsDiv' style='position: fixed; left:" + ycyqLeft + "px;top:" + ycyqTop + "px;width:160px;'>"
    //校园报名
    //+ "<a href='http://www.jrzp.com/zhizhao.shtml' title='优质企业全国联合招聘' target='_blank' style='color:#fff;border:0;width: 100%;height: auto;display: inline-block;'>"
    //+ "<img src='/images/pptadv.png' alt='' style='border:0;width: 100%;height:auto;position: relative;bottom: 0;left: 0;' />"
    //+ "</a>"
    //校园报名end
    //我要求职我要招聘
    + "<div style='position: relative;'>"
    + "<a href='/reg_0.shtml' title='我要求职' target='_blank' style='position: absolute;top: 24px;left: 0;width: 100%;height: 28px;display: block;z-index: 9;'></a>"
    + "<a href='/reg_0.shtml' title='我要招聘' target='_blank' style='position: absolute;top: 62px;left: 0;width: 100%;height: 28px;display: block;z-index: 9;'></a>"
    + "<img src='/images/jrzpphtoezp.png' alt='' style='border:0;width: 100%;height:auto;position: relative;bottom: 0;left: 0;' />"
    + "</div>";
       //我要求职我要招聘end


    + "</div>";
document.body.appendChild(ycyqDiv);


if (ycyqW < 1100) {
    document.write('<script language="javascript" type="text/javascript" src="/js/xiazaiapp.js"></script>');
}
//左侧浮动 校园招聘
//var ycyqLeft2 = (ycyqW - 1100) * 0.5 - 180 - 10;
//var ycyqTop2 = (ycyqH - 331) * 0.5;
//var ycyqDiv2 = document.createElement("div");
//ycyqDiv2.innerHTML = "<div class='leftBared' style='position: fixed; left:" + ycyqLeft2 + "px;top:" + ycyqTop2 + "px;width:180px;'>"
//    + "<div class='yjhq' style='position: relative;'>"
//    + "<a href='https://www.jrzp.com/shiyezhaopin/9166D962706038FA.shtml' title='产教融合协同创新发展高峰论坛暨技术技能人才供需对接洽谈会' target='_blank'style='color:#fff;border:0;'>"
//    + "<img src='/images/xiaoyuanzhaopinimg.jpg' alt='产教融合协同创新发展高峰论坛暨技术技能人才供需对接洽谈会' style='border:0;width: 100%;height:auto;position: relative;bottom: 0;left: 0;' />"
//    + "</a>"
//    + "</div>";
//+ "</div>";
//document.body.appendChild(ycyqDiv2);
////左侧浮动end