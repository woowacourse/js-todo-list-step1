$(document).on('keypress', function (e) {
    if (e.which == 13) {
        const todoItem = $("#new-todo-title").val();
        $("#todo-list").append
        ("  <li>\n" +
            "    <div class=\"view\">\n" +
            "      <input class=\"toggle\" type=\"checkbox\"/>\n" +
            "      <label class=\"label\">" + todoItem + "</label>\n" +
            "      <button class=\"destroy\"></button>\n" +
            "    </div>\n" +
            "    <input class=\"edit\" value=\"새로운 타이틀\" />\n" +
            "  </li>");
    }
});

