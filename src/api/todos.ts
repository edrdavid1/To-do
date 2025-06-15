import type { Todo } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api/todos';

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return await response.json();
};

export const addTodo = async (title: string): Promise<Todo> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error('Failed to add todo');
  return await response.json();
};

export const updateTodo = async (_id: string, data: Partial<Todo>): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update todo');
  return await response.json();
};

export const deleteTodo = async (_id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todo');
};
