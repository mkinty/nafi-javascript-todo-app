import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

console.log(input, form);

// on submit form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const todos = [
  {
    text: "Apprendre le JavaScript",
    done: true,
    editMode: true,
  },
  {
    text: "Apprendre Python",
    done: true,
    editMode: false,
  },
  {
    text: "Apprendre Django et React",
    done: false,
    editMode: false,
  },
];

// display data func
const displayTodo = () => {
  const todoNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditModeElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todoNode);
};

// create element func
const createTodoElement = (todo, index) => {
  const li = document.createElement("li");

  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Editer";
  buttonEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });

  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>`;

  li.addEventListener("click", (event) => {
    toggleTodo(index);
  });

  li.append(buttonEdit, buttonDelete);
  return li;
};

// create to do edit mode element func
const createTodoEditModeElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;

  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Cancel";
  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  const buttonSave = document.createElement("button");
  buttonSave.innerHTML = "Save";
  buttonSave.addEventListener("click", (event) => {
    event.stopPropagation();
    editTodo(index, input);
  });

  li.append(input, buttonCancel, buttonSave);
  return li;
};

// add data func
const addTodo = (text) => {
  todos.push({
    text,
    done: false,
  });
  displayTodo();
};

// delete data func

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

// toggle todo func
const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

// toggle edit mode func
const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

// edit to do func
const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
};

displayTodo();
