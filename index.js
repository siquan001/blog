function resizeWindow() {
    function resize() {
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        document.body.style.height = windowHeight + "px";
        document.body.style.width = windowWidth + "px";
    }
    resize();
    window.onresize = function () {
        resize();
    }
}

var loadingHtml='<div class="loading"><span></span><span></span><span></span></div>';

var blog = {
    _get: function (url, cb, err = function () { }) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                cb(xhr.responseText);
            }
            if (xhr.status > 400) {
                err(xhr.status);
            }
        }
        xhr.send();
    },
    getPostListByPage: function (page, cb, err) {
        var url = './datas/post_comment_' + page + '.json';
        this._get(url, function (res) {
            cb(JSON.parse(res));
        }, err)
    },
    getPostListByTag: function (tag, cb, err) {
        var url = './datas/tag_' + tag + '.json';
        this._get(url, function (res) {
            cb(JSON.parse(res));
        }, err)
    },
    getAllPostList: function (cb, err) {
        var url = './datas/all_posts.json';
        this._get(url, function (res) {
            cb(JSON.parse(res));
        }, err)
    },
    getTagList: function (cb, err) {
        var url = './datas/tags.json';
        this._get(url, function (res) {
            cb(JSON.parse(res));
        }, err)
    },
    getPostContent: function (id, cb, err) {
        var url = './datas/post_' + id + '.json';
        this._get(url, function (res) {
            cb(JSON.parse(res));
        }, err)
    },
    getCount: function (cb, err) {
        var url = './datas/count.json';
        this._get(url, function (res) {
            cb(JSON.parse(res));
        }, err);
    }
}

/**
 * @return {HTMLElement}
 */
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}

function gtag(tags) {
    var tstr = '';
    tags.forEach(function (tag) {
        tstr += '<a href="#/tag/' + tag + '">' + tag + '</a>';
    });
    return tstr;
}
var initef=false;
var initer = {
    index: function (i, page) {
        document.title = '陈思全的博客 - 首页';
        page.querySelector("ul.postlist").innerHTML = loadingHtml;
        page.querySelector('.btn.next').style.display = 'block';
        page.querySelector('.btn.prev').style.display = 'block';

        if (isNaN(parseInt(i)) || parseInt(i) < 0) {
            i = 0;
        } else {
            i = parseInt(i);
        }

        page.querySelector('.btn.prev').onclick = function () {
            i--;
            location.hash = 'index/' + i;
        }
        page.querySelector('.btn.next').onclick = function () {
            i++;
            location.hash = 'index/' + i;
        }

        page.querySelector('span.total').innerHTML = -1;
        page.querySelector('span.current').innerHTML = i + 1;

        blog.getPostListByPage(i, function (pl) {
            var htmlstr = '';
            pl.data.forEach(function (l) {
                htmlstr += `<li>
                    <h1><a href="#/post/${l.id}">${l.title}</a></h1>
                    <p class="desc">${l.desc}...<a href="#/post/'+l.id+'">阅读全文</a></p>
                    <div class="message">
                        <div class="tags">${gtag(l.tags)}</div>
                        <div class="date">${new Date(l.time.substring(0, l.time.length - 2) + '+0800').toLocaleString()}</div>
                    </div>
                </li>`;
            })
            page.querySelector("ul.postlist").innerHTML = htmlstr;

            var total = pl.total;
            page.querySelector('span.total').innerHTML = total;
            page.querySelector('span.current').innerHTML = i + 1;
            if (i + 1 >= total) {
                page.querySelector('.btn.next').style.display = 'none';
            }

            if (i <= 0) {
                page.querySelector('.btn.prev').style.display = 'none';
            }
        }, function (status) {
            $('.error-page').style.display = 'block';
            $('.error-page .error-title').innerHTML = status;
        })


    },
    category: function (i, page) {
        document.title = '陈思全的博客 - 分类';
        function getRandomColor() {
            var letters = '0123456789';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 10)];
            }
            return color;
        }
        page.querySelector("ul.categorylist").innerHTML = loadingHtml;

        blog.getTagList(function (tl) {
            var htmlstr = '';
            tl.forEach(function (l) {
                htmlstr += `<li data-tag="${l}" style="background-color:${getRandomColor()}"># <span>${l}</span></li>`;
            })
            page.querySelector("ul.categorylist").innerHTML = htmlstr;
            page.querySelectorAll("ul.categorylist li").forEach(function (item) {
                item.onclick = function () {
                    location.hash = 'tag/' + item.getAttribute('data-tag');
                }
            })
        }, function (status) {
            $('.error-page').style.display = 'block';
            $('.error-page .error-title').innerHTML = status;
        })
    },
    friends: function (i, page) {
        document.title = '陈思全的博客 - 友链';
        if (initef) return;
        initef = true;
        $('.friendlinks').innerHTML = loadingHtml;
        blog._get('https://siquan001.github.io/friendlink.json', function (res) {
            var data = JSON.parse(res);
            var str = '';
            data.forEach(function (item) {
                str += '<li><a ' + (item.type == '?' ? 'class="no" title="链接可能无法访问"' : '') + ' href="' + item.url + '" target="_blank"><img src="' + item.icon + '"/><div class="m"><div class="title">' + item.title + '</div><div class="desc">' + item.desc + '</div></div></a></li>';
            });
            $('.friendlinks').innerHTML = str;
        })
    },
    archive: function (i, page) {
        document.title = '陈思全的博客 - 归档';
        page.querySelector("ul.archivelist").innerHTML = loadingHtml;
        blog.getAllPostList(function (pl) {
            var htmlstr = '';
            pl.forEach(function (item) {
                htmlstr += `<li><div class="title"><a href="#/post/${item.id}">${item.title}</a></div><div class="date">${item.time}</div></li>`
            })

            page.querySelector("ul.archivelist").innerHTML = htmlstr;
        })
    },
    tag: function (i, page) {
        document.title = decodeURI(i) + ' 分类';
        page.querySelector("ul.postlist").innerHTML = loadingHtml;
        page.querySelector('.tag-title span').innerText = decodeURI(i);
        blog.getPostListByTag(i, function (pl) {
            var htmlstr = '';
            pl.forEach(function (l) {
                htmlstr += `<li>
                    <h1><a href="#/post/${l.id}">${l.title}</a></h1>
                    <p class="desc">${l.desc}...<a href="#/post/'+l.id+'">阅读全文</a></p>
                    <div class="message">
                        <div class="tags">${gtag(l.tags)}</div>
                        <div class="date">${new Date(l.time.substring(0, l.time.length - 2) + '+0800').toLocaleString()}</div>
                    </div>
                </li>`;
            })
            page.querySelector("ul.postlist").innerHTML = htmlstr;
        }, function (status) {
            $('.error-page').style.display = 'block';
            $('.error-page .error-title').innerHTML = status;
        })
    },
    post: function (i, page) {
        page.querySelector('.post-title').innerText = '';
        page.querySelector('.post-date').innerText = '';
        page.querySelector('.post-tags').innerHTML = '';
        page.querySelector('.post-content').innerHTML = loadingHtml;
        page.querySelector('.post-container').style.display = 'block';
        blog.getPostContent(i, function (p) {
            page.querySelector('.post-title').innerText = p.detail.title;
            page.querySelector('.post-date').innerText = p.detail.time;
            page.querySelector('.post-tags').innerHTML = gtag(p.detail.tags);
            page.querySelector('.post-content').innerHTML = p.html;
            document.title = p.detail.title;
        }, function (status) {
            $('.error-page').style.display = 'block';
            $('.error-page .error-title').innerHTML = status;
            page.querySelector('.post-container').style.display = 'none';
        });
    }
}

function initRouter() {
    function _(item) {
        item.addEventListener("click", function () {
            if (item.getAttribute("data-to"))
                window.location.hash = item.getAttribute("data-to");
            else if (item.getAttribute("data-link"))
                window.open(item.getAttribute("data-link"));
        });
    }
    $$(".container .menu .item").forEach(_);
    $$(".container .mobmenu .item").forEach(_);

    window.onhashchange = clhash;
    function clhash() {
        $('.error-page').style.display = 'none';
        var hash = window.location.hash.slice(1);
        var hash_ = [];
        if (hash[0] == '/') {
            hash = hash.slice(1);
        }
        if (hash.indexOf('/') != -1) {
            var hashsp = hash.indexOf('/');
            hash_ = [hash.slice(0, hashsp), hash.slice(hashsp + 1)];
        } else {
            hash_ = [hash];
        }
        console.log(hash_);
        if (initer[hash_[0]]) {
            var page = $(".container .c .page[data-page='" + hash_[0] + "']");
            $$(".container .c .page").forEach(function (item) {
                item.classList.remove("act");
            });
            page.classList.add("act");
            initer[hash_[0]](hash_[1], page);
        }else if(hash_[0]=='err'){
            $('.error-page').style.display = 'block';
            $('.error-page .error-title').innerText = hash_[1];
        } else {
            window.location.hash = "#index";
            return;
        }

        $('.container .c .content').scrollTo({
            top: 0,
            behavior: "smooth"
        })
        function __(item) {
            if (item.getAttribute("data-to") == hash) {
                item.classList.add("act");
            } else {
                item.classList.remove("act");
            }
        }
        $$(".container .menu .item").forEach(__);
        $$(".container .mobmenu .item").forEach(__);
    }
    clhash();
}

resizeWindow();
initRouter();

document.querySelector(".menubtn").onclick = function () {
    document.querySelector(".mobmenu").classList.add('show');
}
document.querySelector(".mobmenu").onclick = function () {
    this.classList.remove('show');
}

blog.getCount(function (res) {
    $(".tagcount").innerHTML = res.tag;
    $(".postcount").innerHTML = res.post;
})
