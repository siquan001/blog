(function () {
  var isi = false;

  function r() {
    isi = true;
    var h1 = document.querySelector(".page .index h1");
    var blockquote = document.querySelector(".page .index blockquote");
    get('./index.json', function (res) {
      res = JSON.parse(res);
      h1.innerHTML = res.welcome_text;
      says = res.says;
      g();
    });
    var says = [];

    var sayi = -1;
    function g() {
      var sayii = 0;
      function domore(cb) {
        var inter = setInterval(function () {
          sayii++;
          if (sayii > says[sayi].length) {
            clearInterval(inter);
            cb();
          } else {
            blockquote.innerHTML = says[sayi].substring(0, sayii);
          }
        }, 80)
      }
      function doless(cb) {
        var inter = setInterval(function () {
          sayii--;
          if (sayii < 0) {
            clearInterval(inter);
            cb();
          } else {
            blockquote.innerHTML = says[sayi].substring(0, sayii);
          }
        }, 80)
      }

      function dos() {
        if (sayi == says.length - 1) {
          sayi = 0;
        } else {
          sayi++;
        }
        domore(function () {
          setTimeout(function () {
            doless(dos);
          }, 1000)
        });
      }
      dos();
    }

    var postlist = document.querySelector(".page .index .top_posts ul");
    var tlist = document.querySelector(".page .index .top_ts ul");

    get('./topper_post.json', function (res) {
      var str = '', res = JSON.parse(res);
      res.forEach(function (item) {
        str += '<li><a href="#/post/' + item.id + '"><img src="' + (item.cover || 'https://www.loliapi.cn/acg/?_=' + Math.random().toString().slice(2) + Date.now()) + '"/>\
        <div class="m"><div class="p_title">'+ item.title + '</div>\
        <div class="p_desc">'+ item.desc + '</div>\
        <div class="p_other"><div class="tags">'+ (function (tags) {
            return tags.map(function (item) {
              return '<div class="item"><a href="#/tag/' + item + '">' + item + '</a></div>'
            }).join('');
          })(item.tags) + '</div><div class="time">' + new Date(item.time).toDateString() + '</div></div>\
        </div></a></li>';
      });
      postlist.innerHTML = str;
    });
    get('./topper_t.json', function (res) {
      var str = '', res = JSON.parse(res);
      res.forEach(function (item) {
        str += '<li><a href="#/t/' + item.id + '"><div class="content">' + item.desc + '</div><div class="time">' + new Date(item.time).toDateString() + '</div></a></li>';
      });
      tlist.innerHTML = str;
    })
  }

  window.page.index = function () {
    !isi && r();
  }
})();
