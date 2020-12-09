
var spFlag = 0;
layui.use(['layer', 'form', 'laydate', 'jquery'], function () {
    var $ = layui.jquery
    , layer = layui.layer
    , form = layui.form
    , laydate = layui.laydate;

    $("#guanbisupin").click(function () {
        $(this).parents("#supinnav").hide();
    });
    
    $("#supinshouye").click(function () {
        $.ajax({
            type: 'post',
            url: '/ashx/indexsp.ashx',
            data: {
                action: "LoginMobile1",
            },
            success: function (data) {
                //console.log(data);
                if (data.status == 10001) {
                    $("#supinnav").show();
                    sptk();
                }
                else if (data.status == 30003) {
                    alert(data.msg);
                }
                else if (data.status == 30002) {
                    $(".qiyeyanzheng").show();
                    $("#closeA").click(function () {
                        $(".qiyeyanzheng").hide();
                    });
                    if (spFlag == 0) {
                        yzmdlqeye();
                        spFlag = 1;
                    }
                }
            }
        });
    })

    function sptk() {
        $.ajax({
            type: 'post',
            url: '/ashx/indexsp.ashx',
            data: {
                action: "LoginMobile",
            },
            success: function (res) {
                //console.log(res);
                if (res.status == 10001) {
                    $("#unit").val(res.data.name);//招聘职位
                    $("#splxr").val(res.data.lxr);//联系人 
                    $("#comyaddress").val(res.data.provinceName + ' ' + res.data.cityName + ' ' + res.data.countyName + ' ' + res.data.townName);//公司地址
                    $("#hf_spsheng").val(res.data.province);//公
                    $("#hf_spshi").val(res.data.city);//司
                    $("#hf_spxian").val(res.data.county);//地
                    $("#hf_spjie").val(res.data.town);//址
                    $("#qq").val(res.data.qq);//QQ
                    $("#telphi").val(res.data.phone);//联系电话
                    $("#completeaddress").val(res.data.address);//详细地址
                    form.render();
                    if ($("#telphi").val() != "") {
                        $("#telphi").attr("disabled", "disabled");
                    }
                    laydate.render({
                        elem: '#youxiaoDate',
                        value: new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000)
                    });
                   
                    fbn_fbwzp();
                }
                else if (res.status == 30003) {
                    $("#supinnav").hide();
                    alert(res.msg);
                }
            }
        });
    };

    $("#comyaddress").click(function () {
        //iframe层-父子操作
        layer.open({
            type: 2,
            title: false,
            area: '800px',
            fixed: true, //不固定
            shade: [0.5, '#393D49'],
            content: '/index/index3.aspx?sheng=' + $("#hf_spsheng").val() + "&shi=" + $("#hf_spshi").val() + "&xian=" + $("#hf_spxian").val() + "&jie=" + $("#hf_spjie").val(),
            success: function (layero, index) {
                layer.iframeAuto(index);
            }
        });
    });
    //点击xueli
    $("#xueli").click(function () {
        layer.open({
            type: 1,
            title: false,
            area: ["60%", "20%"],
            shade: [0.5, '#393D49'],
            content: $(".xuelitwoxzqy"),
            success: function () {

            }
        });
    });
    $(".xuelitwoxzqy ul li").click(function () {
        $(this).addClass("lionSelect").siblings().removeClass("lionSelect");
        var thidd = $(this).text();
        var thval = $(this).val();
        $("#xueli").val(thidd);
        $("#xueli2").val(thval);
        $(".xuelitwoxzqy").hide();
        layer.closeAll();
    })
    //点击工作经验
    $("#jiangyan").click(function () {
        layer.open({
            type: 1,
            title: false,
            area: ["60%", "20%"],
            shade: [0.5, '#393D49'],
            content: $(".jingyantwoxzqy"),
            success: function () {

            }
        });
    });
    $(".jingyantwoxzqy ul li").click(function () {
        $(this).addClass("lionSelect").siblings().removeClass("lionSelect");
        var thidd = $(this).html();
        var thval = $(this).val();
        $("#jiangyan").val(thidd);
        $("#jiangyan2").val(thval);
        $(".jingyantwoxzqy").hide();
        layer.closeAll();
    })
    //点击期望薪资
    $("#spxwxz").click(function () {
        layer.open({
            type: 1,
            title: false,
            area: ["60%", "20%"],
            shade: [0.5, '#393D49'],
            content: $(".spxwxzxzqy"),
            success: function () {

            }
        });
    });
    $(".spxwxzxzqy ul li").click(function () {
        $(this).addClass("lionSelect").siblings().removeClass("lionSelect");
        var thidd = $(this).html();
        var thval = $(this).val();
        $("#spxwxz").val(thidd);
        $("#spxwxz2").val(thval);
        $(".spxwxzxzqy").hide();
        layer.closeAll();
    })
    
    function yzmdlqeye() {
        var t = Math.random();
        if ($.cookie("total") != undefined && $.cookie("total") != 'NaN' && $.cookie("total") != 'null') {//cookie存在倒计时
            timekeeping();
        } else {//cookie 没有倒计时
            $('#hqyzm-sendverifycodeDis').hide();
            $('#hqyzm-sendverifycode').show();
        };
        function timekeeping() {
            //把按钮设置为不可以点击
            $('#hqyzm-sendverifycodeDis').show();
            $('#hqyzm-sendverifycode').hide();
            var interval = setInterval(function () {//每秒读取一次cookie
                //从cookie 中读取剩余倒计时
                total = $.cookie("total");
                //在发送按钮显示剩余倒计时
                $('#hqyzm-sendverifycodeDis').text(total + '秒');
                //把剩余总倒计时减掉1
                total--;
                if (total == 0) {//剩余倒计时为零，则显示 重新发送，可点击
                    //清除定时器
                    clearInterval(interval);
                    //删除cookie
                    total = $.cookie("total", total, { expires: -1 });
                    //显示重新发送
                    $('#hqyzm-sendverifycodeDis').text('重新发送');
                    //把发送按钮设置为可点击
                    $('#hqyzm-sendverifycodeDis').hide();
                    $('#hqyzm-sendverifycode').show();
                } else {//剩余倒计时不为零
                    //重新写入总倒计时
                    $.cookie("total", total);
                }
            }, 1000);
        };
        var handler = function (captchaObj) {

            captchaObj.onReady(function () {
                //验证码ready之后才能调用verify方法显示验证码
                $("#wait").hide();
            }).onSuccess(function () {
                //your code
                var validate = captchaObj.getValidate();
                if (!validate) {
                    return alert('请完成验证');
                }
                $.ajax({
                    url: "/ashx/xiaoyuanzhaopin/GeeTestVerify.ashx",
                    type: "get",
                    dataType: "json",
                    data: {
                        "mobile": $("#hqyzm-phone").val(),
                        "geetest_challenge": validate.geetest_challenge,
                        "geetest_validate": validate.geetest_validate,
                        "geetest_seccode": validate.geetest_seccode.replace("|jordan", ""),
                        "isCheckComUser": $('#usType').val() == 1 ? "1" : "0",//是否验证企业用户 1 是 0 否 
                        "isCheckPersonalUser": $('#usType').val() == 0 ? "1" : "0",//是否验证个人用户 1 是 0 否
                        "testType": "0"//极验验证场景 0 获取短信验证码按钮触发 1 账号密码登录触发
                    },
                    // 这里是正确返回处理结果的处理函数
                    // 当然，正常情况是返回JSON数据
                    success: function (data) {
                        //console.log(data);
                        if (data.status == 10001) {
                            $.cookie("total", 60);
                            timekeeping();
                        } else {
                            alert(data.msg);
                        }
                        //status:30001 msg:非法操作
                        //status:30002 msg:电话号码为空或电话号码格式不正确
                        //status:30003 msg:发送次数超标
                        //status:30004 msg:短信发送失败
                        //status:30006 msg:非个人用户
                        //status:10001 msg:短信发送成功
                    }
                });
            }).onError(function () {
                // 出错啦，可以提醒用户稍后进行重试
            });
            // 按钮提交事件
            $('#hqyzm-sendverifycode').click(function () {
                var phone = $('#hqyzm-phone').val();
                if (phone == "") {
                    layer.alert("请输入手机号");
                    return false;
                } else {
                    // some code
                    // 检测验证码是否ready, 验证码的onReady是否执行
                    captchaObj.verify(); //显示验证码
                    // some code
                }
            });
            $(".qiyesure").click(function () {
                var phone = $('#hqyzm-phone').val();
                var yzm = $("#qiyeyzm").val();
                if (phone == "") {
                    layer.alert("请输入手机号");
                    return false;
                } else if (yzm == "") {
                    layer.alert("请输入验证码");
                    return false;
                } else {
                    $.ajax({
                        type: 'post',
                        url: '/ashx/indexsp.ashx',
                        data: {
                            action: 'LoginByMobile',
                            mobile: phone,
                            verifyCode: yzm,
                            userType: 1
                        },
                        success: function (data) {
                          //console.log(data);
                            if (data.status == 10001 || data.status == 10002 || data.status == 10003 || data.status == 10004 || data.status == 10005) {
                                $(".qiyeyanzheng").hide();
                                $("#supinnav").show();
                                sptk();
                            }
                            else if (data.status == 30001 || data.status == 30002 || data.status == 30003 || data.status == 30004 || data.status == 30005 || data.status == 30006 || data.status == 30007 || data.status == 30008 || data.status == 30009 || data.status == 30010 || data.status == 30011) {
                                layer.alert(data.msg, {
                                    icon: 2,
                                    skin: 'layer-ext-moon'
                                });
                            }
                        }
                    });
                }
            });
        };
        $.ajax({
            url: "/ashx/xiaoyuanzhaopin/GeeTestCaptcha.ashx?t=" + t + "",
            type: "get",
            dataType: "json",
            success: function (data) {
                //请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
                initGeetest({
                    // 以下配置参数来自服务端 SDK
                    gt: data.gt,
                    challenge: data.challenge,
                    offline: !data.success, // 表示用户后台检测极验服务器是否宕机
                    new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
                    timeout: '5000',
                    product: "bind", // 产品形式，包括：float，popup
                    width: "300px"
                }, handler)
            }
        });
    }
    function fbn_fbwzp() {
        $("#fbn_fbwzp").click(function () {
            if ($("#fbn_fbwzp").text() == "发布微招聘") {
                if (SimpleJobParaIsNull() == true) {
                    var name = encodeURIComponent($("#zwName").val());//招聘职位
                    var sexxb = $("#sexxb").val();//性别
                    var splxr = encodeURIComponent($("#splxr").val());//联系人
                    //var comyaddress = encodeURIComponent($("#comyaddress").val());//公司地址
                    var hf_spsheng = $("#hf_spsheng").val();//公
                    var hf_spshi = $("#hf_spshi").val();//司
                    var hf_spxian = $("#hf_spxian").val();//地
                    var hf_spjie = $("#hf_spjie").val();//址
                    var num = $("#num").val();//招聘人数
                    var xueli = $("#xueli2").val();//学历
                    var jiangyan = $("#jiangyan2").val();//经验
                    var qq = $("#qq").val();//QQ
                    var tel = $("#telphi").val();//联系电话
                    var unit = encodeURIComponent($("#unit").val());//招聘单位
                    var completeaddress = encodeURIComponent($("#completeaddress").val());//详细地址
                    var youxiaoDate = $("#youxiaoDate").val();//有效期
                    var jtyq = encodeURIComponent($("#jtyq").val());
                    var spxwxz = $("#spxwxz2").val();
                    
                    $("#fbn_fbwzp").text("发布中");
                    $.ajax({
                        type: 'post',
                        url: '/ashx/indexsp.ashx',
                        data: {
                            action: 'SimpleRecruit',
                            provinceId: hf_spsheng,
                            cityId: hf_spshi,
                            countyId: hf_spxian,
                            townId: hf_spjie,
                            spName: name,
                            spNumber: num,
                            spLxr: splxr,
                            spPhone: tel,
                            spQQ: qq,
                            comName: unit,
                            validDays: youxiaoDate,
                            address: completeaddress,
                            spDes: jtyq,
                            qua: xueli,
                            sex: sexxb,
                            exp_ID: jiangyan,
                            willMoney: spxwxz
                        },
                        success: function (data) {
                            //console.log(data);
                            if (data.status == 10001 || data.status == 10002 || data.status == 30012 || data.status == 10003) {
                                $("#fbn_fbwzp").text("发布微招聘");
                                layer.alert(data.msg, {
                                        icon: 6,
                                        time: 1500,
                                        end: function () {
                                            $("#supinnav").hide();
                                            $("#jtyq").val("");
                                            $("#zwName").val("");
                                            $("#num").val("");
                                        }
                                    });
                            }
                            else if (data.status == 30002 || data.status == 30003 || data.status == 30004 || data.status == 30005 || data.status == 30006 || data.status == 30007 || data.status == 30008 || data.status == 30009 || data.status == 30010 || data.status == 30011 || data.status == 30013 || data.status == 30014 || data.status == 30015) {
                                layer.alert(data.msg , {
                                    icon: 2,
                                    time: 1500,
                                });
                            }
                            else if (data.status == 30012) {
                                layer.alert("职位名称中包含违法词：<i style='color:red;'>" + data.msg + "</i>，发布失败", { icon: 2 });
                            }
                        },
                        //beforeSend: function () {
                        //    layer.msg('发布中', {
                        //        icon: 16
                        //        , shade: [0.5, '#000']
                        //    });
                        //}
                    });
                }
            }
        });
        function SimpleJobParaIsNull() {
            var reg = /^[\u4e00-\u9fa5a-zA-Z]{2,10}$/;
            var numm = /^[0-9]*$/;
           // var shzmu = /^[0-9a-zA-Z]*$/g;
            var shzmu = /[^a-zA-Z]/g;
            //不能有数字 var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var isPhone = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;;
            var name = $('#zwName').val();
            var sex = $('#sexxb').val();
            var splxr = $('#splxr').val();
            var comyaddress = $('#comyaddress').val();
            var num = $('#num').val();
            var xueli = $('#xueli').val();
            var jiangyan = $('#jiangyan').val();
            var qq = $('#qq').val();
            var tel = $('#telphi').val();
            var unit = $('#unit').val();
            var completeaddress = $('#completeaddress').val();
            var youxiaoDate = $('#youxiaoDate').val();
            var jtyq = $('#jtyq').val();
            
            if (name == "") {
                layer.alert('请输入岗位名称', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            } else if (numm.test(name)) {
                layer.alert('招聘职位名称不能为纯数字', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            } else if (!shzmu.test(name)) {
                layer.alert('招聘职位名称不能为纯字母', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            if (num == "") {
                layer.alert('请输入招聘人数', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            } else if (!numm.test(num)) {
                layer.alert('请填写数字', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            if (xueli == "") {
                layer.alert('请选择学历', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            if (sex == "") {
                layer.alert('请选择性别', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            if (jiangyan == "") {
                layer.alert('请选择工作经验', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            if (qq == "") {
                layer.alert('请输入联系QQ', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            } else if (!numm.test(qq)) {
                layer.alert('请输入正确的联系QQ', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            if (splxr == "") {
                layer.alert('请输入联系人', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            } else if (!reg.test(splxr)) {
                layer.alert('联系人名称为中文或英文格式，请输入正确的联系人名称', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            if (tel == "") {
                layer.alert('请输入手机号码', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            } else if (tel.substring(0, 1) == 1) {
                if (tel.length != 11) {
                    layer.alert('手机号无效，请重新输入', {
                        icon: 2,
                        skin: 'layer-ext-moon'
                    });
                    return false;
                } else if (!myreg.test(tel)) {
                    layer.alert('手机号不合法，请重新输入', {
                        icon: 2,
                        skin: 'layer-ext-moon'
                    });
                    return false;
                }
            } else if (tel.substring(0, 1) == 0) {
                if (!isPhone.test(tel)) {
                    layer.alert('座机号不合法，请重新输入', {
                        icon: 2,
                        skin: 'layer-ext-moon'
                    });
                    return false;
                }
            } else if (tel.substring(0, 1) > 1) {
                layer.alert('该号码不合法，请重新输入', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            if (unit == "") {
                layer.alert('请输入招聘单位', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            if (comyaddress == "") {
                layer.alert('请选择公司地址', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            
            if (completeaddress == "") {
                layer.alert('请输入详细地址', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
           
            if (youxiaoDate == "") {
                layer.alert('请输入有效期', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            if (jtyq == "") {
                layer.alert('请输入具体要求', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
            return true;
        }
    };
})