//seleciona os elementos
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//nomes das classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variaveis
let LIST, id;

//get item from local storage
let data = localStorage.getItem("TODO");

//CHECK IF DATA IS NOT EMPTY
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the user's interface
}else{
    //if data isn't empty
    LIST = [];
    id = 0;
}

//load items to the users interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
    
}

//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//mostra a data
const option = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("pt-BR", Option); //option para extenso

//função para add todo
function addToDo(toDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `  <li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i> 
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//adiciona um todo pressionando enter
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        //se o input não estiver vazio
        if (toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id, 
                done : false,
                trash : false
            });

            //adicionar item ao local storage (sempre que o array é atualizado)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        //limpa o input após dar submit
        input.value = "";
    }
});

//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove todo
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside the list
    const elementJob = element.attributes.job.value; 

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    //adicionar item ao local storage (sempre que o array é atualizado)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
