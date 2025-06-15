import { fetchTodos, deleteTodo, updateTodo } from "../api/todos";
import type { Todo } from '../types';
import TodoList from '../components/TodoList';
import WeatherPanel from '../components/WeatherPanel';
import GifPanel from '../components/GifPanel';
import DateTimePanel from '../components/DateTimePanel';

const ITEMS_PER_PAGE = 10;

const createTodoItem = (
  todo: Todo,
  onDelete: (id: number) => Promise<void>,
  onToggle: (id: number) => Promise<void>,
  onEdit: (id: number, newText: string) => Promise<void>
): HTMLElement => {
  const li = document.createElement("li");
  li.style.display = "flex";
  li.style.alignItems = "center";
  li.style.marginBottom = "10px";
  li.style.padding = "10px";
  li.style.border = "1px solid #ddd";
  li.style.borderRadius = "4px";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.style.marginRight = "10px";
  checkbox.addEventListener("change", () => onToggle(todo.id));

  const textContainer = document.createElement("div");
  textContainer.style.flex = "1";
  textContainer.style.display = "flex";
  textContainer.style.alignItems = "center";
  textContainer.style.gap = "8px";

  const text = document.createElement("span");
  text.textContent = todo.title;
  text.style.margin = "0 8px";
  text.style.textDecoration = todo.completed ? "line-through" : "none";
  text.style.flex = "1";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.style.marginRight = "8px";
  editButton.style.padding = "4px 8px";
  editButton.style.backgroundColor = "#4CAF50";
  editButton.style.color = "white";
  editButton.style.border = "none";
  editButton.style.borderRadius = "4px";
  editButton.style.cursor = "pointer";
  editButton.onclick = () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.title;
    input.style.flex = "1";
    input.style.margin = "0 8px";
    input.style.padding = "4px";
    input.style.border = "1px solid #ddd";
    input.style.borderRadius = "4px";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.style.padding = "4px 8px";
    saveButton.style.backgroundColor = "#2196F3";
    saveButton.style.color = "white";
    saveButton.style.border = "none";
    saveButton.style.borderRadius = "4px";
    saveButton.style.cursor = "pointer";
    saveButton.onclick = async () => {
      if (input.value.trim()) {
        await onEdit(todo.id, input.value);
      }
    };

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.marginLeft = "8px";
    cancelButton.style.padding = "4px 8px";
    cancelButton.style.backgroundColor = "#f44336";
    cancelButton.style.color = "white";
    cancelButton.style.border = "none";
    cancelButton.style.borderRadius = "4px";
    cancelButton.style.cursor = "pointer";
    cancelButton.onclick = () => {
      textContainer.replaceChild(text, input);
      textContainer.removeChild(saveButton);
      textContainer.removeChild(cancelButton);
      textContainer.appendChild(editButton);
    };

    textContainer.replaceChild(input, text);
    textContainer.appendChild(saveButton);
    textContainer.appendChild(cancelButton);
    textContainer.removeChild(editButton);
    input.focus();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.padding = "4px 8px";
  deleteBtn.style.backgroundColor = "#f44336";
  deleteBtn.style.color = "white";
  deleteBtn.style.border = "none";
  deleteBtn.style.borderRadius = "4px";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.addEventListener("click", () => onDelete(todo.id));

  textContainer.appendChild(text);
  textContainer.appendChild(editButton);
  li.appendChild(checkbox);
  li.appendChild(textContainer);
  li.appendChild(deleteBtn);

  return li;
};

const Home = async () => {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'home-page';

  const createMainLayout = async () => {
    const mainLayout = document.createElement('div');
    mainLayout.className = 'main-layout';

    const leftPanel = document.createElement('div');
    leftPanel.className = 'left-panel';
    leftPanel.appendChild(await TodoList());

    const rightPanel = document.createElement('div');
    rightPanel.className = 'right-panel';

    const weatherPanel = await WeatherPanel();
    rightPanel.appendChild(weatherPanel);

    const gifPanel = GifPanel();
    rightPanel.appendChild(gifPanel);

    const dateTimePanel = DateTimePanel();
    rightPanel.appendChild(dateTimePanel);

    mainLayout.appendChild(leftPanel);
    mainLayout.appendChild(rightPanel);

    return mainLayout;
  };

  const mainLayout = await createMainLayout();
  mainDiv.appendChild(mainLayout);

  return mainDiv;
};

export default Home;
