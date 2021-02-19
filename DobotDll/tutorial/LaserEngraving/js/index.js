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
                    "步骤一:按下小臂解锁键，并移动到离桌面大概10cm的高度。安装激光末端，并锁紧蝶形螺母",
                    "步骤二:打开侧边栏",
                    "步骤三:下面的操作必须佩戴防护眼镜。在侧边栏里面把激光勾上，此时激光会亮起来。调节激光的焦距旋钮，使激光聚焦成一个点，调节完成需要把激光勾选取消",
                    "步骤四:点击打开按钮，选择图片进行雕刻",
                    "步骤五:点击开始即可以雕刻，注意要保证图片在红色所示的扇形区域内",
                    "步骤一:按下小臂解锁键，并移动到离桌面大概10cm的高度。安装激光末端，并锁紧蝶形螺母"
            ];

        var display_en_str=
            [
                    "Step 1: Hold down the unlock key or use Z+/- button to move the robotic arm to a position about 10 centimeters above the table. Install the laser end effector, and lock it",
                    "Step 2: Open the sidebar according to the diagram below",
                    "Step 3: Wear protective glasses before using laser. Power up the laser by checking the laser check box. Adjust the focal length manually to minimum the light spot. Power down the laser after it’s finished",
                    "Step 4: Open the file dialog and choose the picture to engrave",
                    "Step 5: Guarantee that the whole picture is inside the working area highlighted below",
                    "Step 1: Hold down the unlock key or use Z+/- button to move the robotic arm to a position about 10 centimeters above the table. Install the laser end effector, and lock it"
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
            if(j==4){
                $('.swiper-slide span').eq(0).text(str_en);
            }
        }
    }
}

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
}
else{
    set_lang(0);
}