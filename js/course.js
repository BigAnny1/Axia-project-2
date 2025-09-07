document.addEventListener("DOMContentLoaded", async () => {
  const courseGrid = document.querySelector(".course-grid");

  try {
    // Fetch courses (books) from Open Library
    const res = await fetch("https://openlibrary.org/search.json?q=subject:programming");
    const data = await res.json();

   
    courseGrid.innerHTML = "";

    
    data.docs.slice(0, 12).forEach(book => {
      const card = document.createElement("div");
      card.classList.add("course-card");
      card.innerHTML = `
        <img src="${book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : './img/default-book.jpg'}" 
             alt="${book.title}">
        <h2>${book.title}</h2>
        <p>Author: ${book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
        <p>First Published: ${book.first_publish_year || "N/A"}</p>
        <button>View Course</button>
      `;
      courseGrid.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading courses:", error);
    courseGrid.innerHTML = "<p>Failed to load courses. Please try again later.</p>";
  }
});
