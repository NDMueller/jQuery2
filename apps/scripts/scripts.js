$(document).ready(function() {
  $('#newTaskForm').hide();
  var storage = JSON.parse(localStorage.getItem('list'));
  var listo = storage || [];
  console.log('listo: ', listo);
  for (var i = 0; i < listo.length; i++) {
    var parent = "#newList";
    if (listo[i].id == 'inProgress')
      parent = '#currentList';
    if (listo[i].id == 'archived')
      parent = '#archivedList';
    $(parent).append(
        '<a href="#finish" class="" id="item">' +
        '<li class="list-group-item">' +
        '<h3>' + listo[i].task + '</h3>'+
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>'
    );
  }
  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  };
  var saveList = function() {
    localStorage.setItem('list', JSON.stringify(listo));
  }
  var addTask = function(task) {
    if(task) {
        task = new Task(task);
        listo.push(task);
      saveList();
        $('#newItemInput').val('');
          $('#newList').append(
          '<a href="#finish" class="" id="item">' +
          '<li class="list-group-item">' +
          '<h3>' + task.task + '</h3>'+
          '<span class="arrow pull-right">' +
          '<i class="glyphicon glyphicon-arrow-right">' +
          '</span>' +
          '</li>' +
          '</a>'
      );
    }
    $('#newTaskForm').slideToggle('fast', 'linear');
  };
  $('#saveNewItem').on('click', function (e) {
      e.preventDefault();
      var task = $('#newItemInput').val().trim();
      addTask(task);
  });
  $('#add-todo').on('click', function () {
      $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  $('#cancel').on('click', function (e) {
      e.preventDefault();
      $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  var advanceTask = function(task) {
    var modified = task.innerText.trim().toLowerCase();
    for (var i = 0; i < listo.length; i++) {
      var item = listo[i];
      if (item.task.toLowerCase() === modified) {
        if (item.id == 'new') {
          item.id = 'inProgress'
        } else if (item.id == 'inProgress') {
          item.id = 'archived';
        } else {
          listo.splice(i, 1);
        }
        saveList();
        break;
      }
    }
    task.remove();
  };
  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });
  $(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    $('#archivedList').append(this.outerHTML);
  });
  $(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });
});
