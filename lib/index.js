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
            Adapter.getPostList().then(list=>{
                geneList(list,10,0);
                if(list[10]){
                    // 有下一页
                    $(".content").append(el("a.next",{href:"#/posts/1"},"下一页"));
                }
            })
        }
    },{
        reg:new RegExp("^#/posts/([0-9]+)$"),
        fn(){
            $(".intro").addClass("shrink");
            let page=location.hash.replace("#/posts/",'');
            page=parseInt(page);
            Adapter.getPostList().then(list=>{
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
            })
        }
    },{
        reg:new RegExp("^#/post/([0-9]+)$"),
        fn(){
            $(".intro").addClass("shrink");
            $(".content").addClass("post")
            let id=location.hash.replace("#/post/",'');
            id=parseInt(id);
            Adapter.getPost(id).then(post=>{
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
            Adapter.getPostListByTag(tag).then(res=>{
                if(res.code==-1){
                    Router.go("/404",true);
                }else{
                    geneList(res.data,res.data.length+20,0);
                }
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
            Adapter.getTagList().then(list=>{
                list.forEach(tag=>{
                    taglist.append(el("a.tag",{href:"#/tag/"+tag},tag))   
                })
            })
        }
    },{
        reg:new RegExp("^#/archive$"),
        fn(){
            $(".intro").addClass("shrink")
            $$("nav li")[4].addClass("active");
            let acl=el(".archive-list");
            $(".content").append(acl);
            Adapter.getPostList().then(list=>{
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
            })
        }
    },{
        reg:new RegExp("#/friends"),
        fn(){
            $(".intro").addClass("shrink");
            $$("nav li")[6].addClass("active");
            get("/friendlink.json").then(list=>{
                let fl=el(".friendlinks");
                $(".content").append(fl);
                let n='';
                list.forEach(function(t) {
                    n += "<li><a " + ("?" == t.type ? 'class="no" title="链接可能无法访问"' : "") + ' href="' + t.url + '" target="_blank"><img src="' + t.icon + '"/><div class="m"><div class="title">' + t.title + '</div><div class="desc">' + t.desc + "</div></div></a></li>"
                });
                fl.innerHTML = n;
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