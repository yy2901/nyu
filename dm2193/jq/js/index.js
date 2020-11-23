$(function(){
    const genW = ()=>{
        let loadU = window.location.search;
        if(loadU){
            loadU = loadU.split("?")[1];
            loadU = loadU.split(",");
            for(let i =0;i<loadU.length;i++){
                let word = "";
                let id = loadU[i].split("|")[0];
                if(loadU[i][0]=="a"){
                    word = simpleWords[parseInt(loadU[i].split("a")[1].split("|")[0])]
                }
                if(loadU[i][0]=="b"){
                    word = words[parseInt(loadU[i].split("b")[1].split("|")[0])]
                }
                if(loadU[i].split("|").length>1){
                    $(".content").append('<div class="word" id='+id+' b="1"><a>'+word+'</a></div>');
                }else{
                    $(".content").append('<div class="word" id='+id+' b="0"><a>'+word+'</a></div>');
                }
            }
        }
    }
    genW()
    const lb = words.length;
    const la = simpleWords.length;
    let current;
    const menu = document.getElementsByClassName("menu")[0];
    const chooseWord = ()=>{
        const p = Math.random();
        const res = []
        if(p<0.5){
            const i = parseInt(Math.random()*la)
            res[0] = "a"+i
            res[1] = simpleWords[i]
        }else{
            const i = parseInt(Math.random()*lb)
            res[0] = "b"+i
            res[1] = words[i]
        }
        return(res)
    }
    const genUrl = ()=>{
        const words = document.getElementsByClassName("word");
        let u = ""
        for(let i=0;i<words.length;i++){
            u=u+words[i].id;
            if(words[i].getAttribute("b")=="1"){
                u=u+"|";
            }
            if(i<words.length-1){
                u=u+","
            }
        }
        let l = window.location.pathname;
        u = l+"?"+u;
        history.replaceState(null, "", u)
    }
    $('body').on("click","#add",function(){
        const res = chooseWord();
        $(".content").append('<div class="word" id='+res[0]+' b="0"><a>'+res[1]+'</a></div>');
        genUrl()
    });
    $('body').on("click","#link",function(e){
        e.target.style.transform = "rotate(360deg)"
        setTimeout(() => {
            e.target.style.transform = "rotate(0)"
            document.getElementById("copied").style.opacity = 1;
            document.getElementById("copied").style.transform = "translate(0,0)";
        }, 250);
        setTimeout(() => {
            document.getElementById("copied").style.opacity = 0;
            document.getElementById("copied").style.transform = "translate(300%,0)";
        }, 1000);
        setTimeout(() => {
            document.getElementById("copied").style.transform = "translate(0,100%)";
        }, 1250);
        let $temp = $("<input>");
        let $url = $(location).attr('href');
        $("body").append($temp);
        $temp.val($url).select();
        document.execCommand("copy");
        $temp.remove();
    });
    let hold = false;
    let mouseTimer;
    $('.content').on("mousedown touchstart",".word",(e)=>{
        e.preventDefault();
        $(".menu").attr("active","0");
        const all = document.getElementsByClassName("word");
        for(let i=0;i<all.length;i++){
            all[i].style.color="black"
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
        mouseTimer = setTimeout(() => {
            hold = true;
            current = e.target;
            current.style.color = "grey";
            menu.setAttribute("active","1");
            menu.style.setProperty("--x",current.getBoundingClientRect().x+"px");
            menu.style.setProperty("--y",current.getBoundingClientRect().y+"px");
            $("#m_b").attr("active",current.getAttribute("b"));
            $("#m_e").attr("active",current.getAttribute("e"));
        }, 200);
        e.target.style.color = "red"
    })
    $('.content').on("mouseup touchend",".word",(e)=>{
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        clearTimeout(mouseTimer)
        if(!hold){
            const res = chooseWord()
            e.target.setAttribute("id",res[0])
            e.target.innerHTML=`<a>${res[1]}</a>`;
            e.target.style.color = "black";
            genUrl();
        }
        hold = false
    })
    $('.menu').on("click","li",(e)=>{
        menu.setAttribute("active",0);
        current.style.color="black"
    });
    $('.menu').on("click","#m_b",(e)=>{
        const s = parseInt(e.target.getAttribute("active"));
        current.setAttribute("b",1-s)
        genUrl()
    });
    $('.menu').on("click","#m_a",(e)=>{
        const res = chooseWord()
        if(current.getAttribute("b")=="1"){
            current.setAttribute("b",0);
            $(current).after('<div class="word" id='+res[0]+' b="1"><a>'+res[1]+'</a></div>');
        }else{
            $(current).after('<div class="word" id='+res[0]+' b="0"><a>'+res[1]+'</a></div>');
        }
        genUrl()
    });
    $('.menu').on("click","#m_d",(e)=>{
        current.remove();
        genUrl()
    })
})