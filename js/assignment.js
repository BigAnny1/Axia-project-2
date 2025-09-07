document.addEventListener("DOMContentLoaded", async () => {
  const cardsContainer = document.querySelector(".cards");

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();

    cardsContainer.innerHTML = "";

    // Loop through first 10 assignments
    data.slice(0, 10).forEach(todo => {

  
      const cardHTML = `
        <div class="assignment-card ${todo.completed ? "completed" : "pending"}">
          <h3>${todo.title}</h3>
          <p>Status: <span class="status">${todo.completed ? "Completed" : "Pending"}</span></p>



          <div class="progress">
            <div class="progress-bar" style="width: ${todo.completed ? "100%" : "30%"}"></div>
          </div>
        </div>
      `;

      cardsContainer.innerHTML += cardHTML;
    });

  } catch (error) {
    console.error("Error loading assignments:", error);
    cardsContainer.innerHTML = "<p>Failed to load assignments. Please try again later.</p>";
  }
});
