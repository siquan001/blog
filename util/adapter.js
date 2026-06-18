const Adapter={
    distDir:"./dist",
    config(dt={}){
        for(let k in dt){
            Adapter[k] = dt[k];
        }
    },
    cacheResult:{
        gS:{},
        tags:{},
        posts:{}
    },
    async getJSON(url){
        if(this.cacheResult.gS[url]){
            return clone(this.cacheResult.gS[url]);
        }
        const res = await fetch(this.distDir+"/"+url);
        const r=await res.json();
        this.cacheResult.gS[url] = r;
        await new Promise(r=>setTimeout(r,3000));
        return clone(r);
    },
    async getPostList(){
        return await this.getJSON("archive.json");
    },
    async getTagList(){
        let tg=await this.getJSON("tager.json");
        return Object.keys(tg.tager);
    },
    async getPostListByTag(tag){
        if(this.cacheResult.tags[tag]){
            return clone(this.cacheResult.tags[tag]);
        }
        let tg=await this.getJSON("tager.json");
        if(!tg.tager[tag]){
            return {code:-1}
        }
        let r=tg.tager[tag].map(id=>tg.metaMap[id.toString()]);
        let rb={code:0,data:r};
        this.cacheResult.tags[tag]=rb;
        return clone(rb);
    },
    async getPost(id){
        if(this.cacheResult.posts[id]){
            return clone(this.cacheResult.posts[id]);
        }
        let c;
        try{
            c=await this.getJSON("post-"+id+".json");
        }catch(e){
            return {code:-1}
        }
        this.cacheResult.posts[id]=c;
        return clone(c);
    }
}

function clone(obj){
    if(Array.isArray(obj)){
        let k=[];
        for(let i of obj){
            if(i&&typeof i=="object"){
                k.push(clone(i));
            }else{
                k.push(i);
            }
        }
        return k;
    }
    let o={};
    for(let k in obj){
        if(obj[k]&&typeof obj[k]=="object"){
            o[k]=clone(obj[k]);
        }else{
            o[k]=obj[k];
        }
    }
    return o;
}

const Router ={
    inited:false,
    routes:[],
    restore(){},
    init(dt={}){
        if(this.inited)return;
        for(let k in dt){
            Router[k] = dt[k];
        }
        window.addEventListener("hashchange",()=>{
            Router.restore();
            Router.parse(window.location.hash);
        })
        if(!window.location.hash){
            window.location.hash="#/";
        }else{
            Router.parse(window.location.hash);
        }
        this.inited=true;
    },
    go(path,isSilent){
        if(isSilent){
            window.history.replaceState(null,null,"#"+path);
            Router.restore();
            Router.parse(window.location.hash);
        }else{
            window.location.hash="#"+path;
        }
    },
    parse(path){
        for(let r of Router.routes){
            if(r.reg.test(path)){
                r.fn(path);
                return;
            }
        }
        this.go("/404",true)
    }
}