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
                    "步骤一:点击左边列表，可以看到API变为一个个可拖拽的模块",
                    "步骤二:拖拽任意模块进入操作面板，脚本代码即时生成",
                    "步骤三:再拖拽一个模块与之组合，并且可以编辑模块内容，通过模块之间的组合，完成所需功能",
                    "步骤四:点击开始，机械臂按照自上而下的模块顺序开始执行动作",
                    "步骤一:点击左边列表，可以看到API变为一个个可拖拽的模块"
            ];

        var display_en_str=
            [
                    "Step 1: Click the list on the left to reveal the drag-and-drop API blocks",
                    "Step 2: Drag and drop any API block into the operation panel, and the script code will be automatically generated",
                    "Step 3: Connect API blocks together to create your required function. You can change the parameters within the API blocks",
                    "Step 4: Click play to execute the script",
                    "Step 1: Click the list on the left to reveal the drag-and-drop API blocks"
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
        //按钮中图标的切换
        set_lang(1);
        //判断 如果用户点击的是英文选项,向导中的文字切换成英文显示
    }else if(text == "English"){
        set_lang(0);
    }
});


function set_lang(is_zh)
{
    if(is_zh)
    {
        $('.btn_img').attr('src','image/zh.jpg');
        $('.btn_text').text('简体中文');
        //轮播图小点上方的文字切换
        $('.c_g_text').text("以后不再显示此向导");
        for(var i = 0;i<display_zh_str.length;i++){
            var str_zh = display_zh_str[i];
            $('.swiper-slide span').eq(i+1).text(str_zh);
            if(i==3){
                $('.swiper-slide span').eq(0).text(str_zh);
            }
            if(i==2){
                $('.lang-img').attr('src','image/Blockly-zh-03.png');
            }
        }
    }
    else {
        //按钮中图标的切换
        $('.btn_img').attr('src','image/en.jpg');
        $('.btn_text').text('English');
        //轮播图小点上方的文字切换
        $('.c_g_text').text("This wizard is no longer shown");
        for(var j = 0;j<display_en_str.length;j++){
            var str_en = display_en_str[j];
            $('.swiper-slide span').eq(j+1).text(str_en);
            if(j==3){
                $('.swiper-slide span').eq(0).text(str_en);
            }
            if(j==2){
                $('.lang-img').attr('src','image/Blockly-en-03.png');
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

if(cur_lan == 'zh-hans')
{
    set_lang(1);
}
else {
    set_lang(0);
}