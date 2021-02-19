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
        window.dobot.config("open");
    }
});


//实现多国语言切换的功能
        var display_zh_str=
            [
                    "步骤一:安装写字画画套件，选择末端为笔",
                    "步骤二:插入DobotStudio软件自带的图案或者手动输入文字内容 ",
                    "步骤三:点击设置，进入写字画画设置（可以设置相应的速度和加速度，以及抬笔高度）；按住小臂上的圆形按钮Unlock key不放并拖动小臂将笔尖调整至写字纸平面上",
                    "步骤四:点击AutoZ获取并保存当前的Z值（保存的Z值，即设置中的下降位置参数），点击开始按钮即可开始写字",
                    "步骤一:安装写字画画套件，选择末端为笔"
            ];

        var display_en_str=
            [
                    "Step 1: Install the pen tool and select it from the drop-down menu",
                    "Step 2: Insert an image or enter text into the Dobot Studio environment",
                    "Step 3: Use the unlock key or the Z +/- button to move the pen tip to the surface of the writing paper. Then click the AutoZ button. Alternatively, click the settings button and set your desired drawing parameters",
                    "Step 4: Click AutoZ to save the current Z-value and click the start button to begin writing",
                    "Step 1: Install the pen tool and select it from the drop-down menu"
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
        $('.btn_text').text('简体中文');
        //轮播图小点上方的文字切换
        $('.c_g_text').text("以后不再显示此向导");
        for(var i = 0;i<display_zh_str.length;i++){
            var str_zh = display_zh_str[i];
            $('.swiper-slide span').eq(i+1).text(str_zh);
            if(i==1){
                $('.lang-img-02').attr('src','image/xiezhihuahua-zh-02.png');
            }
            if(i==2){
                $('.lang-img-03').attr('src','image/xiezhihuahua-zh-03.png');
            }
            if(i==3){
                $('.swiper-slide span').eq(0).text(str_zh);
            }
        }
    }
    else{
        //按钮中图标的切换
        $('.btn_img').attr('src','image/en.jpg');
        $('.btn_text').text('English');
        //轮播图小点上方的文字切换
        $('.c_g_text').text("This wizard is no longer shown");
        $('.note').css('padding-top',"8px");
        for(var j = 0;j<display_en_str.length;j++){
            var str_en = display_en_str[j];
            $('.swiper-slide span').eq(j+1).text(str_en);
            if(j==1){
                $('.lang-img-02').attr('src','image/xiezhihuahua-en-02.png');
            }
            if(j==2){
                $('.lang-img-03').attr('src','image/xiezhihuahua-en-03.png');
            }
            if(j==3){
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

if(cur_lan == "zh-hans"){
    set_lang(1);
}
else{
    set_lang(0);
}