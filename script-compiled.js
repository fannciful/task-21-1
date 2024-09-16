"use strict";

$(document).ready(function () {
  var todoForm = $('.todo-form');
  var inputField = $('.input-field');
  var todoList = $('.todo-list');
  var loadTodos = function loadTodos() {
    var todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(function (todo) {
      return addTodoToDOM(todo);
    });
  };
  var addTodoToDOM = function addTodoToDOM(todo) {
    var todoItem = $('<li>').addClass('todo-item list-group-item d-flex justify-content-between align-items-center');
    var todoText = $('<span>').addClass('todo-text').text(todo.text);
    var deleteBtn = $('<button>').addClass('btn btn-danger btn-sm').text('Видалити');
    deleteBtn.on('click', function (e) {
      e.stopPropagation();
      todoItem.remove();
      removeTodoFromStorage(todo.text);
    });
    todoItem.on('click', function () {
      $('#taskText').text(todo.text);
      $('#taskModal').modal('show');
    });
    todoItem.append(todoText, deleteBtn);
    todoList.append(todoItem);
  };
  todoForm.on('submit', function (e) {
    e.preventDefault();
    var todoText = inputField.val().trim();
    if (todoText === '') return;
    var todo = {
      text: todoText
    };
    addTodoToDOM(todo);
    saveTodoToStorage(todo);
    inputField.val('');
  });
  var saveTodoToStorage = function saveTodoToStorage(todo) {
    var todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  var removeTodoFromStorage = function removeTodoFromStorage(text) {
    var todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(function (todo) {
      return todo.text !== text;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  loadTodos();
});
