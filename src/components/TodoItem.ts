
import type { Todo } from "../types/Todo";

export const createTodoItem = (todo: Todo, onDelete: (id: number) => void, onToggle: (id: number) => void): HTMLElement => {
  const li = document.createElement("li");
  li.textContent = todo.text;
  li.style.textDecoration = todo.completed ? "line-through" : "none";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener("click", () => onDelete(todo.id));

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => onToggle(todo.id));

  li.prepend(checkbox);
  li.appendChild(deleteBtn);

  return li;
};
