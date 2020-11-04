const btn = document.getElementsByTagName('button')[0];
const box = document.querySelector('.box1')

function funa(button){
    const num = Math.round(Math.random()*1.2);
    if(num === 0){
        setTimeout(() => {
            button.style.width="0";
        }, 200);
        setTimeout(() => {
            button.style.transform="scale(0,0)"
        }, 1);
        setTimeout(() => {
            button.remove();
            if(box.children.length<=0){
                if(confirm("No more buttons!\nStart a new game?")){
                    location.reload()
                }
            }
        }, 400);
    }else{
        const i = parseInt(button.innerHTML);
        button.innerHTML = i+1;
        const newButton = document.createElement("button");
        newButton.innerHTML = 0
        box.appendChild(newButton);
        setTimeout(() => {
            newButton.style.width="100px";
        }, 1);
        setTimeout(() => {
            newButton.style.transform="scale(0.8,0.8)"
        }, 200);
        newButton.addEventListener("click",(e)=>{
            funa(e.target)
        })
    }
}


btn.addEventListener('click',function(e){
    funa(e.target)
})
