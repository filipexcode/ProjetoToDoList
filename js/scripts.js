//Seleção de Elememntos
const todoform = document.querySelector("#todo-form");
const todoinput = document.querySelector("#todo-input");
const todolist = document.querySelector("#todo-list");
const editform = document.querySelector("#edit-form");
const editinput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let antigoinputvalue;

//Funções

     const savetodo = (text) => {
         const todo = document.createElement("div");
         todo.classList.add("todo");

         const todotitle = document.createElement("h3");
         todotitle.innerText = text;
         todo.appendChild(todotitle);
            
         const doneBtn = document.createElement("button");
         doneBtn.classList.add("finish-todo");
         doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
         todo.appendChild(doneBtn);

         const editBtn = document.createElement("button");
         editBtn.classList.add("edit-todo");
         editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
         todo.appendChild(editBtn);

         const deleteBtn = document.createElement("button");
         deleteBtn.classList.add("remove-todo");
         deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
         todo.appendChild(deleteBtn);

         todolist.appendChild(todo);

         todoinput.value = "";
         todoinput.focus();
    };

    const toggleforms = () => {
        editform.classList.toggle("hide");
        todoform.classList.toggle("hide");
        todolist.classList.toggle("hide");
    }

    const updatetodo = (text) => {
        const todos = document.querySelectorAll(".todo"); //Array que vai selecionar todos os todo.

        todos.forEach((todo) => {

            let todotitle = todo.querySelector("h3");

            if (todotitle.innerText === antigoinputvalue) {
                todotitle.innerText = text; //Altera o texto se estiver tudo certo.
            }
        });

    }

//Eventos

todoform.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoinput.value;
    if (inputValue){
        savetodo(inputValue);
    }
});

document.addEventListener("click", (e) => {

    const targetel = e.target;
    const parentel = targetel.closest("div"); //seleciona o elemento pai (div) mais proximo.
    let todotitle;

    if (parentel && parentel.querySelector("h3")) {
        todotitle = parentel.querySelector("h3").innerText;
    }

    if (targetel.classList.contains("finish-todo")) {
        parentel.classList.toggle("done"); //Adicionando a classe "done" para os todo clicados.
    }
        
    if (targetel.classList.contains("remove-todo")) {
        parentel.remove(); //Remove o elemento pai.
    }

    if (targetel.classList.contains("edit-todo")) {
        toggleforms(); //Vai esconder um formulário e criar outro.

        editinput.value = todotitle;
        antigoinputvalue = todotitle; //Salva o valor antigo.
    }

});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault(); //Para não enviar formulário.

    toggleforms();
});

editform.addEventListener("submit", (e) => {

    e.preventDefault();

    const editinputvalue = editinput.value;

    if (editinputvalue) {
        updatetodo(editinputvalue); //Vai mandar o valor do input.
    }

    toggleforms();
})

