const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const total = document.getElementById("total");
const completed = document.getElementById("completed");
const pending = document.getElementById("pending");

const filterButtons = document.querySelectorAll(".filter-btn");

let filter = "all";

// Add Task
addTaskBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();
    const date = taskDate.value;

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.className = "task";
    li.dataset.status = "pending";

    li.innerHTML = `
        <h3>${text}</h3>
        <p>📅 ${date || "No Date Selected"}</p>

        <div class="task-buttons">

            <button class="complete">Complete</button>

            <button class="edit">Edit</button>

            <button class="delete">Delete</button>

        </div>
    `;

    taskList.appendChild(li);

    taskInput.value = "";
    taskDate.value = "";

    updateCounts();
    applyFilter();

});

// Button Events
taskList.addEventListener("click", function(e){

    const task = e.target.closest(".task");

    if(!task) return;

    // Complete
    if(e.target.classList.contains("complete")){

        task.classList.toggle("completed");

        if(task.classList.contains("completed")){

            task.dataset.status = "completed";
            e.target.textContent = "Undo";

        }

        else{

            task.dataset.status = "pending";
            e.target.textContent = "Complete";

        }

    }

    // Edit
    if(e.target.classList.contains("edit")){

        const title = task.querySelector("h3");

        let updated = prompt("Edit Task", title.textContent);

        if(updated && updated.trim() !== ""){

            title.textContent = updated;

        }

    }

    // Delete
    if(e.target.classList.contains("delete")){

        task.remove();

    }

    updateCounts();
    applyFilter();

});

// Update Counter
function updateCounts(){

    const tasks = document.querySelectorAll(".task");

    const completedTasks =
    document.querySelectorAll(".task.completed");

    total.textContent = tasks.length;

    completed.textContent = completedTasks.length;

    pending.textContent =
    tasks.length - completedTasks.length;

}

// Filter Buttons
filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

    filterButtons.forEach(btn=>btn.classList.remove("active"));

    button.classList.add("active");

    filter = button.dataset.filter;

    applyFilter();

});

});

// Apply Filter
function applyFilter(){

    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task=>{

        if(filter==="all"){

            task.style.display="block";

        }

        else if(filter==="completed"){

            task.style.display =
            task.dataset.status==="completed"
            ? "block" : "none";

        }

        else{

            task.style.display =
            task.dataset.status==="pending"
            ? "block" : "none";

        }

    });

}

updateCounts();