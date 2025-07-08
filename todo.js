function updateTime() {
    let now = new Date();
    document.getElementById("currentTime").innerText = "Time: " + now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
updateTime();
document.getElementById("taskInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // prevent form submission or page reload
        addTask(); // call your addTask function
    }
});

function addTask() {
    let taskText = document.getElementById("taskInput").value.trim();
    if (taskText === "") {
        alert("Task Cannot Be Empty");
        return;}

    let today = new Date().toISOString().split('T')[0];
    let taskList = document.getElementById("taskList");
    let dateSection = document.querySelector(`[data-date="${today}"]`);

    if (!dateSection) {
        dateSection = document.createElement("div");
        dateSection.dataset.date = today;
        dateSection.innerHTML = `<p class="date-header">Date: ${today}</p>`;
        taskList.appendChild(dateSection);
    }

    let newTask = document.createElement("div");
    newTask.classList.add("task");

    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("change", function () {
        newTask.classList.toggle("completed");
    });
   
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener("click", function () {
        newTask.remove();
        if (dateSection.children.length <= 1) {
            dateSection.remove();
        }
    });

    newTask.appendChild(checkbox);
    newTask.appendChild(taskSpan);
    newTask.appendChild(deleteBtn);
    dateSection.appendChild(newTask);

    document.getElementById("taskInput").value = "";
}
