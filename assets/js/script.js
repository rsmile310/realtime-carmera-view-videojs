$(document).ready(function () {
  $(".main-list").each(function (e, index) {
    let listEle = $(this);
    let onlineBtnEle = $(this).find(".online");
    let offlineBtnEle = $(this).find(".offline");
    let watchBtnEle = $(this).find(".watch-btn");
    let videoLink = $(this).find(".watch-btn").attr("value");

    $("#playBtn").on("click", function () {
      var ply = videojs("video" + Number(e + 1));
      ply.ready(function () {
        this.src({
          src: videoLink,
          type: "application/x-mpegURL",
        });
      });
      ply.play();

      setTimeout(function () {
        let videoEle = document.getElementById(
          "video" + Number(e + 1) + "_html5_api"
        );
        let image = capture(videoEle, 1);
        $("#img-thumb" + Number(e + 1)).html(image);
      }, 20000);
    });

    $.ajax({
      type: "get",
      dataType: "text",
      url: videoLink,
      success: function (response) {
        onlineBtnEle.show();
        listEle
          .find(".list-image")
          .find("span")
          .html('<span class="skeleton-box"></span>');
      },
      error: function () {
        offlineBtnEle.show();
        watchBtnEle.addClass("off");
        listEle
          .find(".list-image")
          .find("span")
          .html('<span class="no-video-box"></span>');
      },
    });
  });
  var defaultStreetName = $(".main-list:first-child")
    .find(".street-name")
    .text();
  var defaultDescription = $(".main-list:first-child")
    .find(".description")
    .text();
  var current_stream = $(".main-list:first-child")
    .find(".watch-btn")
    .attr("value");

  start_viblast(current_stream);

  $(".video-page").find(".street-name").text(defaultStreetName);
  $(".video-page").find(".description").text(defaultDescription);

  $(".watch-btn").click(function () {
    start_viblast($(this).attr("value"));
    $(".video-page")
      .find(".street-name")
      .text($(this).closest(".list-content").find(".street-name").text());
    $(".video-page")
      .find(".description")
      .text($(this).closest(".list-content").find(".description").text());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  setTimeout(function () {
    $("#playBtn").trigger("click");
  }, 10);
});

setInterval(function () {
  shoot();
}, 60000);

function start_viblast(data) {
  var player = videojs("video");
  player.ready(function () {
    this.src({
      src: data,
      type: "application/x-mpegURL",
    });
  });
  player.play();
}

function stop_viblast() {
  videojs("#video").currentTime(0);
}

function shoot() {
  let mainList = document.querySelectorAll(".main-list");
  for (let i = 1; i <= mainList.length; i++) {
    let videoEle = document.getElementById("video" + i + "_html5_api");
    var image = capture(videoEle, 1);
    $("#img-thumb" + i).html(image);
  }
}

function capture(video, scaleFactor) {
  if (scaleFactor == null) {
    scaleFactor = 1;
  }
  var w = 220;
  var h = 160;
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, w, h);
  return canvas;
}
