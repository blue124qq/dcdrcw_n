layui.use(['layer', 'form', 'flow', 'jquery'], function () {
    var $ = layui.jquery;
    $(".close").click(function () {
        $(".footerGg").hide();
    });
    $(function () {
        $(".tuichu").click(function () {
            $.ajax({
                type: 'post',
                url: '/ashx/LoginOut.ashx',
                success: function (res) {
                    var data = JSON.parse(res);
                    if (data.status == 10001) {
                        window.location.href = '/';
                    } else {
                        //alert(data);
                    }
                }
            })
        });
        var wHeight = $(window).height();
        var top1 = $(document).scrollTop();
        if (top1 > wHeight) {
            $(".goTop").show();
        } else {
            $(".goTop").hide();
        }
        $(window).scroll(function () {
            var top = $(this).scrollTop();
            if (top > wHeight) {
                $(".goTop").show();
            } else {
                $(".goTop").hide();
            }
        });
        $(".goTop").click(function () {
            $('body,html').animate({ scrollTop: 0 }, 1000);
            return false;
        });
        
    });
    
});
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function IsNullOrEmpty(value) {
    if (value != undefined && value != "null" && value != "" && value != "0") {
        return true;
    } else {
        return false;
    }
}
function OrderByClick(key, value) {
    var newUrl = "";
    var url = window.location.pathname;
    var cityId = document.getElementById('cityId').value;
    var countyId = document.getElementById('countyId').value;
    var townId = document.getElementById('townId').value;
    var sortId = document.getElementById('sortId').value;
    var jobId = document.getElementById('jobId').value;
    if (url == "/job.shtml") {
        if (IsNullOrEmpty(value)) {
            window.open("/SearchJob/SearchJobFake.aspx?" + key + "=" + value, "_self");
        } else {
            window.open("/SearchJob/SearchJobFake.aspx", "_self");
        }
        return false;
    } else {
        if (cityId > 0) {
            newUrl += "&cityId=" + cityId;
        }
        if (countyId > 0) {
            newUrl += "&countyId=" + countyId;
        }
        if (townId > 0) {
            newUrl += "&townId=" + townId;
        }
        if (sortId > 0) {
            newUrl += "&sortId=" + sortId;
            if (jobId > 0) {
                newUrl += "&jobId=" + jobId;
            }
        }
        if (IsNullOrEmpty(newUrl)) {
            newUrl = newUrl.substring(1, newUrl.length);
            if (IsNullOrEmpty(value)) {
                window.open("/SearchJob/SearchJobFake.aspx?" + newUrl + "&" + key + "=" + value, "_self");
            } else {
                window.open("/SearchJob/SearchJobFake.aspx?" + newUrl, "_self");
            }
        } else {
            if (IsNullOrEmpty(value)) {
                window.open("/SearchJob/SearchJobFake.aspx?" + key + "=" + value, "_self");
            } else {
                window.open("/SearchJob/SearchJobFake.aspx", "_self");
            }
        }
    }

}
function GoSearch(type, value) {
    var cityId = getQueryString("cityId");//市
    var countyId = getQueryString("countyId");//区域
    var townId = getQueryString("townId");//区域
    var sortId = getQueryString("sortId");//行业类别
    var jobId = getQueryString("jobId");
    var jobNature = getQueryString("jobNature");//工作性质
    var workTime = getQueryString("workTime");//工作经验
    var comProp = getQueryString("comProp");//公司性质
    var comSize = getQueryString("comSize");//公司规模
    var qualification = getQueryString("qualification");//学历
    var money = getQueryString("money");//薪资
    var welfareLabel = getQueryString("welfareLabel");//职位标签

    var keyWords = getQueryString("keyWords");//搜索关键字
    var pageNum = getQueryString("pageNum");//显示条数
    var px = getQueryString("px");//0更新时间排序,1薪资排序,2工作经验排序,3学历排序

    var url = "";

    if (type == "cityId") {
        url += "&cityId=" + value;
    } else {
        if (IsNullOrEmpty(cityId)) {
            url += "&cityId=" + cityId;
        }
    }
    if (type == "countyId") {
        url += "&countyId=" + value;
    } else {
        if (IsNullOrEmpty(countyId)) {
            url += "&countyId=" + countyId;
        }
    }
    if (type == "townId") {
        url += "&townId=" + value;
    } else {
        if (IsNullOrEmpty(townId)) {
            url += "&townId=" + townId;
        }
    }

    if (type == "sortId") {
        url += "&sortId=" + value;
    } else {
        if (IsNullOrEmpty(sortId)) {
            url += "&sortId=" + sortId;
        }
    }

    if (type == "jobId") {
        url += "&jobId=" + value;
    } else {
        if (IsNullOrEmpty(jobId)) {
            url += "&jobId=" + jobId;
        }
    }

    if (type == "jobNature") {
        if (IsNullOrEmpty(value)) {
            url += "&jobNature=" + value;
        }
    } else {
        if (IsNullOrEmpty(jobNature)) {
            url += "&jobNature=" + jobNature;
        }
    }

    if (type == "workTime") {
        if (IsNullOrEmpty(value)) {
            url += "&workTime=" + value;
        }
    } else {
        if (IsNullOrEmpty(workTime)) {
            url += "&workTime=" + workTime;
        }
    }

    if (type == "comProp") {
        if (IsNullOrEmpty(value)) {
            url += "&comProp=" + value;
        }
    } else {
        if (IsNullOrEmpty(comProp)) {
            url += "&comProp=" + comProp;
        }
    }

    if (type == "comSize") {
        if (IsNullOrEmpty(value)) {
            url += "&comSize=" + value;
        }
    } else {
        if (IsNullOrEmpty(comSize)) {
            url += "&comSize=" + comSize;
        }
    }

    if (type == "qualification") {
        if (IsNullOrEmpty(value)) {
            url += "&qualification=" + value;
        }
    } else {
        if (IsNullOrEmpty(qualification)) {
            url += "&qualification=" + qualification;
        }
    }

    if (type == "money") {
        if (IsNullOrEmpty(value)) {
            url += "&money=" + value;
        }
    } else {
        if (IsNullOrEmpty(money)) {
            url += "&money=" + money;
        }
    }

    if (type == "welfareLabel") {
        if (IsNullOrEmpty(value)) {
            url += "&welfareLabel=" + value;
        }
    } else {
        if (IsNullOrEmpty(welfareLabel)) {
            url += "&welfareLabel=" + welfareLabel;
        }
    }

    if (type == "keyWords") {
        if (IsNullOrEmpty(value)) {
            url += "&keyWords=" + value;
        }
    } else {
        if (IsNullOrEmpty(keyWords)) {
            url += "&keyWords=" + keyWords;
        }
    }

    if (type == "pageNum") {
        if (IsNullOrEmpty(value)) {
            url += "&pageNum=" + value;
        }
    } else {
        if (IsNullOrEmpty(pageNum)) {
            url += "&pageNum=" + pageNum;
        }
    }

    if (type == "px") {
        if (IsNullOrEmpty(value)) {
            url += "&px=" + value;
        }
    } else {
        if (IsNullOrEmpty(px)) {
            url += "&px=" + px;
        }
    }

    if (IsNullOrEmpty(url)) {
        url = url.substring(1, url.length);
        window.open("/SearchJob/SearchJobFake.aspx?" + url, "_self");
    } else {
        window.open("/SearchJob/SearchJobFake.aspx?", "_self");
    }

}