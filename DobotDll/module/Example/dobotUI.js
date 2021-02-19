function grabClick() {
	if(document.getElementById("Grab").checked)
	{
		dobot.SetEndEffectorGripper(1, 1, 0);
	}
	else
	{
		dobot.SetEndEffectorGripper(1, 0, 0);
	}
}

function laserClick() {
	if(document.getElementById("Laser").checked)
	{
		dobot.SetEndEffectorLaser(1, 1, 0);
	}
	else
	{
		dobot.SetEndEffectorLaser(0, 0, 0);
	}
}

function SuctionCupClick(){
	if(document.getElementById("SuctionCup").checked)
	{
		dobot.SetEndEffectorSuctionCup(1, 1, 0);
	}
	else
	{
		dobot.SetEndEffectorSuctionCup(0, 0, 0);
	}
}

function endTypeSelectFun(){
	var V = $("#endTypeSelect").val();
	if(V == 71.601)
	{
		$("#Grab").attr("disabled", false);
		$("#Laser").attr("disabled", true);
		$("#SuctionCup").attr("disabled", true);
		$("button[name='btnGrp']").attr("disabled", true);
	}
	else if(V == 73)
	{
		$("#Grab").attr("disabled", true);
		$("#Laser").attr("disabled", false);
		$("#SuctionCup").attr("disabled", true);
		$("button[name='btnGrp']").attr("disabled", true);
	}
	else if(V == 71.6)
	{
		$("#Grab").attr("disabled", true);
		$("#Laser").attr("disabled", true);
		$("#SuctionCup").attr("disabled", false);
		$("button[name='btnGrp']").attr("disabled", false);
	}
	dobotUI.setEndType();
}

var dobotUI = {
	index:0,
	setCmdTimeout:function(){
		dobot.setCmdTimeout(3000);
	},
	setEndType:function(){
		var endType = $("#endTypeSelect").val();
		dobot.SetEndEffectorParams(endType, 0, 0);
	},
	SetJOGJointParams:function(){
		dobot.SetJOGJointParams(100, 100, 100, 100, 100, 100, 100, 100, 0)
	},
	SetJOGCommonParams:function(va){
		dobot.SetJOGCommonParams(100, 100, 0)
	},
	setJogInstantCmd:function(ty, status){
		var joint = $("#jointTypeSelect").val();
		ty = status == 1 ? ty : 0;
		dobot.SetJOGCmd(joint, ty, 0)
	},
	init:function(){

	}
}
function jointTypeSelectFun(){
	if($("#jointTypeSelect").val() == 0){
		$("#btnGroup1").show();
		$("#btnGroup2").hide();
	}else{
		$("#btnGroup1").hide();
		$("#btnGroup2").show();
	}
}
function refreshSwatch() {
	var slider = $( "#slider" ).slider( "value" ),
	psliderv = $( "#psliderv" ).slider( "value" ),
	pslidera = $( "#pslidera" ).slider( "value" );
	$("#sliderVal").val(slider);
	$("#pslidervVal").val(psliderv);
	$("#pslideraVal").val(pslidera);
}
var timer=0;
$(function() {
	$( "#slider, #psliderv, #pslidera" ).slider({
	  orientation: "horizontal",
	  range: "min",
	  max: 100,
	  value: 50,
	  slide: refreshSwatch,
	  change: refreshSwatch
	});
	$( "#slider").slider({
		stop:function(event, ui){
			dobotUI.setJogDynamicParams($( "#slider" ).slider( "value" ));
		}
	});
	$( "#psliderv, #pslidera").slider({
		stop:function(event, ui){
			dobotUI.setPlaybackDynamicParams($( "#psliderv" ).slider( "value" ), $( "#pslidera" ).slider( "value" ));
		}
	});
	$( "#slider" ).slider( "value", 50 );
	$( "#psliderv" ).slider( "value", 50 );
	$( "#pslidera" ).slider( "value", 50 );

	timer = setInterval(function(){
		if(dobot.isConnectted()){
			dobot.GetPose(function(pos){
				$("#jointx").val(pos[0].toFixed(4));
				$("#jointy").val(pos[1].toFixed(4));
				$("#jointz").val(pos[2].toFixed(4));
				$("#jointr").val(pos[3].toFixed(4));
				$("#joint1Angle").val(pos[4].toFixed(4));
				$("#joint2Angle").val(pos[5].toFixed(4));
				$("#joint3Angle").val(pos[6].toFixed(4));
				$("#joint4Angle").val(pos[7].toFixed(4));
			});
		}
	},50)
});
