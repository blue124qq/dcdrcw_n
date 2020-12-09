jQuery.support.cors = true;
$(function () {
    //遮罩层区域
    var index = "ycy1";
    var indexClass = "company";

    if ($(".adv").length > 0) {
    }
    else {
        $(".advBox").hide();
    }

    //窗口大小改变时保持居中
    $(window).resize(function () {
        var height = ($(window).height() - $('.mask .moreTable').height()) / 2;
        var width = ($(window).width() - $('.mask .moreTable').width()) / 2;
        $('.mask .moreTable').css({ 'top': height + 'px', 'left': width });
    });
    //遮罩层关闭
    $('.close').on("click", function () {
        $('.mask').css('display', 'none')
    })
    //点击更多现实遮罩层
    $('.searchBox .searchBar .selectFore .more').on("click", function () {
        var thiss = $(this).parent().parent().find(".ycy").attr("id");
        index = thiss;
        $('.mask').css('display', 'block')
        //遮罩层垂直居中
        var height = ($(window).height() - $('.mask .moreTable').height()) / 2;
        var width = ($(window).width() - $('.mask .moreTable').width()) / 2;
        $('.mask .moreTable').css({ 'top': height + 'px', 'left': width });
    })
    //职位点击全选和全不选
    $('.mask .moreTable .moreTableContent1').on('click', 'input[father]', function () {
        var userids = $(this).prop('checked');
        if ($('.mask .moreTable .moreTableContent1 input:checked').length > 3) {
            $(this).prop('checked', false)
            alert('最多选取三个职类')
        } else {
            //点击全选框实现子框禁止选择并添加一个大类
            if ($(this).prop('checked')) {
                $('input[name=' + $(this).attr('name').replace(/All$/g, '') + ']').each(function () {
                    $(this).attr("disabled", true);
                    $(this).attr('checked', false);
                    $('.mask .moreTable .moreTableTop ul').find("#" + $(this).val()).remove()
                })
            } else {
                $('input[name=' + $(this).attr('name').replace(/All$/g, '') + ']').each(function () {
                    $(this).attr('disabled', false);
                    $('.mask .moreTable .moreTableTop ul').find("#" + $(this).val()).remove()
                })
            }
            if ($(this).prop('checked') && $('.mask .moreTable .moreTableTop>ul').find('li[id=' + $(this).val() + ']').length == 0) {
                var smallTitle = "<li id='" + $(this).val() + "' jrzp='bigJobClass' class='smallTitle left'><span>" + $(this).next().html() + "</span><b name=" + $(this).attr('name') + ">-</b><i>&nbsp;&nbsp;X</i></li>"
                $('.mask .moreTable .moreTableTop ul').append(smallTitle)
            } else {
                $('.mask .moreTable .moreTableTop ul').find("#" + $(this).val()).remove()
            }
        }
    })
    //点击子框实现添加
    $('.mask .moreTable .moreTableContent1').on('click', 'input[child]', function () {
        if ($('.mask .moreTable .moreTableContent1 input:checked').length > 3) {
            $(this).prop('checked', false)
            alert('最多选择三个职类')
        }
        if ($(this).prop('checked') && $('.mask .moreTable .moreTableTop>ul').find('li[id=' + $(this).val() + ']').length == 0) {
            //将当前点中的类添加到小标题框内(js原生方法创建追加,jq方法取元素)
            var smallTitle = "<li id='" + $(this).val() + "' jrzp='smallJobClass' class='smallTitle left'><span>" + $(this).next().html() + "</span><b name=" + $(this).attr('name') + ">-</b><i>&nbsp;&nbsp;X</i></li>"
            //如果小标题内存在smallTitle就不追加,不存在就追加
            $('.mask .moreTable .moreTableTop ul').append(smallTitle)
        } else {
            $('.mask .moreTable .moreTableTop ul').find("#" + $(this).val()).remove()
        }
        if ($('input[name=' + $(this).attr('name') + 'All]').prop('checked')) {
            $('input[name=' + $(this).attr('name') + 'All]').prop('checked', false);
            $('.mask .moreTable .moreTableTop ul').find($('li[id=' + $(this).attr('name') + 'All]')).remove()
        }

    })
    //点击小圆点移除当前选项并取消勾选
    $('.mask .moreTable .moreTableTop>ul').on('click', 'b', function () {
        $(this).parent().remove();
        $(".mask .moreTable .moreTableContent1 .smallContent input[value=" + $(this).parent().prop('id') + "]").prop('checked', false);
        if ($(this).attr('name').replace(/^[0-9]*/g, '') == 'All') {
            $(".mask .moreTable .moreTableContent1 .smallTitle input[name=" + $(this).attr('name') + "]").prop('checked', false);
            $('input[name=' + $(this).attr('name').replace(/All$/g, '') + ']').each(function () {
                $(this).attr('disabled', false);
            })
        }
    })
    //薪资点击
    $('.mask .moreTable .moreTableContent2').on('click', 'input[father]', function () {
        var userids = $(this).prop('checked');
        if ($(this).prop('checked') && $('.mask .moreTable .moreTableTop>ul').find('li[id=' + $(this).val() + ']').length == 0) {
            //将当前点中的类添加到小标题框内(js原生方法创建追加,jq方法取元素)
            var smallTitle = "<li id='" + $(this).val() + "' jrzp='salary' class='smallTitle left'><span>" + $(this).next().html() + "</span><b name=" + $(this).attr('name') + ">-</b><i>&nbsp;&nbsp;X</i></li>"
            //如果小标题内存在smallTitle就不追加,不存在就追加
            $('.mask .moreTable .moreTableTop ul').append(smallTitle)
        }
        if (!$(this).prop('checked')) {
            $('.mask .moreTable .moreTableTop ul').find("#" + $(this).val()).remove()
            $('.mask .moreTable .moreTableContent2 input[name$=Salary]').attr("disabled", false);
        } else {
            $('.mask .moreTable .moreTableContent2 input[name$=Salary]').attr("disabled", true);
            $(this).attr("disabled", false);
        }
    })
    //点击小圆点移除当前选项并取消勾选
    $('.mask .moreTable .moreTableTop>ul').on('click', 'b', function () {
        $(this).parent().remove();
        $(".mask .moreTable .moreTableContent2 input[name=" + $(this).attr('name') + "]").prop('checked', false);
        $('.mask .moreTable .moreTableContent2 input[name$=Salary]').attr("disabled", false);
    })
    //经验点击
    $('.mask .moreTable .moreTableContent3').on('click', 'input[father]', function () {
        var userids = $(this).prop('checked');
        //点击全选框实现全选及全不选
        if ($(this).prop('checked') && $('.mask .moreTable .moreTableTop>ul').find('li[id=' + $(this).val() + ']').length == 0) {
            //将当前点中的类添加到小标题框内(js原生方法创建追加,jq方法取元素)
            var smallTitle = "<li id='" + $(this).val() + "' jrzp='exp' class='smallTitle left'><span>" + $(this).next().html() + "</span><b name=" + $(this).attr('name') + ">-</b><i>&nbsp;&nbsp;X</i></li>"
            //如果小标题内存在smallTitle就不追加,不存在就追加
            $('.mask .moreTable .moreTableTop ul').append(smallTitle)
        }
        if (!$(this).prop('checked')) {
            $('.mask .moreTable .moreTableTop ul').find("#" + $(this).val()).remove()
            $('.mask .moreTable .moreTableContent3 input[name$=Exp]').attr("disabled", false);
        } else {
            $('.mask .moreTable .moreTableContent3 input[name$=Exp]').attr("disabled", true);
            $(this).attr("disabled", false);
        }
    })
    //点击小圆点移除当前选项并取消勾选
    $('.mask .moreTable .moreTableTop>ul').on('click', 'b', function () {
        $(this).parent().remove();
        $(".mask .moreTable .moreTableContent3 input[name=" + $(this).attr('name') + "]").prop('checked', false);
        $('.mask .moreTable .moreTableContent3 input[name$=Exp]').attr("disabled", false);
    })
    //学历点击
    $('.mask .moreTable .moreTableContent4').on('click', 'input[father]', function () {
        var userids = $(this).prop('checked');
        //点击全选框实现全选及全不选
        if ($(this).prop('checked') && $('.mask .moreTable .moreTableTop>ul').find('li[id=' + $(this).val() + ']').length == 0) {
            //将当前点中的类添加到小标题框内(js原生方法创建追加,jq方法取元素)
            var smallTitle = "<li id='" + $(this).val() + "' jrzp='edu' class='smallTitle left'><span>" + $(this).next().html() + "</span><b name=" + $(this).attr('name') + ">-</b><i>&nbsp;&nbsp;X</i></li>"
            //如果小标题内存在smallTitle就不追加,不存在就追加
            $('.mask .moreTable .moreTableTop ul').append(smallTitle)
        }
        if (!$(this).prop('checked')) {
            $('.mask .moreTable .moreTableTop ul').find("#" + $(this).val()).remove();
            $('.mask .moreTable .moreTableContent4 input[name$=Edu]').attr("disabled", false);
        } else {
            $('.mask .moreTable .moreTableContent4 input[name$=Edu]').attr("disabled", true);
            $(this).attr("disabled", false);
        }
    })
    //点击小圆点移除当前选项并取消勾选
    $('.mask .moreTable .moreTableTop>ul').on('click', 'b', function () {
        $(this).parent().remove();
        $(".mask .moreTable .moreTableContent4 input[name=" + $(this).attr('name') + "]").prop('checked', false);
        $('.mask .moreTable .moreTableContent4 input[name$=Edu]').attr("disabled", false);
    })
    //工作性质点击
    $('.mask .moreTable .moreTableContent5').on('click', 'input[father]', function () {
        var userids = $(this).prop('checked');
        //点击全选框实现全选及全不选
        if ($(this).prop('checked') && $('.mask .moreTable .moreTableTop>ul').find('li[id=' + $(this).val() + ']').length == 0) {
            //将当前点中的类添加到小标题框内(js原生方法创建追加,jq方法取元素)
            var smallTitle = "<li id='" + $(this).val() + "' jrzp=jobProp class='smallTitle left'><span>" + $(this).next().html() + "</span><b name=" + $(this).attr('name') + ">-</b><i>&nbsp;&nbsp;X</i></li>"
            //如果小标题内存在smallTitle就不追加,不存在就追加
            $('.mask .moreTable .moreTableTop ul').append(smallTitle)
        }
        if (!$(this).prop('checked')) {
            $('.mask .moreTable .moreTableTop ul').find("#" + $(this).val()).remove();
            $('.mask .moreTable .moreTableContent5 input[name$=Prop]').attr("disabled", false);
        } else {
            $('.mask .moreTable .moreTableContent5 input[name$=Prop]').attr("disabled", true);
            $(this).attr("disabled", false);
        }
    })
    //点击小圆点移除当前选项并取消勾选
    $('.mask .moreTable .moreTableTop>ul').on('click', 'b', function () {
        $(this).parent().remove();
        $(".mask .moreTable .moreTableContent5 input[name=" + $(this).attr('name') + "]").prop('checked', false);
        $('.mask .moreTable .moreTableContent5 input[name$=Prop]').attr("disabled", false);
    })
    //点击列表添加移除active类
    $('.mask .moreTable .moreTableNav li').click(function () {
        $('.mask .moreTable .moreTableNav li').removeClass('active');
        $(this).addClass('active');
    })
    //点击确认将选中的字段添加到对应的隐藏于中
    $('.mask .moreTable .btns .btn1').on('click', function () {
        var bigJobClass = '';
        var smallJobClass = '';
        var salary = '';
        var exp = '';
        var edu = '';
        var jobProp = '';
        for (var i = 0; i < $('.mask .moreTable .moreTableTop ul li').length; i++) {
            if ($('.mask .moreTable .moreTableTop ul li').eq(i).attr('jrzp') == 'bigJobClass') {
                bigJobClass += $('.mask .moreTable .moreTableTop ul li').eq(i).attr('id').replace(/All$/g, '') + ','
            } else if ($('.mask .moreTable .moreTableTop ul li').eq(i).attr('jrzp') == 'smallJobClass') {
                smallJobClass += $('.mask .moreTable .moreTableTop ul li').eq(i).attr('id') + ','
            } else if ($('.mask .moreTable .moreTableTop ul li').eq(i).attr('jrzp') == 'salary') {
                salary += $('.mask .moreTable .moreTableTop ul li').eq(i).attr('id').replace(/Salary$/g, '')
            } else if ($('.mask .moreTable .moreTableTop ul li').eq(i).attr('jrzp') == 'exp') {
                exp += $('.mask .moreTable .moreTableTop ul li').eq(i).attr('id').replace(/Exp$/g, '')
            } else if ($('.mask .moreTable .moreTableTop ul li').eq(i).attr('jrzp') == 'edu') {
                edu += $('.mask .moreTable .moreTableTop ul li').eq(i).attr('id').replace(/Edu$/g, '')
            } else if ($('.mask .moreTable .moreTableTop ul li').eq(i).attr('jrzp') == 'jobProp') {
                jobProp += $('.mask .moreTable .moreTableTop ul li').eq(i).attr('id').replace(/Prop$/g, '')
            }
        }
        $("#" + index + ' input[name=bigJobClass]').val(bigJobClass)
        $("#" + index + ' input[name=smallJobClass]').val(smallJobClass)
        $("#" + index + ' input[name=salary]').val(salary)
        $("#" + index + ' input[name=exp]').val(exp)
        $("#" + index + ' input[name=edu]').val(edu)
        $("#" + index + ' input[name=jobProp]').val(jobProp)
        $('.mask').css('display', 'none')
    })
    //左侧浮动
    $(function () {
        var thisheight = $(window).height() * 2 / 3;
        var leftBar = $(".leftBar").width();
        if ($(".leftBar").height() > thisheight) {
            var thisheight1 = thisheight / 2;
        } else {
            var thisheight1 = $(".leftBar").height() / 2;
        }
        $(".leftBar .view_con ul li").each(function () {
            var index = $(this).index();
            if (index > 3) {
                $(this).hide();
                $(".lmore").show();
            }
        });
        var thisleft = ($(window).width() - 1100) / 2 - leftBar - 10;
        $(".leftBar").css({ "left": thisleft + "px", "max-height": thisheight + "px", "margin-top": "-" + (thisheight1 - 84) + "px" });
        $(".leftBar .view_con").css({ "max-height": thisheight + "px" });
        $(window).resize(function () {
            var thisheight = $(window).height() * 2 / 3;
            if ($(".leftBar").height() > thisheight) {
                var thisheight1 = thisheight / 2;
            } else {
                var thisheight1 = $(".leftBar").height() / 2;
            }
            var thisleft = ($(window).width() - 1100) / 2 - leftBar - 10;
            $(".leftBar").css({ "left": thisleft + "px", "max-height": thisheight + "px", "margin-top": "-" + (thisheight1 - 20) + "px" });
            var thisright = ($(window).width() - 1000) / 2 - 35;
            $(".leftBar").css({ 'right': thisright + 'px' });
        });
    })

    //右侧浮动
    $(function () {
        var thisheight = $(window).height() * 2 / 3;
        if ($(".rightBar").height() > thisheight) {
            var thisheight1 = thisheight / 2;
        } else {
            var thisheight1 = $(".rightBar").height() / 2;
        }
        //$(".rightBar .view_con ul li").each(function () {
        //    var index = $(this).index();
        //    if (index > 3) {
        //        $(this).hide();
        //        $(".lmore").show();
        //    }
        //});
        var thisleft = ($(window).width() - 1100) / 2 + 1100 + 10;
        $(".rightBar").css({ "left": thisleft + "px", "max-height": thisheight + "px", "margin-top": "-" + (thisheight1 - 20) + "px" });
        $(".rightBar .view_con").css({ "max-height": thisheight + "px" });
        $(window).resize(function () {
            var thisheight = $(window).height() * 2 / 3;
            if ($(".rightBar").height() > thisheight) {
                var thisheight1 = thisheight / 2;
            } else {
                var thisheight1 = $(".rightBar").height() / 2;
            }
            var thisleft = ($(window).width() - 1100) / 2 + 1100 + 10;
            $(".rightBar").css({ "left": thisleft + "px", "max-height": thisheight + "px", "margin-top": "-" + (thisheight1 - 20) + "px" });
            var thisright = ($(window).width() - 1000) / 2 - 35;
            $(".rightBar").css({ 'right': thisright + 'px' });
        });

        var yijuhuaFlag = 0;
        //一句话求职弹窗
        layui.use(['layer', 'form', 'laydate', 'jquery'], function () {
            var $ = layui.jquery
            , layer = layui.layer
            , form = layui.form
            , laydate = layui.laydate;

            $("#guanbitp").click(function () {
                $(this).parents("#zzyjhqztc").hide();
            });
            //$("#yjhqztc").click(function () {
            //    $.ajax({
            //        type: 'post',
            //        url: '/ashx/JobFair.ashx',
            //        data: {
            //            action: "LoginMobile1",
            //        },
            //        success: function (data) {
            //            if (data.status == 10001) {
            //                $("#zzyjhqztc").show();
            //                if ($("#userName").val() != "") {
            //                    fbBtn();
            //                } else {
            //                    tng();
            //                }
            //            }
            //            else if (data.status == 30003) {
            //                alert(data.msg);
            //            }
            //            else if (data.status == 30002) {
            //                $(".sjyz").show();
            //                $("#close").click(function () {
            //                    $(".sjyz").hide();
            //                });
            //                if (yijuhuaFlag == 0) {
            //                    yzmdl();
            //                    yijuhuaFlag = 1;
            //                }

            //            }
            //        }
            //    });
            //})

            function tng() {
                $.ajax({
                    type: 'post',
                    url: '/ashx/JobFair.ashx',
                    data: {
                        action: "LoginMobile",
                    },
                    success: function (res) {
                        if (res.status == 10001) {
                            console.log(res);
                            $("#userName").val(res.data.name);
                            $("#sex").val(res.data.sex);
                            $("#tel").val(res.data.phone);
                            $("#address").val(res.data.cityJZName);
                            $("#hf_sheng").val(res.data.provinceJZ);
                            $("#hf_shi").val(res.data.cityJZ);
                            $("#address1").val(res.data.cityJZName);
                            $("#hf_ssheng").val(res.data.provinceJZ);
                            $("#hf_sshi").val(res.data.cityJZ);
                            $("#hf_sxian").val(res.data.countyJZ);
                            $("#age").val(res.data.birthday);
                            form.render();
                            laydate.render({
                                elem: '#age',
                            });
                            laydate.render({
                                elem: '#endDate',
                                value: new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000)
                                //new Date()
                            });
                            //点击工资
                            $("#xwxz").click(function () {
                                layer.open({
                                    type: 1,
                                    title: false,
                                    area: ["60%", "20%"],
                                    content: $(".xzqy"),
                                    success: function () {
                                        $(".xzqy ul li").click(function () {
                                            $(this).addClass("lionSelect").siblings().removeClass("lionSelect");
                                            var thidd = $(this).text();
                                            var thval = $(this).val();
                                            $("#xwxz").val(thidd);
                                            $("#xwxz2").val(thval);
                                            layer.closeAll();
                                        })
                                    }
                                });
                            });
                            //点击xueli
                            $("#xl").click(function () {
                                layer.open({
                                    type: 1,
                                    title: false,
                                    area: ["60%", "20%"],
                                    content: $(".xuelixzqy"),
                                    success: function () {
                                        $(".xuelixzqy ul li").click(function () {
                                            $(this).addClass("lionSelect").siblings().removeClass("lionSelect");
                                            var thidd = $(this).text();
                                            var thval = $(this).val();
                                            $("#xl").val(thidd);
                                            $("#xl2").val(thval);
                                            layer.closeAll();
                                        })
                                    }
                                });
                            });
                            $("#address").click(function () {
                                //iframe层-父子操作
                                layer.open({
                                    type: 2,
                                    title: false,
                                    area: '800px',
                                    fixed: true, //不固定
                                    shade: [0.5, '#393D49'],
                                    content: '/index/index.aspx?sheng=' + $("#hf_sheng").val() + "&shi=" + $("#hf_shi").val(),
                                    success: function (layero, index) {
                                        layer.iframeAuto(index);
                                    }
                                });
                            });
                            $("#address1").click(function () {
                                //iframe层-父子操作
                                layer.open({
                                    type: 2,
                                    title: false,
                                    area: '800px',
                                    fixed: true, //不固定
                                    shade: [0.5, '#393D49'],
                                    content: '/index/index2.aspx?sheng=' + $("#hf_ssheng").val() + "&shi="+ $("#hf_sshi").val() + "&xian=" + $("#hf_sxian").val() + "&jie=" + $("#hf_sjie").val(),
                                    success: function (layero, index) {
                                        layer.iframeAuto(index);
                                    }
                                });
                            });
                            
                            fbBtn();
                        }
                    }
                });
            };
            function yzmdl() {
                var t = Math.random();
                if ($.cookie("total") != undefined && $.cookie("total") != 'NaN' && $.cookie("total") != 'null') {//cookie存在倒计时
                    timekeeping();
                } else {//cookie 没有倒计时
                    $('#simplejob-sendverifycodeDis').hide();
                    $('#simplejob-sendverifycode').show();
                };
                function timekeeping() {
                    //把按钮设置为不可以点击
                    $('#simplejob-sendverifycodeDis').show();
                    $('#simplejob-sendverifycode').hide();
                    var interval = setInterval(function () {//每秒读取一次cookie
                        //从cookie 中读取剩余倒计时
                        total = $.cookie("total");
                        //在发送按钮显示剩余倒计时
                        $('#simplejob-sendverifycodeDis').text(total + '秒');
                        //把剩余总倒计时减掉1
                        total--;
                        if (total == 0) {//剩余倒计时为零，则显示 重新发送，可点击
                            //清除定时器
                            clearInterval(interval);
                            //删除cookie
                            total = $.cookie("total", total, { expires: -1 });
                            //显示重新发送
                            $('#simplejob-sendverifycodeDis').text('重新发送');
                            //把发送按钮设置为可点击
                            $('#simplejob-sendverifycodeDis').hide();
                            $('#simplejob-sendverifycode').show();
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
                                "mobile": $("#simplerecruit-phone").val(),
                                "geetest_challenge": validate.geetest_challenge,
                                "geetest_validate": validate.geetest_validate,
                                "geetest_seccode": validate.geetest_seccode.replace("|jordan", ""),
                                "isCheckComUser": $('#userType').val() == 1 ? "1" : "0",//是否验证企业用户 1 是 0 否
                                "isCheckPersonalUser": $('#userType').val() == 0 ? "1" : "0",//是否验证个人用户 1 是 0 否
                                "testType": "0"//极验验证场景 0 获取短信验证码按钮触发 1 账号密码登录触发
                            },
                            // 这里是正确返回处理结果的处理函数
                            // 当然，正常情况是返回JSON数据
                            success: function (data) {
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
                    $('#simplejob-sendverifycode').click(function () {
                        var phone = $('#simplerecruit-phone').val();
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
                    $(".sure").click(function () {
                        var phone = $('#simplerecruit-phone').val();
                        var yzm = $("#yzm").val();
                        if (phone == "") {
                            layer.alert("请输入手机号");
                            return false;
                        } else if (yzm == "") {
                            layer.alert("请输入验证码");
                            return false;
                        } else {
                            $.ajax({
                                type: 'post',
                                url: '/ashx/JobFair.ashx',
                                data: {
                                    action: 'LoginByMobile',
                                    mobile: phone,
                                    verifyCode: yzm,
                                    userType: 0
                                },
                                success: function (data) {
                                    if (data.status >= 10007) {
                                        $(".sjyz").hide();
                                        $("#zzyjhqztc").show();
                                        tng();
                                    }
                                    else {
                                        alert(data.msg);
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
            function fbBtn() {
                $("#fbBtn").click(function () {
                    if ($("#fbBtn").text() == "马上发布") {
                        if (SimpleJobParaIsNull() == true) {
                            var name = encodeURIComponent($("#userName").val());
                            var sex = $("#sex").val();
                            var birthDate = encodeURIComponent($("#age").val());
                            var qua = $("#xl2").val();
                            var xingZhiid = $("#gzxz").val();
                            var xingZhi = encodeURIComponent($("#gzxz").find("option:selected").text());
                            var jobName = encodeURIComponent($("#job").val());
                            var jzAddress = encodeURIComponent($("#address").val());
                            var willAddress = encodeURIComponent($("#address1").val());
                            var hf_ssheng = $("#hf_ssheng").val();
                            var hf_sshi = $("#hf_sshi").val();
                            var hf_sxian = $("#hf_sxian").val();
                            var hf_sjie = $("#hf_sjie").val();
                            var phone = encodeURIComponent($("#tel").val());
                            var jsDate = encodeURIComponent($("#endDate").val());
                            var goalScore = encodeURIComponent($("#content").val());
                            var yaoQiu = encodeURIComponent($("#yq").val());
                            var detailsName2 = encodeURIComponent($("#detailsName2").val());
                            var willMoney = $("#xwxz2").val();
                            $("#fbBtn").text("正在发布，请稍等...");
                            $.ajax({
                                type: 'post',
                                url: '/ashx/JobFair.ashx',
                                data: {
                                    action: 'SimpleJob',
                                    name: name,
                                    sex: sex,
                                    birthDate: birthDate,
                                    qua: qua,
                                    xingZhi: xingZhi,
                                    xingZhiid: xingZhiid,
                                    jobName: jobName,
                                    jzAddress: jzAddress,
                                    willAddress: willAddress,
                                    provinceID: hf_ssheng,
                                    cityID: hf_sshi,
                                    countyID: hf_sxian,
                                    townid: hf_sjie,
                                    phone: phone,
                                    jsDate: jsDate,
                                    goalScore: goalScore,
                                    yaoQiu: yaoQiu,
                                    willMoney: willMoney,
                                    DetailsName: detailsName2,
                                },
                                success: function (data) {
                                    if (data.status == 10001 || data.status == 10002 || data.status == 10003) {
                                        $("#fbBtn").text("马上发布");
                                        layer.alert('发布成功', {
                                            icon: 6,
                                            time: 3000,
                                            end: function () {
                                                $("#zzyjhqztc").hide();
                                                $("#yq").val("");
                                                $("#job").val("");
                                            }
                                        });
                                    } else {
                                        alert(data.status);
                                    }
                                },
                                //beforeSend: function () {
                                //    layer.msg('正在提交中，请稍等', {
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
                    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                    var isPhone = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;;
                    var userName = $('#userName').val();
                    var sex = $('#sex').val();
                    var age = $('#age').val();
                    var xl = $('#xl').val();
                    var gzxz = $('#gzxz').val();
                    var job = $('#job').val();
                    var address = $('#address').val();
                    var address1 = $('#address1').val();
                    var tel = $('#tel').val();
                    var endDate = $('#endDate').val();
                    var content = $('#content').val();
                    var yq = $('#yq').val();
                    var detailsName2 = $("#detailsName2").val();
                    var willMoney = $("#xwxz").val();
                    if (userName == "") {
                        layer.alert('请输入姓名', {
                            icon: 2,
                            skin: 'layer-ext-moon'
                        });
                        return false;
                    } else if (!reg.test(userName)) {
                        layer.alert('姓名为中文或英文格式，请输入正确的姓名格式', {
                            icon: 2,
                            skin: 'layer-ext-moon'
                        });
                        return false;
                    }
                    if (sex == "") {
                        alert("请选择性别");
                        return false;
                    }
                    if (age == "") {
                        alert("请输入生日");
                        return false;
                    }
                    if (xl == "") {
                        alert("请输入学历");
                        return false;
                    }
                    if (gzxz == "") {
                        alert("请输入工作性质");
                        return false;
                    }
                    if (detailsName2 == "") {
                        alert("请输入原从事职位");
                        return false;
                    }
                    if (job == "") {
                        alert("请输入期望具体工作名称");
                        return false;
                    }
                    if (willMoney == "") {
                        alert("请选择期望薪资");
                        return false;
                    }
                    if (address == "") {
                        alert("请输入居住地址");
                        return false;
                    }
                    if (address1 == "") {
                        alert("请选择希望上班地点");
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
                    if (endDate == "") {
                        alert("请输入有效期");
                    }
                    if (content == "") {
                        alert("请输入个人情况介绍");
                        return false;
                    }
                    if (yq == "") {
                        alert("请输入要求");
                        return false;
                    }


                    return true;
                }
            };
        })
    })
    //搜索框区域
    //街道框
    var cityId = $('#cityId').val();
    $.ajax({
        type: 'post',
        url: '/Ashx/Comm.ashx',
        data: {
            action: "GetAreaList",
            type: 3,
            pid: cityId,
        },
        success: function (res) {
            var data = JSON.parse(res);
            if (data.status == 10001) {
                var str = "";
                $('.searchBar .listOne').html('');
                if (data.dataList.length > 0) {
                    for (var i = 0; i < data.dataList.length; i++) {
                        str += '<li dataId="' + data.dataList[i].id + '">' + data.dataList[i].name + '</li>'
                    }
                    $('.searchBar .listOne').append(str)
                }
            }
        }
    });
    //类别框
    $.ajax({
        type: 'post',
        url: '/Ashx/Comm.ashx',
        data: {
            action: "GetShiyedanweiChildList",
        },
        success: function (res) {
            var data = JSON.parse(res);
            if (data.status == 10001) {
                var str = "";
                $('.searchBar .listTwo').html('');
                if (data.dataList.length > 0) {
                    for (var i = 0; i < data.dataList.length; i++) {
                        str += '<li dataId="' + data.dataList[i].id + '">' + data.dataList[i].name + '</li>'
                    }
                    $('.searchBar .listTwo').append(str)
                }
            }
        }
    });
    //点击更多筛选条件发送请求获取大类
    var lanmu = 1;
    $('.searchBox .searchBar .selectFore .more').on('click', function () {
        var thiss = $(this).parent().parent().find(".ycy").attr("id");
        index = thiss;

        if (index == 'ycy1') {
            lanmu = 1
        } else if (index == 'ycy3') {
            lanmu = 0
        }
        $.ajax({
            type: 'get',
            url: '/Ashx/Comm.ashx',
            data: {
                action: "GetJobTypeListByLanmu",
                type: lanmu,
                pid: 0,
            },
            async: true,
            success: function (res) {
                var data = JSON.parse(res);
                //var title = '<div class="title"><span>职位分类</span></div><div class="clear">';
                var title = '';
                var str = '';
                for (var i = 0; i < data.dataList.length; i++) {
                    if ((i + 1) % 4 == 0) {
                        str += '<div class="smallTitle"><input type="checkbox" father pid=' + data.dataList[i].id + ' name="' + data.dataList[i].id + 'All" value="' + data.dataList[i].id + 'All" /><p>' + data.dataList[i].name + '</p><span row=' + Math.floor((i + 4) / 4) + ' num=' + (i + 1) % 4 + ' pid=' + data.dataList[i].id + ' class="selectdown"></span></div><div rows=' + Math.floor((i + 4) / 4) + ' num=1 class="smallContent smallContent1 clear"></div><div rows=' + Math.floor((i + 4) / 4) + ' num=2 class="smallContent smallContent2 clear"></div><div rows=' + Math.floor((i + 4) / 4) + ' num=3 class="smallContent smallContent3 clear"></div><div rows=' + Math.floor((i + 4) / 4) + ' num=0 class="smallContent smallContent4 clear"></div>'
                    } else {
                        str += '<div class="smallTitle"><input type="checkbox" father pid=' + data.dataList[i].id + ' name="' + data.dataList[i].id + 'All" value="' + data.dataList[i].id + 'All" /><p>' + data.dataList[i].name + '</p><span row=' + Math.floor((i + 4) / 4) + ' num=' + (i + 1) % 4 + ' pid=' + data.dataList[i].id + ' class="selectdown"></span></div>'
                    }
                }
                title = title + str + '</div>';
                $('.moreTableContent1').html(title)
            }
        })
    })
    $('.moreTableContent1').on('click', 'span.selectdown', function () {
        var _this = $(this);
        //判断是否有内容 有就不发请求
        if ($("div[rows=" + $(this).attr('row') + "][num=" + $(this).attr('num') + "]").html() == '') {
            $.ajax({
                type: 'post',
                url: '/Ashx/Comm.ashx',
                data: {
                    action: "GetJobTypeListByLanmu",
                    type: lanmu,
                    pid: $(this).attr('pid'),
                },
                success: function (res) {
                    var data = JSON.parse(res);
                    var str = '<b></b>';
                    for (var i = 0; i < data.dataList.length; i++) {
                        str += '<p class="left"><input type="checkbox" child name="' + _this.attr('pid') + '" value="' + data.dataList[i].id + '"/><span class="left">' + data.dataList[i].name + '</span></p>'
                    }
                    var rowvalue = _this.attr('row')
                    var numvalue = _this.attr('num')
                    $("div[rows=" + rowvalue + "][num=" + numvalue + "]").html(str);
                    var showing = $("div[rows=" + rowvalue + "][num=" + numvalue + "]").css('display')
                    $("div[rows][num]").css('display', 'none');
                    if (showing == 'none') {
                        $("div[rows=" + rowvalue + "][num=" + numvalue + "]").css('display', 'block')
                    }
                }
            })
        } else {
            var rowvalue = $(this).attr('row')
            var numvalue = $(this).attr('num')
            var showing = $("div[rows=" + rowvalue + "][num=" + numvalue + "]").css('display')
            $("div[rows][num]").css('display', 'none');
            if (showing == 'none') {
                $("div[rows=" + rowvalue + "][num=" + numvalue + "]").css('display', 'block')
            } else {
                $("div[rows=" + rowvalue + "][num=" + numvalue + "]").css('display', 'none')
            }
        }

    })
    //点击其他地方收起下拉框
    $(document).click(function (event) {
        $('.searchBox .searchBar .listOne').slideUp(300)
        $('.searchBox .searchBar .listTwo').slideUp(300)
        $('.searchBox .searchBar .listThree').slideUp(300)
    })
    $(document).on("click", [$('.searchBox .searchBar .listOne'), $('.searchBox .searchBar .listTwo'), $('.searchBox .searchBar .listThree')], function (event) {
        event.stopPropagation();
    })
    //街道下拉框
    $('.searchBox .searchBar .selectOne').on("click", function (event) {
        var thiss = $(this).parent().find(".ycy").attr("id");
        index = thiss;
        event.stopPropagation();
        $('.searchBox .searchBar .listTwo').slideUp(300)
        var showing = $('.searchBox .searchBar .listOne').css('display')
        if (showing == 'block') {
            $('.searchBox .searchBar .listOne').slideUp(300)
        } else {
            $('.searchBox .searchBar .listOne').slideDown(300)
        }
    });
    //点击街道下拉框的选项赋值
    $('.searchBox .searchBar .listOne').on("click", "li", function () {
        $('.searchBox .searchBar .selectOne p').html($(this).html())
        $('.searchBox .searchBar .selectOne p').attr('dataId', $(this).attr("dataid"))
        $("#" + index + ' input[name=jiedao]').val($(this).attr("dataid"))
    })
    //类别下拉框
    $('.searchBox .searchBar .selectTwo').on("click", function (event) {
        var thiss = $(this).parent().find(".ycy").attr("id");
        index = thiss;
        event.stopPropagation();
        $('.searchBox .searchBar .listTwo').css('left', $('.searchBox .searchBar .selectTwo').position().left + 'px')
        $('.searchBox .searchBar .listOne').slideUp(300)
        $('.searchBox .searchBar .listThree').slideUp(300)
        var showing = $('.searchBox .searchBar .listTwo').css('display')
        if (showing == 'block') {
            $('.searchBox .searchBar .listTwo').slideUp(300)
        } else {
            $('.searchBox .searchBar .listTwo').slideDown(300)
        }
    });
    //点击类别下拉框赋值
    $('.searchBox .searchBar .listTwo').on("click", "li", function () {
        $('.searchBox .searchBar .selectTwo p').html($(this).html());
        $('.searchBox .searchBar .selectTwo p').attr('value', $(this).attr("dataid"))
        $("#" + index + ' input[name=leibie]').val($(this).attr("dataid"))
    })
    //性别下拉框
    $('.searchBox .searchBar .selectThree').on("click", function (event) {
        var thiss = $(this).parent().find(".ycy").attr("id");
        index = thiss;
        event.stopPropagation();
        $('.searchBox .' + $(this).attr('jrzp') + ' .selectThree').css('left', $('.searchBox .searchBar .selectThree').position().left + 'px')
        $('.searchBox .searchBar .listOne').slideUp(300)
        var showing = $('.searchBox .searchBar .listThree').css('display')
        if (showing == 'block') {
            $('.searchBox .searchBar .listThree').slideUp(300)
        } else {
            $('.searchBox .searchBar .listThree').slideDown(300)
        }
    });
    //性别下拉框赋值
    $('.searchBox .searchBar .listThree').on("click", "li", function () {
        $('.searchBox .searchBar .selectThree p').html($(this).html())
        $('.searchBox .searchBar .selectThree p').attr('value', $(this).attr("value"))
        $("#" + index + ' input[name=xinbie]').val($(this).attr("value"))
    })
    //下标点击切换位置
    $('.searchBox .topSearchList li').on('click', 'a', function () {
        $(this).parent().siblings().children().removeClass('active')
        $(this).addClass('active')
        $('.searchBox .underline .triangle').css('left', $(this).position().left - 38 + $(this).width() / 2 + 'px')
        if ($(this).attr('jrzp') == 'enterprises' || $(this).attr('jrzp') == 'jobFair' || $(this).attr('jrzp') == 'jobMessage') {
            $('.searchBox .underline .triangle').css('background', '#FFF')
        } else if ($(this).attr('jrzp') == 'store' || $(this).attr('jrzp') == 'factory' || $(this).attr('jrzp') == 'company') {
            $('.searchBox .underline .triangle').css('background', '#FFF')
        }
    })
    //点击切换搜索种类
    $('.searchBox .topSearchList li').on('click', 'a', function () {
        $(".searchBox .searchBar").css('display', "none")
        $(".searchBox ." + $(this).attr('jrzp')).css('display', "block")
        $('.searchBox .searchBar .selectOne p').html('城市')
        $('.searchBox .searchBar .selectThree p').html('性别')
        $('.moreTable input').prop('checked', false);
        $('.mask .moreTable .moreTableTop ul').html('');
    })
    //点击搜索框发送请求
    //店面
    $('.searchBox .store .searchButton ').on('click', function () {
        var jiedao = $('.searchBox .store .ycy input[name=jiedao]').val()
        var xinbie = $('.searchBox .store .ycy input[name=xinbie]').val()
        var bigJobClass = $('.searchBox .store .ycy input[name=bigJobClass]').val()
        var smallJobClass = $('.searchBox .store .ycy input[name=smallJobClass]').val()
        var salary = $('.searchBox .store .ycy input[name=salary]').val()
        var exp = $('.searchBox .store .ycy input[name=exp]').val()
        var edu = $('.searchBox .store .ycy input[name=edu]').val()
        var jobProp = $('.searchBox .store .ycy input[name=jobProp]').val()
        var content = $('.searchBox .store .searchInput input').val()
        bigJobClass = bigJobClass.substr(0, bigJobClass.length - 1)
        smallJobClass = smallJobClass.substr(0, smallJobClass.length - 1)
        var url = ''
        if (jiedao != '') {
            url = url + "cityId=" + jiedao + "&"
        }
        if (xinbie != '') {
            url = url + "sex=" + xinbie + "&"
        }
        if (bigJobClass != '') {
            url = url + "sortIds=" + bigJobClass + "&"
        }
        if (smallJobClass != '') {
            url = url + "jobIds=" + smallJobClass + "&"
        }
        if (salary != '') {
            url = url + "money=" + salary + "&"
        }
        if (exp != '') {
            url = url + "workTime=" + exp + "&"
        }
        if (edu != '') {
            url = url + "qualification=" + edu + "&"
        }
        if (jobProp != '') {
            url = url + "jobNature=" + jobProp + "&"
        }
        if (content != '') {
            $.ajax({
                type: "post",
                url: "/ashx/Comm.ashx",//接口地址
                data: {
                    "action": "GetSelectBystate",
                    "keyWords": encodeURIComponent(content)
                },
                datatype: "json"
            })
            url = url + "keyWords=" + encodeURIComponent(content) + "&"
        }
        if (url != "") {
            url = "?" + url.substring(0, url.length - 1)
        }
        window.location.href = "/SearchJob/SearchJobFake.aspx" + url;
    })
    //工厂
    $('.searchBox .factory .searchButton ').on('click', function () {
        var jiedao = $('.searchBox .factory .ycy input[name=jiedao]').val()
        var xinbie = $('.searchBox .factory .ycy input[name=xinbie]').val()
        var content = $('.searchBox .factory .searchInput input').val()
        var url = ''
        if (jiedao != '') {
            url = url + "cityId=" + jiedao + "&"
        }
        if (xinbie != '') {
            url = url + "sex=" + xinbie + "&"
        }
        url = url + "sortId=419&"
        if (content != '') {
            $.ajax({
                type: "post",
                url: "/ashx/Comm.ashx",//接口地址
                data: {
                    "action": "GetSelectBystate",
                    "keyWords": encodeURIComponent(content)
                },
                datatype: "json"
            })
            url = url + "keyWords=" + encodeURIComponent(content) + "&"
        }
        if (url != "") {
            url = "?" + url.substring(0, url.length - 1)
        }

        window.location.href = "/SearchJob/SearchJobFake.aspx" + url;
    })
    //企业
    $('.searchBox .company .searchButton ').on('click', function () {
        var jiedao = $('.searchBox .company .ycy input[name=jiedao]').val()
        var xinbie = $('.searchBox .company .ycy input[name=xinbie]').val()
        var bigJobClass = $('.searchBox .company .ycy input[name=bigJobClass]').val()
        var smallJobClass = $('.searchBox .company .ycy input[name=smallJobClass]').val()
        var salary = $('.searchBox .company .ycy input[name=salary]').val()
        var exp = $('.searchBox .company .ycy input[name=exp]').val()
        var edu = $('.searchBox .company .ycy input[name=edu]').val()
        var jobProp = $('.searchBox .company .ycy input[name=jobProp]').val()
        var content = $('.searchBox .company .searchInput input').val()
        bigJobClass = bigJobClass.substr(0, bigJobClass.length - 1)
        smallJobClass = smallJobClass.substr(0, smallJobClass.length - 1)
        var url = ''
        if (jiedao != '') {
            url = url + "cityId=" + jiedao + "&"
        }
        if (xinbie != '') {
            url = url + "sex=" + xinbie + "&"
        }
        if (bigJobClass != '') {
            url = url + "sortIds=" + bigJobClass + "&"
        }
        if (smallJobClass != '') {
            url = url + "jobIds=" + smallJobClass + "&"
        }
        if (salary != '') {
            url = url + "money=" + salary + "&"
        }
        if (exp != '') {
            url = url + "workTime=" + exp + "&"
        }
        if (edu != '') {
            url = url + "qualification=" + edu + "&"
        }
        if (jobProp != '') {
            url = url + "jobNature=" + jobProp + "&"
        }
        if (content != '') {
            $.ajax({
                type: "post",
                url: "/ashx/Comm.ashx",//接口地址
                data: {
                    "action": "GetSelectBystate",
                    "keyWords": encodeURIComponent(content)
                },
                datatype: "json"
            })
            url = url + "keyWords=" + encodeURIComponent(content) + "&"
        }
        if (url != "") {
            url = "?" + url.substring(0, url.length - 1)
        }
        window.location.href = "/SearchJob/SearchJobFake.aspx" + url;
    })
    //事业单位
    $('.searchBox .enterprises .searchButton ').on('click', function () {
        var leibie = $('.searchBox .enterprises .ycy input[name=leibie]').val()
        var content = $('.searchBox .enterprises .searchInput input').val()
        var url = ''
        if (leibie != '') {
            url = url + "ntId2=" + leibie + "&"
        }
        if (content != '') {
            url = url + "keyWords=" + encodeURIComponent(content) + "&"
        }
        if (url != "") {
            url = "?" + url.substring(0, url.length - 1)
        }
        window.location.href = "/InstitutionRecruit/InstitutionRecruitList.aspx" + url;
    })
    //招聘会
    $('.searchBox .jobFair .searchButton ').on('click', function () {
        var content = $('.searchBox .jobFair .searchInput input').val()
        var url = ''
        if (content != '') {
            url = url + "keyWords=" + encodeURIComponent(content) + "&"
        }

        if (url != "") {
            url = "?" + url.substring(0, url.length - 1)
        }
        window.location.href = "/JobFair/SearchJobFair.aspx" + url;
    })
    //职讯
    $('.searchBox .jobMessage .searchButton ').on('click', function () {
        var content = $('.searchBox .jobMessage .searchInput input').val()
        var url = ''
        if (content != '') {
            url = url + "keyWords=" + encodeURIComponent(content) + "&"
        }
        if (url != "") {
            url = "?" + url.substring(0, url.length - 1)
        }
        window.location.href = "/NewsFlash/NewsFlash.aspx" + url;
    })

    //输入搜索值发送请求并显示下拉框
    //获得焦点
    $(".store .searchInput input,.factory .searchInput input,.company .searchInput input").focus(function () {
        $('.searchBox .wp .searchAppend').css({ 'width': $(this).width() })
        var jrzp = $(".topSearchList ul li a.active").attr("jrzp");
        var lanmu = 0;
        if (jrzp == "company") {
            lanmu = 0;
        }
        else if (jrzp == "store") {
            lanmu = 1;
        }
        else if (jrzp == "factory") {
            lanmu = 2;
        }

        $.ajax({
            url: '/ashx/SearchAreaAndJob.ashx?action=GetJobType',
            data: {
                lanmu: lanmu,
                keyWords: encodeURIComponent($(this).val())
            },
            success: function (res) {
                var data = JSON.parse(res)
                if (data.status == 10001) {
                    var html = '';
                    for (var i = 0; i < data.msg.length; i++) {
                        if (i < 10) {
                            html += '<div class="searchList" id="' + data.msg[i].id + '">' + data.msg[i].name + '</div>'
                        }
                    }
                    $('.searchBox .wp .searchAppend').css({ 'display': 'block' })
                    $('.searchBox .wp .searchAppend').html(html)
                } else if (data.status == 30002) {
                    $('.searchBox .wp .searchAppend').html('')
                    $('.searchBox .wp .searchAppend').css('display', 'none')
                }
            }, error: function () {
                $('.searchBox .wp .searchAppend').html('')
                $('.searchBox .wp .searchAppend').css('display', 'none')
            }
        })
    })
    //输入框值改变
    $(".store .searchInput,.factory .searchInput,.company .searchInput").keyup(function () {
        $('.searchBox .wp .searchAppend').css({ 'width': $(this).width() });
        var jrzp = $(".topSearchList ul li a.active").attr("jrzp");
        var lanmu = 0;
        if (jrzp == "company") {
            lanmu = 0;
        }
        else if (jrzp == "store") {
            lanmu = 1;
        }
        else if (jrzp == "factory") {
            lanmu = 2;
        }
        $.ajax({
            url: '/ashx/SearchAreaAndJob.ashx?action=GetJobType',
            data: {
                lanmu: lanmu,
                keyWords: encodeURIComponent($(this).find('input').val())
            },
            success: function (res) {
                var data = JSON.parse(res)
                if (data.status == 10001) {
                    var html = '';
                    for (var i = 0; i < data.msg.length; i++) {
                        if (i < 10) {
                            html += '<div class="searchList" id="' + data.msg[i].id + '">' + data.msg[i].name + '</div>'
                        }
                    }
                    $('.searchBox .wp .searchAppend').css({ 'display': 'block' })
                    $('.searchBox .wp .searchAppend').html(html)
                } else if (data.status == 30002) {
                    $('.searchBox .wp .searchAppend').html('')
                    $('.searchBox .wp .searchAppend').css('display', 'none')
                }
            }, error: function () {
                $('.searchBox .wp .searchAppend').html('')
                $('.searchBox .wp .searchAppend').css('display', 'none')
            }
        })

    })
    //点击切换index值
    $('.searchBox .topSearchList li a').click(function () {
        indexClass = $(this).attr('jrzp')
    })

    //点击下拉将id储到隐藏域并赋值
    $('.searchBox .wp .searchAppend').on('click', '.searchList', function () {
        //console.log($("." + indexClass).find('.searchInput input'))
        $("." + indexClass).find('.searchInput input').val($(this).html())
        $('input[name=searchID]').val($(this).attr('id'))
    })

    //点击其他地方收起下拉框
    $(document).click(function (event) {
        $('.searchBox .wp .searchAppend').css('display', 'none')
        $('.searchBox .wp .searchAppend').html('')
    })
    $(document).on("click", '.searchInput', function (event) {
        event.stopPropagation();
    })
    //topOneMain区域
    //tabe选项卡切换
    $('.topOneMain .topOneMainRight b').on('mouseover', function () {
        $(this).siblings().removeClass('active')
        $(this).addClass('active');
        $('.topOneMain .topOneMainRight>div').css('display', 'none');
        $('.topOneMain .topOneMainRight .' + $(this).attr('jrzp')).css('display', 'block')
    })
    $(function () {
        var num = 0;
        setInterval(function () {
            num++;
            if (num == 6) {
                $('.news .scrollBox').css({ 'top': '0px' });
                num = 1;
            }
            $('.news .scrollBox').stop().animate({ 'top': -30 * num + 'px' }, 500)
        }, 2000)
    })
    //文字滚动
    $(function () {
        var num = 0;
        setInterval(function () {
            num++;
            if (num == 6) {
                $('.resume .scrollBox').css({ 'top': '0px' });
                num = 1;
            }
            $('.resume .scrollBox').stop().animate({ 'top': -30 * num + 'px' }, 500)
        }, 2000)
    })
    //topTwoMain区域
    //tabe选项卡切换
    $('.topTwoMain .afficheNav a.newsP').on('mouseover', function () {
        $(this).siblings().removeClass('active')
        $(this).addClass('active');
        $('.topTwoMain .newsComm').css('display', 'none');
        $('.topTwoMain .' + $(this).attr('jrzp')).css('display', 'block')
    })
    //Main区域
    //tabe选项卡切换
    $('.Main .list .rightList .mainNav a').on('click', function () {
        $($(this).parent().parent()).find('a').removeClass('active');
        $(this).addClass('active');
    })
    //Mark的Tab切换
    //职位
    $('.mask .moreTable .moreTableNav .jobclass').on('click', function () {
        $('.moreTableContent').css('display', 'none')
        $('.moreTableContent1').css('display', 'block')
    })
    //薪资
    $('.mask .moreTable .moreTableNav .salary').on('click', function () {
        if ($('.moreTableContent2').html() == '') {
            $.ajax({
                type: 'post',
                url: '/Ashx/Comm.ashx',
                data: {
                    action: "GetJobMoneyList",
                },
                success: function (res) {
                    var data = JSON.parse(res);
                    var str = '';
                    var title = '<div class="title"><span>薪资</span></div><div class="clear">';
                    for (var i = 0; i < data.dataList.length; i++) {
                        str += '<div class="smallTitle"><input type="checkbox" father pid=' + data.dataList[i].id + ' name="' + data.dataList[i].id + 'Salary" value="' + data.dataList[i].id + 'Salary" /><p>' + data.dataList[i].name + '</p></div>'
                    };
                    title = title + str + '</div>';
                    $('.moreTableContent2').html(title);
                    $('.moreTableContent').css('display', 'none')
                    $('.moreTableContent2').css('display', 'block')
                }
            })
        } else {
            $('.moreTableContent').css('display', 'none')
            $('.moreTableContent2').css('display', 'block')
        }
    })
    //经验
    $('.mask .moreTable .moreTableNav .experience').on('click', function () {
        if ($('.moreTableContent3').html() == '') {
            $.ajax({
                type: 'post',
                url: '/Ashx/Comm.ashx',
                data: {
                    action: "GetWorkTimeList",
                },
                success: function (res) {
                    var data = JSON.parse(res);
                    var str = '';
                    var title = '<div class="title"><span>经验</span></div><div class="clear">';
                    for (var i = 0; i < data.dataList.length; i++) {
                        str += '<div class="smallTitle"><input type="checkbox" father pid=' + data.dataList[i].id + ' name="' + data.dataList[i].id + 'Exp" value="' + data.dataList[i].id + 'Exp" /><p>' + data.dataList[i].name + '</p></div>'
                    };
                    title = title + str + '</div>';
                    $('.moreTableContent3').html(title);
                    $('.moreTableContent').css('display', 'none')
                    $('.moreTableContent3').css('display', 'block')
                }
            })
        } else {
            $('.moreTableContent').css('display', 'none')
            $('.moreTableContent3').css('display', 'block')
        }
    })
    //学历
    $('.mask .moreTable .moreTableNav .education').on('click', function () {
        if ($('.moreTableContent4').html() == '') {
            $.ajax({
                type: 'post',
                url: '/Ashx/Comm.ashx',
                data: {
                    action: "GetQuaList",
                },
                success: function (res) {
                    var data = JSON.parse(res);
                    var str = '';
                    var title = '<div class="title"><span>学历</span></div><div class="clear">';
                    for (var i = 0; i < data.dataList.length; i++) {
                        str += '<div class="smallTitle"><input type="checkbox" father pid=' + data.dataList[i].id + ' name="' + data.dataList[i].id + 'Edu" value="' + data.dataList[i].id + 'Edu" /><p>' + data.dataList[i].name + '</p></div>'
                    };
                    title = title + str + '</div>';
                    $('.moreTableContent4').html(title);
                    $('.moreTableContent').css('display', 'none')
                    $('.moreTableContent4').css('display', 'block')
                }
            })
        } else {
            $('.moreTableContent').css('display', 'none')
            $('.moreTableContent4').css('display', 'block')
        }
    })
    //工作性质
    $('.mask .moreTable .moreTableNav .jobprop').on('click', function () {
        $('.moreTableContent').css('display', 'none')
        $('.moreTableContent5').css('display', 'block')
    })
    var sydwzphtml = '';
    $(".sydwzp .left li").each(function () {
        var index = $(".sydwzp .left li").index($(this));
        if (index > 5) {
            sydwzphtml += $(this).prop('outerHTML')
            $(this).remove();
        }
    });
    $(".sydwzp .rightList").html(sydwzphtml);

    var zphtml = '';
    $(".zph .left li").each(function () {
        var index = $(".zph .left li").index($(this));
        if (index > 2) {
            zphtml += $(this).prop('outerHTML')
            $(this).remove();
        }
    });
    $(".zph .rightList").html(zphtml);

    var xyzphtml = '';
    $(".xyzph .left li").each(function () {
        var index = $(".xyzph .left li").index($(this));
        if (index > 2) {
            xyzphtml += $(this).prop('outerHTML')
            $(this).remove();
        }
    });
    $(".xyzph .rightList").html(xyzphtml);


    ////计算各分类对应的职位数
    //$(".accountJobTypeCount").each(function () {
    //    var ddObj=$(this);
    //    var type = ddObj.attr("myid");
    //    if (parseInt(type) > 0)
    //    {
    //        $.ajax({
    //            type: 'post',
    //            url: '/Ashx/Index.ashx',
    //            data: {
    //                action: "GetRelCountByType",
    //                countyId: $("#county").val(),
    //                id: type
    //            },
    //            success: function (res) {
    //                var data = JSON.parse(res);
    //                if (data.status == 10001)
    //                {
    //                    ddObj.find("span").find("a").html(data.msg);
    //                }
    //            }
    //        })
    //    }
    //});
    //计算各分类对应的职位数
    $(".accountJobTypeCount2").each(function () {
        var ddObj = $(this);
        var type = ddObj.attr("myid");
        console.log($("#cityId").val())
        if (parseInt(type) > 0) {
            $.ajax({
                type: 'post',
                url: '/Ashx/Index.ashx',
                data: {
                    action: "GetRelCountByType2",
                    cityId: $("#cityId").val(),
                    id: type
                },
                success: function (res) {
                    var data = JSON.parse(res);
                    console.log(data)
                    if (data.status == 10001) {
                        ddObj.find("span").find("a").html(data.msg);
                    }
                }
            })
        }
    });

    $(".zaizhaoZhiwei").each(function () {
        var zaizhaozhiwei = $(this).html();
        if (zaizhaozhiwei.length <= 8) {
            $(this).html(zaizhaozhiwei);
        }
        else {
            $(this).html(zaizhaozhiwei.substr(0, 8));
        }
    });

    $(".mendianTabLi").click(function () {
        var index = $(".mendianTabLi").index($(this));
        $(".mendianJob").eq(index).css("display", "block").siblings(".mendianJob").css("display", "none");
    });
    $(".gongchangTabLi").click(function () {
        var index = $(".gongchangTabLi").index($(this));
        $(".gongchangJob").eq(index).css("display", "block").siblings(".gongchangJob").css("display", "none");
    });
    $(".bangongshiTabLi").click(function () {
        var index = $(".bangongshiTabLi").index($(this));
        $(".bangongshiJob").eq(index).css("display", "block").siblings(".bangongshiJob").css("display", "none");
    });

    $(".companyTuijianLeftNavLi").mouseover(function () {
        var index = $(".companyTuijianLeftNavLi").index($(this));
        $(this).addClass("companyTuijianLeftNavLiOn").siblings(".companyTuijianLeftNavLi").removeClass("companyTuijianLeftNavLiOn");
        $(".companyTuijian .topline").eq(index).css("display", "block").siblings(".companyTuijian .topline").css("display", "none");
    });

    var areaPicLen = $(".areaPic").length;
    if (areaPicLen <= 3) {
        $(".areaPic").css({ "width": "360px" });
        $(".areaPic").each(function () {
            var index = $(".areaPic").index($(this));
            if (index % 3 == 2) {
                $(this).css({ "margin-right": "0" });
            }
        });
    }
    else if (areaPicLen <= 4) {
        $(".areaPic").css({ "width": "269px", "margin-right": "8px" });
        $(".areaName").css({ "left": "15px", "top": "10px" });
        $(".areaPic").each(function () {
            var index = $(".areaPic").index($(this));
            if (index % 4 == 3) {
                $(this).css({ "margin-right": "0" });
            }
        });
    }
    else if (areaPicLen <= 5) {
        $(".areaPic").css({ "width": "213px", "margin-right": "8px" });
        $(".areaName").css({ "left": "15px", "top": "10px" });
        $(".areaPic").each(function () {
            var index = $(".areaPic").index($(this));
            if (index % 5 == 4) {
                $(this).css({ "margin-right": "0" });
            }
        });
    }
    else {
        $(".areaPic").css({ "width": "175px", "margin-right": "8px" });
        $(".areaName").css({ "left": "15px", "top": "10px" });
        $(".areaPic").each(function () {
            var index = $(".areaPic").index($(this));
            if (index % 6 == 5) {
                $(this).css({ "margin-right": "0" });
            }
        });
    }

    $(".sydwzp li").each(function () {
        if ($(this).attr("istoday") == 1) {
            $(this).find(".sydwzptime").css({ "color": "#f00" });
        }
    });

    $(".xyzph li").each(function () {
        if ($(this).attr("istoday") == 1) {
            $(this).find(".sydwzptime").css({ "color": "#f00" });
        }
    });


    $(".typeNameAlt").each(function () {
        var index = $(".typeNameAlt").index($(this));
        var altHtml = $(this).html();
        $(".gonggongfuwuTitle a").eq(index).attr("title", altHtml);
    });

})
