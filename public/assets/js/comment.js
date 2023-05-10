document.addEventListener('DOMContentLoaded', function () {
    var items = document.querySelectorAll('.comment-item');

    items.forEach(function (item) {
        var menu = item.nextElementSibling;

        item.addEventListener('click', function (e) {
            e.preventDefault();
            var rect = item.getBoundingClientRect();

            menu.style.top = rect.top + 'px';
            menu.style.left = rect.right + 'px';
            menu.style.display = 'block';
        });

        item.addEventListener('blur', function (event) {
            if (!menu.contains(event.relatedTarget)) {
                menu.style.display = 'none';
            }
        });
    });
});
