const currentPage = window.location.pathname.split("/").pop() || "home.html";
const activePage = currentPage === "index.html" ? "home.html" : currentPage;

document.querySelectorAll(".nav-links a").forEach((link) => {
    const isActive = new URL(link.href).pathname.split("/").pop() === activePage;
    link.classList.toggle("active", isActive);

    if (isActive) {
        link.setAttribute("aria-current", "page");
    } else {
        link.removeAttribute("aria-current");
    }
});


/* ACADEMIC PLANNER */

const taskForm = document.getElementById("taskForm");

if (taskForm) {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const taskPanelTitle = document.getElementById("taskPanelTitle");

    let tasks = [];

    function displayTasks() {
        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskPanelTitle.style.display = "none";

            const emptyMessage = document.createElement("p");
            emptyMessage.className = "empty-message";
            emptyMessage.textContent = "No tasks yet";

            taskList.appendChild(emptyMessage);
            return;
        }

        taskPanelTitle.style.display = "block";
        taskPanelTitle.textContent = "Pending Tasks";

        tasks.forEach((task) => {
            const taskItem = document.createElement("div");
            taskItem.className = "task-item";

            if (task.completed) {
                taskItem.classList.add("completed");
            }

            // Completion checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.setAttribute("aria-label", "Mark task as completed");

            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked;
                displayTasks();
            });

            // Task description
            const taskName = document.createElement("span");
            taskName.className = "task-name";
            taskName.textContent = task.name;

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-task";
            deleteButton.type = "button";
          deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteButton.setAttribute("aria-label", "Delete task");

            deleteButton.addEventListener("click", () => {
                tasks = tasks.filter(item => item.id !== task.id);
                displayTasks();
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskName);
            taskItem.appendChild(deleteButton);

            taskList.appendChild(taskItem);
        });
    }

    // Add a new task
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const taskName = taskInput.value.trim();

        if (taskName === "") {
            return;
        }

        tasks.push({
            id: Date.now() + Math.random(),
            name: taskName,
            completed: false
        });

        taskInput.value = "";
        displayTasks();
    });

    // Initial display
    displayTasks();
}

/* CONTACT FORM */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    const successMessage = document.getElementById("successMessage");
    const contactFormContainer = document.getElementById("contactFormContainer");

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Clear previous errors
        document.querySelectorAll(".error-message").forEach(error => {
            error.textContent = "";
        });

        let isValid = true;

        // Validate name
        if (fullName.value.trim() === "") {
            document.getElementById("nameError").textContent =
                "Please enter your full name.";
            isValid = false;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            document.getElementById("emailError").textContent =
                "Please enter a valid email address.";
            isValid = false;
        }

        // Validate phone (digits only)
        const phonePattern = /^\d+$/;

        if (!phonePattern.test(phone.value.trim())) {
            document.getElementById("phoneError").textContent =
                "Phone number must contain digits only.";
            isValid = false;
        }

        // Validate message
        if (message.value.trim() === "") {
            document.getElementById("messageError").textContent =
                "Please enter your message.";
            isValid = false;
        }

        // Display success message
        if (isValid) {
            contactFormContainer.hidden = true;
            successMessage.hidden = false;

            contactForm.reset();
        }

    });

}
