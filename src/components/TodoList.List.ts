import { fetchTodos, deleteTodo, updateTodo } from "../api/todos";
import type { Todo } from '../types';

const ITEMS_PER_PAGE = 10;
const ICON_BASE_PATH = '/icon/';

const getActionIconPath = (name: string) => {
  return ICON_BASE_PATH + name + '.svg';
};

const createTodoItem = (
  todo: Todo,
  onDelete: (_id: string) => Promise<void>,
  onToggle: (_id: string) => Promise<void>,
  onEdit: (_id: string, newText: string) => Promise<void>
): HTMLElement => {
  const li = document.createElement("li");
  li.style.display = "flex";
  li.style.alignItems = "center";
  li.style.marginBottom = "10px";
  li.style.padding = "10px";
  li.style.border = "1px solid #ddd";
  li.style.borderRadius = "0px";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.style.marginRight = "10px";
  checkbox.addEventListener("change", () => onToggle(todo._id));

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
  editButton.innerHTML = `<img src="${getActionIconPath('edit')}" alt="Редактировать" style="width:24px;height:24px;vertical-align:middle;">`;
  editButton.title = "Редактировать";
  editButton.style.marginRight = "8px";
  editButton.style.padding = "4px";
  editButton.style.backgroundColor = "transparent";
  editButton.style.color = "#836FFF";
  editButton.style.border = "none";
  editButton.style.borderRadius = "0px";
  editButton.style.cursor = "pointer";
  editButton.style.fontSize = "1.2em";
  editButton.onclick = () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.title;
    input.style.flex = "1";
    input.style.margin = "0 8px";
    input.style.padding = "4px";
    input.style.border = "1px solid #ddd";
    input.style.borderRadius = "0px";

    const saveButton = document.createElement("button");
    saveButton.innerHTML = `<img src="${getActionIconPath('save')}" alt="Сохранить" style="width:24px;height:24px;vertical-align:middle;">`;
    saveButton.title = "Сохранить";
    saveButton.style.padding = "4px";
    saveButton.style.backgroundColor = "transparent";
    saveButton.style.color = "#836FFF";
    saveButton.style.border = "none";
    saveButton.style.borderRadius = "0px";
    saveButton.style.cursor = "pointer";
    saveButton.style.fontSize = "1.2em";
    saveButton.onclick = async () => {
      if (input.value.trim()) {
        await onEdit(todo._id, input.value);
      }
    };

    const cancelButton = document.createElement("button");
    cancelButton.innerHTML = `<img src="${getActionIconPath('cancel')}" alt="Отмена" style="width:24px;height:24px;vertical-align:middle;">`;
    cancelButton.title = "Отмена";
    cancelButton.style.marginLeft = "8px";
    cancelButton.style.padding = "4px";
    cancelButton.style.backgroundColor = "transparent";
    cancelButton.style.color = "#ff2a6d";
    cancelButton.style.border = "none";
    cancelButton.style.borderRadius = "0px";
    cancelButton.style.cursor = "pointer";
    cancelButton.style.fontSize = "1.2em";
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
  deleteBtn.innerHTML = `<img src="${getActionIconPath('delete')}" alt="Удалить" style="width:24px;height:24px;vertical-align:middle;">`;
  deleteBtn.title = "Удалить";
  deleteBtn.style.padding = "4px";
  deleteBtn.style.backgroundColor = "transparent";
  deleteBtn.style.color = "#ff2a6d";
  deleteBtn.style.border = "none";
  deleteBtn.style.borderRadius = "0px";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.fontSize = "1.2em";
  deleteBtn.addEventListener("click", () => onDelete(todo._id));

  textContainer.appendChild(text);
  textContainer.appendChild(editButton);
  li.appendChild(checkbox);
  li.appendChild(textContainer);
  li.appendChild(deleteBtn);

  return li;
};

const TodoList = async () => {
  const container = document.createElement('div');
  container.className = 'todo-list-container';

  const topPanel = document.createElement('div');
  topPanel.style.display = 'flex';
  topPanel.style.gap = '16px';
  topPanel.style.marginBottom = '40px';
  topPanel.style.alignItems = 'center';
  topPanel.style.justifyContent = 'flex-start';

  const addTodoContainer = document.createElement('div');
  addTodoContainer.style.display = 'flex';
  addTodoContainer.style.justifyContent = 'center';
  addTodoContainer.style.gap = '10px';
  addTodoContainer.style.marginBottom = '20px';

  const addBtn = document.createElement('button');
  addBtn.id = 'addTodoBtn';
  addBtn.textContent = 'Добавить заметку';
  addBtn.onclick = () => { window.location.hash = '#/add'; };
  addBtn.style.background = '#836FFF';
  addBtn.style.color = 'var(--darker-bg)';
  addBtn.style.padding = '8px 24px';
  addBtn.style.borderRadius = '0px';
  addBtn.style.border = '1px solid #836FFF';
  addBtn.style.cursor = 'pointer';
  addBtn.style.fontFamily = 'Orbitron, sans-serif';
  addBtn.style.fontSize = '0.9em';
  addBtn.style.textTransform = 'uppercase';
  addBtn.style.letterSpacing = '2px';
  addBtn.style.fontWeight = 'bold';
  addBtn.style.transition = 'all 0.3s ease';

  addBtn.onmouseenter = () => {
    addBtn.style.background = 'var(--darker-bg)';
    addBtn.style.color = '#836FFF';
    addBtn.style.border = '2px solid #836FFF';
  };

  addBtn.onmouseleave = () => {
    addBtn.style.background = '#836FFF';
    addBtn.style.color = 'var(--darker-bg)';
  };

  const weatherBtn = document.createElement('button');
  weatherBtn.textContent = 'Обновить погоду';
  weatherBtn.onclick = () => {
    if (typeof (window as any).updateWeatherPanel === 'function') {
      (window as any).updateWeatherPanel();
    }
  };
  weatherBtn.style.padding = '8px 24px';
  weatherBtn.style.borderRadius = '0px';
  weatherBtn.style.background = 'var(--darker-bg)';
  weatherBtn.style.border = '2px solid #836FFF';
  weatherBtn.style.color = '#836FFF';
  weatherBtn.style.cursor = 'pointer';
  weatherBtn.style.fontFamily = 'Orbitron, sans-serif';
  weatherBtn.style.fontSize = '0.9em';
  weatherBtn.style.textTransform = 'uppercase';
  weatherBtn.style.letterSpacing = '2px';
  weatherBtn.style.fontWeight = 'bold';
  weatherBtn.style.boxShadow = 'none';
  weatherBtn.style.transition = 'background 0.2s, color 0.2s, border 0.2s';
  weatherBtn.onmouseenter = () => {
    weatherBtn.style.background = '#836FFF22';
    weatherBtn.style.color = '#fff';
    weatherBtn.style.border = '2px solid #fff';
  };
  weatherBtn.onmouseleave = () => {
    weatherBtn.style.background = 'var(--darker-bg)';
    weatherBtn.style.color = '#836FFF';
    weatherBtn.style.border = '2px solid #836FFF';
  };

  const gifBtn = document.createElement('button');
  gifBtn.textContent = 'Выбрать гифку';
  gifBtn.onclick = () => { window.location.hash = '#/gif-select'; };
  gifBtn.style.padding = '8px 24px';
  gifBtn.style.borderRadius = '0px';
  gifBtn.style.background = 'var(--darker-bg)';
  gifBtn.style.border = '2px solid #836FFF';
  gifBtn.style.color = '#836FFF';
  gifBtn.style.cursor = 'pointer';
  gifBtn.style.fontFamily = 'Orbitron, sans-serif';
  gifBtn.style.fontSize = '0.9em';
  gifBtn.style.textTransform = 'uppercase';
  gifBtn.style.letterSpacing = '2px';
  gifBtn.style.fontWeight = 'bold';
  gifBtn.style.boxShadow = 'none';
  gifBtn.style.transition = 'background 0.2s, color 0.2s, border 0.2s';
  gifBtn.onmouseenter = () => {
    gifBtn.style.background = '#836FFF22';
    gifBtn.style.color = '#fff';
    gifBtn.style.border = '2px solid #fff';
  };
  gifBtn.onmouseleave = () => {
    gifBtn.style.background = 'var(--darker-bg)';
    gifBtn.style.color = '#836FFF';
    gifBtn.style.border = '2px solid #836FFF';
  };

  topPanel.appendChild(addBtn);
  topPanel.appendChild(weatherBtn);
  topPanel.appendChild(gifBtn);
  container.appendChild(topPanel);

  const ul = document.createElement('ul');
  ul.id = 'todoList';
  container.appendChild(ul);
  const paginationContainer = document.createElement('div');
  paginationContainer.id = 'paginationContainer';
  container.appendChild(paginationContainer);

  let todos = await fetchTodos();
  let currentPage = 1;

  const renderPage = (page: number) => {
    ul.innerHTML = '';
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageTodos = todos.slice(start, end);
    pageTodos.forEach(todo => {
      const li = createTodoItem(
        todo,
        async (_id) => {
          await deleteTodo(_id);
          todos = await fetchTodos();
          renderPage(currentPage);
          updatePagination(currentPage, Math.ceil(todos.length / ITEMS_PER_PAGE));
        },
        async (_id) => {
          const todoToUpdate = todos.find(t => t._id === _id);
          if (todoToUpdate) {
            await updateTodo(_id, { completed: !todoToUpdate.completed });
            todos = await fetchTodos();
            renderPage(currentPage);
          }
        },
        async (_id, newText) => {
          await updateTodo(_id, { title: newText });
          todos = await fetchTodos();
          renderPage(currentPage);
        }
      );
      ul.appendChild(li);
    });
  };

  const updatePagination = (page: number, totalPages: number) => {
    paginationContainer.innerHTML = '';
    if (totalPages > 1) {
      const paginationDiv = document.createElement('div');
      paginationDiv.style.marginTop = '20px';

      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = String(i);
        pageBtn.style.margin = '0 5px';
        pageBtn.style.padding = '8px 16px';
        pageBtn.style.background = i === page ? 'var(--neon-blue)' : 'var(--darker-bg)';
        pageBtn.style.color = i === page ? 'var(--darker-bg)' : 'var(--neon-blue)';
        pageBtn.style.border = i === page ? '1px solid var(--neon-blue)' : '1px solid var(--neon-blue)';
        pageBtn.style.borderRadius = '0px';
        pageBtn.style.cursor = 'pointer';
        pageBtn.style.fontFamily = 'Orbitron, sans-serif';
        pageBtn.style.fontSize = '0.9em';
        pageBtn.style.transition = 'all 0.3s ease';
        pageBtn.onclick = () => {
          currentPage = i;
          renderPage(currentPage);
          updatePagination(currentPage, totalPages);
        };
        pageBtn.onmouseenter = () => {
          if (i !== page) {
            pageBtn.style.background = '#836FFF22';
            pageBtn.style.color = '#fff';
            pageBtn.style.border = '2px solid #fff';
          }
        };
        pageBtn.onmouseleave = () => {
          if (i !== page) {
            pageBtn.style.background = 'var(--darker-bg)';
            pageBtn.style.color = 'var(--neon-blue)';
            pageBtn.style.border = '1px solid var(--neon-blue)';
          }
        };
        paginationDiv.appendChild(pageBtn);
      }
      paginationContainer.appendChild(paginationDiv);
    }
  };

  renderPage(currentPage);
  updatePagination(currentPage, Math.ceil(todos.length / ITEMS_PER_PAGE));

  return container;
};

export default TodoList; 