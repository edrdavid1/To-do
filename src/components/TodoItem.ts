import type { Todo } from "../types";

export const createTodoItem = (todo: Todo, onDelete: (id: string) => void, onToggle: (id: string) => void): HTMLElement => {
  const li = document.createElement("li");
  li.textContent = todo.title;
  li.style.textDecoration = todo.completed ? "line-through" : "none";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener("click", () => onDelete(todo._id));

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => onToggle(todo._id));

  li.prepend(checkbox);
  li.appendChild(deleteBtn);

  return li;
};
