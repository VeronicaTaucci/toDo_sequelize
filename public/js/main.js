console.log('hello')
let ul = document.querySelector('.appendLi')
let inputDescription = document.querySelector('#input1')
let form = document.querySelector('#formOne')
let headers = { "Content-type": "application/json; charset=UTF-8" }

const getAllTodos =async  () => { 
    let data = await fetch('/todos');
    let toDos = await data.json()
    displayToDos(toDos)
}




ul.addEventListener('click', async (e) => {
    if (e.target.className === 'fas fa-trash') {
        let primaryKey = e.target.id;
        console.log(primaryKey);
        //? todos/id
        let result = await fetch(`/todos/${primaryKey}`, {
            method: "DELETE",
            headers: headers
        })
        let records = await result.json();
        getAllTodos(records)
    }
    if (e.target.className === 'fas fa-pencil-alt') {
        //default-state-id
        let id = e.target.id; //record id
        let ds = `default-state-${id}`
        let defaultState = document.getElementById(ds)
        //edit-state-id
        let es = `edit-state-${id}`
        let editState = document.getElementById(es)
        defaultState.className = "row pr-3 visually-hidden"
        editState.className = "row pr-3"
    }

    if (e.target.textContent == "Edit") {
        let id = e.target.id
        //update-id
        let editField = `update-${id}`
        let editDOMElement = document.getElementById(editField);
        let results = await fetch(`/todos/${id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({
                description: editDOMElement.value
            })
        })
        let records = await results.json();
        getAllTodos(records);
        resetListItems(id)

    }
    if (e.target.textContent == "Cancel") {
        let id = e.target.id;
        resetListItems(id)
    }
})

const resetListItems = (id) => {
    //find the default ste id dom elemnt 
    let ds = `default-state-${id}`
    let defaultSTate = document.getElementById(ds);
    defaultSTate.className = 'row pr-3 visible'
    //find the edit-stat 
    let es = `edit-state-${id}`
    let editSTate = document.getElementById(es)
    editSTate.className = "row pr-3 visually-hidden"
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const response = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ description: inputDescription.value })
    })
    const records = await response.json()
    displayToDos(records)

})

const displayToDos = (toDosArr) => {
    let htmlBlock = ''
    toDosArr.forEach(item => {
        htmlBlock += `
                        <li>
                <div id="default-state-${item.id}" class="row pr-3">
                    <div class="col-10">
                        ${item.description}
                    </div>
                    <div  class="col-2 text-right pr-2">
                        <button class="button btn">
                            <span>
                                <i id='${item.id}' class="fas fa-pencil-alt"></i>
                            </span>
                        </button>
                        <button  class="button btn">
                            <span>
                                <i id='${item.id}' class="fas fa-trash"></i>
                            </span>
                        </button>
                    </div>
                </div>
                <div id="edit-state-${item.id}" class="row pr-3 visually-hidden">
                        <div class="col-10">
                            <div id="editContainer" class="input-group">
                                    <div class="input-group-prepend ">
                                        <span class="input-group-text h-100">Todo</span>
                                    </div>
                                    <textarea name="task" id="update-${item.id}" 
                                    class="form-control" 
                                    aria-label="With textarea"
                                    placeholder="Edit a todo item...">${item.description}</textarea>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-info h-100" type="submit" id="${item.id}">Edit</button>
                                    </div>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-danger h-100" type="button" id="${item.id}">Cancel</button>
                                    </div>
                            </div>
                        </div> 
                </div>
            </li>
        
        `
    })
    ul.innerHTML = htmlBlock
}
getAllTodos()