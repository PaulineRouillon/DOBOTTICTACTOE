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
                    "步骤一: 首先确认Leapmotion是否连接成功，Leapmotion镜面会亮起红灯，并且可以看到桌面右下角有绿色图标",
                    "步骤二: 进入Leapmotion模块，点击开始按钮，机械臂3D图形实时显示姿态",
                    "步骤三: 手摆放在Leapmotion模块的上方，左右上下移动，机械臂也会实时跟随移动",
                    "步骤四: 通过握拳，张开等动作，可以控制吸盘，爪子的开合",
                    "步骤五:通过手背向下动作，可以停止机械臂的跟随，从而离开Leapmotion控制区域",
                    "步骤一: 首先确认Leapmotion是否连接成功，Leapmotion镜面会亮起红灯，并且可以看到桌面右下角有绿色图标"
            ];

        var display_en_str=
            [
                    "Step 1: Confirm the connection of the Leap Motion with PC. When connected, the red light turns on, and the icon on the status bar of the PC desktop will turn green",
                    "Step 2: Click the start button on the Leap Motion Application of Dobot Studio. And the software will show the real-time 3D pose of the robotic arm",
                    "Step 3: Move your hand above the Leap Motion, and the robotic arm will move left and right just as your hand does",
                    "Step 4: Make a fist or open your hand to control the suction cup or gripper",
                    "Step 5: Turn over your hand to stop the control of the robotic arm, and then get your hand off the control area",
                    "Step 1: Confirm the connection of the Leap Motion with PC. When connected, the red light turns on, and the icon on the status bar of the PC desktop will turn green"
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
            if(i==4){
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
        for(var j = 0;j<display_en_str.length;j++){
            var str_en = display_en_str[j];
            $('.swiper-slide span').eq(j+1).text(str_en);
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