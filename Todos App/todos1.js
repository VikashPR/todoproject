document.addEventListener("DOMContentLoaded", function() {
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    const deleteCheckedBtn = document.getElementById("deleteCheckedBtn");
    const countsDisplay = document.getElementById("countsDisplay");
    const allBtn = document.getElementById("allBtn");
    const activeBtn = document.getElementById("activeBtn");
    const completedBtn = document.getElementById("completedBtn");
    const now = document.getElementById("now");

    let previousValue = "";
    let filter = "all";
    let isDropdownVisible = false;

    now.style.display = "none";
    countsDisplay.style.display = "none";

    todoInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    now.addEventListener("click", toggleSelectAll);

    function addTodo() {
        const todoText = todoInput.value;
        if (todoText !== "") {
            showButtons();
            now.style.display = "inline-block";
            countsDisplay.style.display = "inline";

            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", updateChecked);

            const span = document.createElement("span");
            span.textContent = todoText;

            span.addEventListener("dblclick", function() {
                const inputfield = document.createElement("input");
                inputfield.type = "text";
                inputfield.value = span.textContent;
                li.replaceChild(inputfield, span);
                inputfield.focus();

                inputfield.addEventListener("blur", function() {
                    span.textContent = inputfield.value;
                    li.replaceChild(span, inputfield);
                });
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            todoList.appendChild(li);
            todoInput.value = "";
            updateChecked();
        } else {
            todoInput.focus();
        }
    }

    function updateChecked() {
        const items = todoList.querySelectorAll("li");
        let checkedCount = 0;
        items.forEach(item => {
            const checkbox = item.querySelector("input[type='checkbox']");
            if (checkbox.checked) {
                item.classList.add("checked");
                checkedCount++;
            } else {
                item.classList.remove("checked");
            }
        });
        const remainingCount = items.length - checkedCount;
        countsDisplay.textContent = `${remainingCount} items Left!`;
    }

    function showButtons() {
        allBtn.style.display = "inline-block";
        activeBtn.style.display = "inline-block";
        completedBtn.style.display = "inline-block";
        deleteCheckedBtn.style.display = "inline-block";
    }

    function toggleSelectAll() {
        const checkboxes = todoList.querySelectorAll("input[type='checkbox']");
        const areAllChecked = [...checkboxes].every(checkbox => checkbox.checked);
        checkboxes.forEach(checkbox => {
            checkbox.checked = !areAllChecked;
        });
        updateChecked();
    }

    deleteCheckedBtn.addEventListener("click", deleteChecked);

    function deleteChecked() {
        const items = todoList.querySelectorAll("li");
        items.forEach(item => {
            const checkbox = item.querySelector("input[type='checkbox']");
            if (checkbox.checked) {
                todoList.removeChild(item);
            }
        });
        updateChecked();
        if (todoList.childElementCount === 0) {
            hideButtons();
            countsDisplay.style.display = "none";
        }
    }

    document.addEventListener("copy", function(event) {
        alert("Copying detected. Please don't repeat it.");
    });

    completed();

    allBtn.addEventListener("click", function() {
        filter = "all";
        filterItems();
    });

    activeBtn.addEventListener("click", function() {
        filter = "active";
        filterItems();
    });

    completedBtn.addEventListener("click", function() {
        filter = "completed";
        filterItems();
    });

    function completed() {
        const items = todoList.querySelectorAll("li");
        items.forEach(item => {
            const checkbox = item.querySelector("input[type='checkbox']");
            if (!checkbox.checked) {
                item.classList.add("checked");
                checkbox.checked = true;
            }
        });
        updateChecked();
    }

    function filterItems() {
        const items = todoList.querySelectorAll("li");
        items.forEach(item => {
            switch (filter) {
                case "all":
                    item.style.display = "flex";
                    break;
                case "active":
                    if (item.querySelector("input[type='checkbox']").checked) {
                        item.style.display = "none";
                    } else {
                        item.style.display = "flex";
                    }
                    break;
                case "completed":
                    if (!item.querySelector("input[type='checkbox']").checked) {
                        item.style.display = "none";
                    } else {
                        item.style.display = "flex";
                    }
                    break;
                default:
                    item.style.display = "flex";
                    break;
            }
        });
    }

    function hideButtons() {
        allBtn.style.display = "none";
        activeBtn.style.display = "none";
        completedBtn.style.display = "none";
        deleteCheckedBtn.style.display = "none";
    }
});