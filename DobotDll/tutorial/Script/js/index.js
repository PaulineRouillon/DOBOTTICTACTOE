'use strict';

//关闭窗口
$('.close_img').click(function () {
    window.dobot.close();
});

//轮播图功能
var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
});


//点击按钮关闭此向导
var  i = 0;
$('#regText').click(function () {
	i++;
	//console.log("i:",i);
	if(i%2===1)
	{
		// console.log("need close!!");
		window.dobot.config("close");
	}else{
        // console.log("need open!!");
        window.dobot.config("open");
    }
});


//实现多国语言切换的功能
        var display_zh_str=
            [
                    "步骤一: Script模块使用Python脚本语言，适合所有编程爱好者",
                    "步骤二: Dobot接口选择区附带接口说明功能，帮助用户快速上手",
                    "步骤三: 双击对应的Dobot接口，文本编辑器会直接生成它",
                    "步骤四: 文本编辑器内置高亮功能（Dobot接口高亮为绿色，Script框架关键字高亮为蓝色），是用户编程的好帮手",
                    "步骤五: Script内置Python解析器，使用运行控制按钮能简单进行代码的运行操作，运行日志会动态显示",
                    "步骤一: Script模块使用Python脚本语言，适合所有编程爱好者"
            ];

        var display_en_str=
            [
                    "Step 1: The Script module uses the Python scripting language for all programming enthusiasts",
                    "Step 2: Dobot API selection area built-in API description function to help users quickly get started",
                    "Step 3: Double click the corresponding Dobot API, and the text editor will generate it directly",
                    "Step 4: Text editor built-in highlight function (Dobot API highlighted in green, Script frame key highlighted in blue) is a good helper for user programming",
                    "Step 5: Script built-in Python parser, user can simply run the code by using the operation control button, and the running log will be dynamically displayed",
                    "Step 1: The Script module uses the Python scripting language for all programming enthusiasts"


            ];
//点击按钮实现下拉和回收的功能
$('.btn').click(function () {
    $('.dropdown-menu').toggle(300);
});
//修改按钮鼠标移入和移出时的背景样式
$('.btn').hover(function () {
    $(this).css('background','rgba(255,255,255,0.2)');
},(function () {
    $(this).css('background','rgba(255,255,255,0.1)')
})
);

$('.dropdown-menu li a').click(function () {
    //将下拉框选中的文本显示在按钮上
    var text = $(this).text();
    $('.btn_text').text(text);
    $('.dropdown-menu').hide();
    //判断 如果用户点击的是中文选项,向导中的文字切换成中文显示
    if(text == "简体中文"){
        set_lang(1);
    //判断 如果用户点击的是英文选项,向导中的文字切换成英文显示
    }else if(text == "English"){
        set_lang(0);
    }
});


function set_lang(is_zh) {
    if(is_zh)
    {
        //按钮中图标的切换
        $('.btn_img').attr('src','image/zh.jpg');
        $('.btn_text').text("简体中文");
        //轮播图小点上方的文字切换
        $('.c_g_text').text("以后不再显示此向导");
        for(var i = 0;i<display_zh_str.length;i++){
            var str_zh = display_zh_str[i];
            $('.swiper-slide span').eq(i+1).text(str_zh);
            if(i==0){
                $('.lang-img').attr('src','image/script-zh-01.png');
            }
            if(i==4){
                $('.swiper-slide span').eq(0).text(str_zh);
            }
        }
    }
    else{
        //按钮中图标的切换
        $('.btn_img').attr('src','image/en.jpg');
        $('.btn_text').text("English");
        //轮播图小点上方的文字切换
        $('.c_g_text').text("This wizard is no longer shown");
        for(var j = 0;j<display_en_str.length;j++){
            var str_en = display_en_str[j];
            $('.swiper-slide span').eq(j+1).text(str_en);
            if(j==0){
                $('.lang-img').attr('src','image/script-en-01.png');
            }
            if(j==4){
                $('.swiper-slide span').eq(0).text(str_en);
            }
        }
    }
}


//获取地址栏参数
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

var cur_lan = GetQueryString("lang");

if(cur_lan == "zh-hans")
{
    set_lang(1);
}else{
    set_lang(0);
}