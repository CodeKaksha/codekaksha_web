/*var colors = new Array(
    [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]
);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = .0015;
*/

$(document).ready(function () {
    function dark() {
        $(".container1-page1").css({
            background: "radial-gradient(circle, #030b17, #080712, #09030b, #060104, #000000)"
        });
        $("nav").addClass("nav-page1-anim");
        $(".navbar-title").css("color", "white").addClass("nav-title-anim");
        $(".login").css("color", "white");
        $(".sign-but").css("background-color", "#add2c9").css("color", "black");
        $(".heading1-page1").css("color", "#fafafa").addClass("head-page1-anim");
        $(".heading2-page1").css("color", "#bde4f4");
        $(".heading3-page1").css("color", "#21bf73");
        $(".heading4-page1").css("color", "#21bf73");
        $(".host-but").css("background-color", "#add2c9").css("color", "black");
        $(".waves-page1").addClass("visible");
        $(".botcon1, .botcon2").css("color", "white").addClass("botcon-page1-anim");
        $(".botcont1").addClass("botcont1-anim");
        $(".botcont2").addClass("botcont2-anim");
        $(".botcont3").addClass("botcont3-anim");
    }

    function light() {
        $(".container1-page1").css({
            background: "#fff"
        });
        $(".login").css("color", "black");
        $(".sign-but").css("background-color", "#6c6ad2").css("color", "white");
        $("nav").removeClass("nav-page1-anim");
        $(".heading1-page1").css("color", "#337357").removeClass("head-page1-anim");
        $(".heading2-page1").css("color", "#966b9d");
        $(".host-but").css("background-color", "#6c6ad2").css("color", "white");
        $(".heading3-page1").css("color", "black");
        $(".heading4-page1").css("color", "black");
        $(".navbar-title").css("color", "#966b9d").removeClass("nav-title-anim");
        $(".waves-page1").removeClass("visible");
        $(".botcon1, .botcon2").css("color", "black").removeClass("botcon-page1-anim");
        $(".botcont1").removeClass("botcont1-anim");
        $(".botcont2").removeClass("botcont2-anim");
        $(".botcont3").removeClass("botcont3-anim");
    }

    var themeCount = 0;

    $(".toggle-slot").click(function () {
        if (themeCount == 0) {
            dark();
            themeCount = 1;
        } else {
            light();
            themeCount = 0;
        }
    });
});

/*
function updateGradient() {
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "#" + ((r1 << 16) | (g1 << 8) | b1).toString(16);

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "#" + ((r2 << 16) | (g2 << 8) | b2).toString(16);

    $('.botcont1').css({
        background: "-webkit-radial-gradient(center, circle cover, " + color1 + "," + color2 + ")"
    });

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

    }
}
*/