import { addTodo } from '../api/todos';

const AddToDo = () => {
  const container = document.createElement('div');
  container.className = 'add-todo-container';

  const title = document.createElement('h2');
  title.textContent = 'Добавить новую заметку';
  title.className = 'add-todo-title';
  container.appendChild(title);

  const form = document.createElement('form');
  form.className = 'add-todo-form';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Что нужно сделать?';
  input.required = true;
  input.className = 'add-todo-input';

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Добавить';
  button.className = 'add-todo-button';

  form.onsubmit = async (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;

    try {
      await addTodo(input.value.trim());
      input.value = '';
      window.location.hash = '';
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  form.appendChild(input);
  form.appendChild(button);
  container.appendChild(form);

  const backBtn = document.createElement('button');
  backBtn.textContent = 'Назад';
  backBtn.className = 'back-button';
  backBtn.onclick = () => {
    window.location.hash = '';
  };
  container.appendChild(backBtn);

  return container;
};

export default AddToDo;
