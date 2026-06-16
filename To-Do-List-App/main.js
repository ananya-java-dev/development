//askin user name
let name=document.querySelector("h4");
name.textContent="WELCOME!! "+ prompt("what's your name?");
let tasks=[];
//working on nav bar
let currentfilter="all";
let filterAll= document.querySelector("#filterAll");
let filterActive = document.querySelector("#filterActive");
let filterDone   = document.querySelector("#filterDone");
filterAll.addEventListener("click",function(){
    currentfilter="all";
    rendertask();
  
});
filterActive.addEventListener("click",function(){
    currentfilter="active";
    rendertask();
    
});
filterDone.addEventListener("click",function(){
    currentfilter="done";
    rendertask();

});
function rendertask(){ 
    let visible=tasks;
    if(currentfilter==="active"){
        visible=tasks.filter(t=>t.done===false);
    }
      if(currentfilter==="done"){
        visible=tasks.filter(t=>t.done===true);
    }
    ul.innerHTML="";
    visible.forEach(function(task){
      let li=document.createElement("li");
      li.classList.add("hey1");
      let spani=document.createElement("span");
      spani.classList.add("checkbox");
      spani.innerHTML='<i class="ri-checkbox-circle-line"></i>';
      let span=document.createElement("span");
      span.classList.add("text");
      span.textContent=task.text;
      let btd=document.createElement("button");
     btd.classList.add("delete");
     btd.innerHTML='<i class="ri-delete-bin-line"></i>';
       spani.addEventListener("click",function(){
        span.classList.toggle("ne");
        spani.classList.toggle("col");
        task.done=!task.done;
        li.classList.toggle("done");
        });
        btd.addEventListener("click",function(){
        tasks=tasks.filter(t=>t.id!==task.id);
        rendertask();
        savetasks();
        });
       (li).append(spani);
       (li).append(span);
       (li).append(btd);
       (ul).append(li);
    });
      updatecount();
}
//adding event listener to input
let input=document.querySelector("#taskinput");
let bta=document.querySelector("#addbtn");
let ul=document.querySelector("#tasklist");
bta.addEventListener("click",function(){
    let newtask={
        id:Date.now(),
        text:input.value.trim(),
        done:false
    }
    tasks.push(newtask);
    rendertask();
    input.value="";
    savetasks();
      
});
//clear done button
let btr=document.querySelector("#reset");
    btr.addEventListener("click",function(){
    tasks=tasks.filter(t=>t.done===false);
    rendertask();
    savetasks();
});
 //task remaining
let taskcount=document.querySelector("#taskcount")
 function updatecount(){
    let remaining=tasks.filter(t=>t.done===false).length;
    taskcount.textContent=remaining+" tasks remaining";
 }
//adding localstorage
function savetasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function loadtasks(){
    let saved=localStorage.getItem("tasks");
    tasks=saved?JSON.parse(saved):[];
    rendertask();
}
loadtasks();

