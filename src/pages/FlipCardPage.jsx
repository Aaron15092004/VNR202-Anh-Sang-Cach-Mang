import { useEffect } from "react";
import $ from "jquery";
import "../styles/flip/flip.css";
import { flipImages } from "../data/flipImagesData";
import BackHomeButton from "../components/common/BackHomeButton";

export default function FlipCardPage() {
  useEffect(() => {
    // localStorage functions
    function set(key, value) {
      localStorage.setItem(key, value);
    }
    function get(key) {
      return localStorage.getItem(key);
    }
    function increase(el) {
      set(el, parseInt(get(el)) + 1);
    }
    function decrease(el) {
      set(el, parseInt(get(el)) - 1);
    }

    var toTime = function (nr) {
      if (nr == "-:-") return nr;
      else {
        var n = " " + nr / 1000 + " ";
        return n.substr(0, n.length - 1) + "s";
      }
    };

    function updateStats() {
      $("#stats").html(
        '<div class="padded"><h2>Thống kê: <span>' +
          "<b>" +
          get("flip_won") +
          "</b><i>Thắng</i>" +
          "<b>" +
          get("flip_lost") +
          "</b><i>Thua</i>" +
          "<b>" +
          get("flip_abandoned") +
          "</b><i>Bỏ cuộc</i></span></h2>" +
          "<ul><li><b>Tốt nhất - dễ:</b> <span>" +
          toTime(get("flip_casual")) +
          "</span></li>" +
          "<li><b>Tốt nhất - vừa:</b> <span>" +
          toTime(get("flip_medium")) +
          "</span></li>" +
          "<li><b>Tốt nhất - khó:</b> <span>" +
          toTime(get("flip_hard")) +
          "</span></li></ul>" +
          "<ul><li><b>Tổng lượt lật:</b> <span>" +
          parseInt(
            (parseInt(get("flip_matched")) + parseInt(get("flip_wrong"))) * 2,
          ) +
          "</span></li>" +
          "<li><b>Lượt khớp:</b> <span>" +
          get("flip_matched") +
          "</span></li>" +
          "<li><b>Lượt sai:</b> <span>" +
          get("flip_wrong") +
          "</span></li></ul></div>",
      );
    }

    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    function startScreen(text) {
      $(".game-area").removeAttr("class").addClass("game-area").empty();
      $(".game-intro-wrapper").fadeIn(250);

      $(".card-c1").text(text.substring(0, 1));
      $(".card-c2").text(text.substring(1, 2));
      $(".card-c3").text(text.substring(2, 3));
      $(".card-c4").text(text.substring(3, 4));

      // If won game
      if (text == "nice") {
        increase("flip_won");
        decrease("flip_abandoned");
      }

      // If lost game
      else if (text == "fail") {
        increase("flip_lost");
        decrease("flip_abandoned");
      }

      // Update stats
      updateStats();
    }

    /* LOAD GAME ACTIONS */

    // Init localStorage
    if (!get("flip_won") && !get("flip_lost") && !get("flip_abandoned")) {
      //Overall Game stats
      set("flip_won", 0);
      set("flip_lost", 0);
      set("flip_abandoned", 0);
      //Best times
      set("flip_casual", "-:-");
      set("flip_medium", "-:-");
      set("flip_hard", "-:-");
      //Cards stats
      set("flip_matched", 0);
      set("flip_wrong", 0);
    }

    // Fill stats
    if (
      get("flip_won") > 0 ||
      get("flip_lost") > 0 ||
      get("flip_abandoned") > 0
    ) {
      updateStats();
    }

    // Toggle start screen cards
    $('.game-intro-wrapper .game-card:not(".twist")').on("click", function (e) {
      $(this)
        .toggleClass("active")
        .siblings()
        .not(".twist")
        .removeClass("active");
      if ($(e.target).is(".playnow")) {
        $(".game-intro-wrapper .game-card").last().addClass("active");
      }
    });

    // Start game
    $(".play").on("click", function (e) {
      e.preventDefault();
      increase("flip_abandoned");
      $(".game-info").fadeOut();

      var difficulty = "",
        timer = 1000,
        level = $(this).data("level");

      // Set game timer and difficulty
      if (level == 8) {
        difficulty = "casual";
        timer *= level * 4;
      } else if (level == 18) {
        difficulty = "medium";
        timer *= level * 5;
      } else if (level == 32) {
        difficulty = "hard";
        timer *= level * 6;
      }

      // Add difficulty class to container
      $(".flip-game-container")
        .removeClass("casual-mode medium-mode hard-mode")
        .addClass(difficulty + "-mode");
      $(".game-area").addClass(difficulty);

      $(".game-intro-wrapper").fadeOut(250, function () {
        var startGame = Date.now(),
          obj = [];

        // Create and add shuffled cards to game
        for (let i = 0; i < level; i++) {
          obj.push(i);
        }

        var shu = shuffle($.merge(obj, obj)),
          cardSize = 100 / Math.sqrt(shu.length);

        for (let i = 0; i < shu.length; i++) {
          var imageIndex = shu[i];
          var imageUrl = flipImages[imageIndex] || flipImages[0];

          // Tạo card element
          var card = $(
            '<div class="game-card" style="width:' +
              cardSize +
              "%;height:" +
              cardSize +
              '%;">' +
              '<div class="game-flipper">' +
              '<div class="game-front"></div>' +
              '<div class="game-back"></div>' +
              "</div>" +
              "</div>",
          );

          // Set background image cho game-back
          card
            .find(".game-back")
            .css({
              "background-image": "url(" + imageUrl + ")",
              "background-size": "cover",
              "background-position": "center",
              "background-repeat": "no-repeat",
              "background-color": "#1b4332",
            })
            .attr("data-img", imageUrl);

          card.appendTo(".flip-game-container .game-area");
        }

        // Set card actions
        $(".game-area .game-card").on({
          mousedown: function () {
            if ($(".game-area").attr("data-paused") == 1) {
              return;
            }

            var $this = $(this).addClass("active");
            var data = $this.find(".game-back").attr("data-img"); // Đổi từ data-f sang data-img

            if ($(".game-area").find(".game-card.active").length > 1) {
              setTimeout(function () {
                var thisCard = $(
                  ".game-area .active .game-back[data-img='" + data + "']", // Đổi data-f sang data-img
                );

                if (thisCard.length > 1) {
                  thisCard
                    .parents(".game-card")
                    .toggleClass("active game-card found")
                    .empty();
                  increase("flip_matched");

                  // Win game
                  if (!$(".game-area .game-card").length) {
                    var time = Date.now() - startGame;
                    if (
                      get("flip_" + difficulty) == "-:-" ||
                      get("flip_" + difficulty) > time
                    ) {
                      set("flip_" + difficulty, time);
                    }

                    startScreen("nice");
                  }
                } else {
                  $(".game-area .game-card.active").removeClass("active");
                  increase("flip_wrong");
                }
              }, 401);
            }
          },
        });

        // Add timer bar
        $('<i class="game-timer"></i>')
          .prependTo(".game-area")
          .css({
            animation: "timer " + timer + "ms linear",
          })
          .one(
            "webkitAnimationEnd oanimationend msAnimationEnd animationend",
            function () {
              startScreen("fail");
            },
          );

        // Set keyboard (p)ause and [esc] actions
        $(window)
          .off()
          .on("keyup", function (e) {
            // Pause game. (p)
            if (e.keyCode == 80) {
              if ($(".game-area").attr("data-paused") == 1) {
                $(".game-area").attr("data-paused", "0");
                $(".game-timer").css("animation-play-state", "running");
                $(".game-pause").remove();
              } else {
                $(".game-area").attr("data-paused", "1");
                $(".game-timer").css("animation-play-state", "paused");
                $('<div class="game-pause"></div>').appendTo(
                  ".flip-game-container",
                );
              }
            }
            // Abandon game. (ESC)
            if (e.keyCode == 27) {
              startScreen("flip");
              if ($(".game-area").attr("data-paused") == 1) {
                $(".game-area").attr("data-paused", "0");
                $(".game-pause").remove();
              }
              $(window).off();
            }
          });
      });
    });

    // Share button toggle
    $(".share-click").on("click", function () {
      $(this).toggleClass("open");
      $(".share-box-wrapper").slideToggle("fast");
    });

    // Cleanup on unmount
    return () => {
      $(window).off();
      $(".play").off();
      $(".share-click").off();
      $('.game-intro-wrapper .game-card:not(".twist")').off();
    };
  }, []);

  return (
    <div className="flip-game-container">
      <div className="game-full-outer">
        <div id="g" className="game-area"></div>
        <div className="game-intro-wrapper">
          <div className="common-header">
            <div className="common-logo">
              <BackHomeButton />
            </div>
          </div>
          <div className="game-header">
            <div className="game-name">
              <h1 data-text="VNR202">VNR202</h1>
            </div>
          </div>
          <div className="game-box-outer">
            <div className="game-logo">
              <p className="game-info info-uppercase">
                Chọn mức độ để bắt đầu thẻ ghi nhớ VNR202
              </p>
              <div className="logo-inner">
                <div className="game-card left">
                  <div className="game-flipper">
                    <div className="game-front card-c1">F</div>
                    <div
                      className="game-back content-box stats-container"
                      id="stats"
                    >
                      <div className="padded">
                        <h2>Thống kê</h2>
                        Bạn chưa bắt đầu lượt ôn tập nào.
                        <a href="javascript:void(0);" className="playnow">
                          Chơi ngay
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="game-card active twist">
                  <div className="game-flipper">
                    <div className="game-back game-front">
                      <div className="card-c2">L</div>
                    </div>
                  </div>
                </div>
                <div className="game-card left">
                  <div className="game-flipper">
                    <div className="game-front card-c3">I</div>
                    <div className="game-back content-box instructions">
                      <div className="padded">
                        <h2>Hướng dẫn</h2>
                        <p>Nhấn [p] để tạm dừng, hoặc [ESC] để bỏ lượt chơi.</p>
                        <p>
                          Đây là trò chơi thẻ ghi nhớ có tính giờ. Lật các thẻ
                          để tìm hai hình trùng nhau và củng cố nội dung VNR202.
                        </p>
                        <p>
                          Ghép đúng hai thẻ giống nhau để loại chúng khỏi bàn chơi.
                        </p>
                        <p>
                          Hoàn thành tất cả cặp thẻ nhanh nhất có thể.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="game-card">
                  <div className="game-flipper">
                    <div className="game-front card-c4">P</div>
                    <div className="game-back content-box levels">
                      <a
                        href="javascript:void(0);"
                        data-level="8"
                        className="play"
                      >
                        Dễ
                      </a>
                      <a
                        href="javascript:void(0);"
                        data-level="18"
                        className="play"
                      >
                        Vừa
                      </a>
                      <a
                        href="javascript:void(0);"
                        data-level="32"
                        className="play"
                      >
                        Khó
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <p className="game-info">
                Thẻ ghi nhớ VNR202 giúp ôn tập nhanh các sự kiện và gợi ý quan trọng.
              </p>
            </div>
          </div>

          <footer className="footer-wrapper">
            &copy; Copyright {new Date().getFullYear()} Ánh Sáng Của Đảng. All
            rights reserved.
          </footer>

          <div className="social-media-main">
            <div className="share-box-wrapper">
              <div className="share-box-inner">
                <div
                  title="facebook share"
                  className="social-media-icon facebook-color"
                  id="fb_share"
                ></div>
              </div>
            </div>
            <div className="share-title share-click" title="Share"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
