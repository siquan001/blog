window.on("scroll",()=>{
    if(window.scrollY>50){
        $("nav").classList.add("awa");
    }else{
        $("nav").classList.remove("awa");
    }
})

$(".showmenu").on("click",(e)=>{
    e.stopPropagation();
    $$("nav ul")[0].toggleClass("show")
})
document.on("click",()=>{
    $$("nav ul")[0].removeClass("show")
})
$(".intro h1").on("click",()=>{
    Router.go("/");
})

function initSays() {
    var says = [
        "海内存知己，天涯若比邻。",
        "慢慢来，别着急。",
        "己所不欲，勿施于人。",
        "我创造，所以我生存。",
        "世界上只有一种真正的英雄主义，那就是在认清生活的真相后依然热爱生活。",
        "我已经完全爱上沃玛啦！！！"
    ]

    var sayi = -1, sayf = $('.saying');
    function g() {
        var sayii = 0;
        function domore(cb) {
            var inter = setInterval(function () {
                sayii++;
                if (sayii > says[sayi].length) {
                    clearInterval(inter);
                    cb();
                } else {
                    sayf.innerHTML = says[sayi].substring(0, sayii);
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
                    sayf.innerHTML = says[sayi].substring(0, sayii);
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
                }, 2000)
            });
        }
        dos();
    }
    g();
}

initSays();

function geneList(list,pagesize,page){
    let s=pagesize*page;
    let l=el(".postlist");
    $(".content").append(l);
    for(let i=s;i<Math.min(s+pagesize,list.length);i++){
        let item=list[i];
        let it=el("a.post-item",{href:`javascript:;`});
        it.append(el(".title",{},item.title));
        it.append(el(".desc",{},item.desc));
        it.append(el(".time",{},formatTime(item.time)));
        it.onclick=(e)=>{
            e.preventDefault();
            Router.go(`/post/${item.id}`);
        }
        let tgs=el(".tags");
        for(let tag of item.tags){
            let t=el("span.tag",{},tag);
            t.onclick=function(e){
                e.stopPropagation();
                Router.go(`/tag/${tag}`);
            }
            tgs.append(t);
        }
        it.append(tgs);
        if(item.img){
            it.classList.add("hasimg");
            it.append(el("img",{src:"https://t.alcy.cc/moez?_t="+Math.random()}));
        }
        l.append(it);
    }
}

function formatTime(time){
    let d=new Date(time);
    let y=d.getFullYear();
    let m=d.getMonth()+1;
    let day=d.getDate();
    return `${y}年${m}月${day}日`;
}

function drawPost(post){
    $(".content").append(el("h1.title",{},post.meta.title));
    let tg=el(".tags");
    for(let tag of post.meta.tags){
        let t=el("span.tag",{},tag);
        t.onclick=function(e){
            e.stopPropagation();
            Router.go(`/tag/${tag}`);
        }
        tg.append(t);
    }
    $(".content").append(tg);
    $(".content").append(el(".time",{},formatTime(post.meta.time)));
    $(".content").append(el(".post-body",{},post.content));
    $(".content").append(el(".ender",{},"---End---"));
}
function addLoad(){
    $(".content").append(el("img.loading",{src:"https://image.gmya.net/i/2026/06/18/6a3346266df80.webp"}));
}
function removeLoad(){
    $("img.loading").remove();
}

function wlcw(){
    $(".content").append(el("h1.error",{},"网络错误"));
}

Router.init({
    restore(){
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
        $(".content").html('');
        $(".content").className="content";
        $(".intro").removeClass("shrink");
        $$("nav li.active").removeClass("active");
    },
    routes:[
    {
        reg:new RegExp("^#\/(?:home)?$"),
        fn(){
            $$("nav li")[0].addClass("active");
            addLoad();
            Adapter.getPostList().then(list=>{
                removeLoad();
                geneList(list,10,0);
                if(list[10]){
                    // 有下一页
                    $(".content").append(el("a.next",{href:"#/posts/1"},"下一页"));
                }
            }).catch(e=>{
                console.log(e);
                removeLoad();
                wlcw();
            })
        }
    },{
        reg:new RegExp("^#/posts/([0-9]+)$"),
        fn(){
            $(".intro").addClass("shrink");
            let page=location.hash.replace("#/posts/",'');
            page=parseInt(page);
            addLoad();
            Adapter.getPostList().then(list=>{
                removeLoad();
                if(10*page>list.length){
                    Router.go("/404",true);
                }else{
                    geneList(list,10,page);
                    if(page>0){
                        $(".content").append(el("a.prev",{href:"#/posts/"+(page-1)},"上一页"));
                    }
                    if(list[10*(page+1)]){
                        $(".content").append(el("a.next",{href:"#/posts/"+(page+1)},"下一页"));
                    }
                }
            }).catch(e=>{
                console.log(e);
                removeLoad();
                wlcw();
            })
        }
    },{
        reg:new RegExp("^#/post/([0-9]+)$"),
        fn(){
            $(".intro").addClass("shrink");
            $(".content").addClass("post")
            let id=location.hash.replace("#/post/",'');
            id=parseInt(id);
            addLoad();
            Adapter.getPost(id).then(post=>{
                removeLoad();
                if(post.code==-1){
                    Router.go("/404",true);
                }else{
                    drawPost(post);
                }
            })
        }
    },{
        reg:new RegExp("^#/tag/"),
        fn(){
            $(".intro").addClass("shrink");
            $$("nav li")[2].addClass("active");
            let tag=decodeURI(location.hash.replace("#/tag/",''));
            $(".content").append(el("h2.title",{},"标签: "+tag))
            addLoad();
            Adapter.getPostListByTag(tag).then(res=>{
                removeLoad();
                if(res.code==-1){
                    Router.go("/404",true);
                }else{
                    geneList(res.data,res.data.length+20,0);
                }
            }).catch(e=>{
                console.log(e);
                removeLoad();
                wlcw();
            })
        }
    },{
        reg:new RegExp("^#/tags$"),
        fn(){
            $(".intro").addClass("shrink")
            $$("nav li")[2].addClass("active");
            $(".content").append(el("h2.title",{},"标签"))
            let taglist=el(".taglist");
            $(".content").append(taglist);
            addLoad();
            Adapter.getTagList().then(list=>{
                removeLoad();
                list.forEach(tag=>{
                    taglist.append(el("a.tag",{href:"#/tag/"+tag},tag))   
                })
            }).catch(e=>{
                console.log(e);
                removeLoad();
                wlcw();
            })
        }
    },{
        reg:new RegExp("^#/archive$"),
        fn(){
            $(".intro").addClass("shrink")
            $$("nav li")[4].addClass("active");
            let acl=el(".archive-list");
            $(".content").append(acl);
            addLoad();
            Adapter.getPostList().then(list=>{
                removeLoad();
                let year=0;
                for(let item of list){
                    let y=new Date(item.time).getFullYear();
                    if(y!=year){
                        year=y;
                        acl.append(el("h2.year",{},y));
                    }
                    let pitem=el(".pitem");
                    pitem.append(el("a.ptitle",{href:`#/post/${item.id}`},item.title));
                    pitem.append(el(".ptime",{},formatTime(item.time)));
                    acl.append(pitem);
                }
                $(".content").append(el(".ender",{},"---End---"));
            }).catch(e=>{
                console.log(e);
                removeLoad();
                wlcw();
            })
        }
    },{
        reg:new RegExp("#/friends"),
        fn(){
            $(".intro").addClass("shrink");
            $$("nav li")[6].addClass("active");
            addLoad();
            get("/friendlink.json").then(list=>{
                removeLoad();
                let fl=el(".friendlinks");
                $(".content").append(fl);
                let n='';
                list.forEach(function(t) {
                    n += "<li><a " + ("?" == t.type ? 'class="no" title="链接可能无法访问"' : "") + ' href="' + t.url + '" target="_blank"><img src="' + t.icon + '"/><div class="m"><div class="title">' + t.title + '</div><div class="desc">' + t.desc + "</div></div></a></li>"
                });
                fl.innerHTML = n;
            }).catch(e=>{
                console.log(e);
                removeLoad();
                wlcw();
            })
        }
    },{
        reg:new RegExp("#/404"),
        fn(){
            $(".intro").addClass("shrink")
            $(".content").classList.add("errpage")
            $(".content").html('<h1>404</h1>');
        }
    }]
})