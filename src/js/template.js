function Template() {
    view_template = 
    '<li>' +
      '<div class="view">' +
        '<input class="toggle" type="checkbox"/>' +
        '<label class="label">{{title}}</label>' +
        '<button class="destroy"></button>' +
      '</div>' +
      '<input class="edit" value="{{title}}" />' +
    '</li>';

    edit_template = 
    '<li class="editing">' +
      '<div class="view">' +
        '<input class="toggle" type="checkbox" />' +
        '<label class="label">{{edited}}</label>' +
        '<button class="destroy"></button>' +
      '</div>' +
      '<input class="edit" value="{{edited}}" />' +
    '</li>';

    completed_template = 
    '<li class="completed">' +
    '<div class="view">' +
      '<input class="toggle" type="checkbox" checked/>' +
      '<label class="label">{{completed}}</label>' +
      '<button class="destroy"></button>' +
    '</div>' +
    '<input class="edit" value="{{completed}}" />' +
  '</li>';
}