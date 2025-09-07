document.addEventListener("DOMContentLoaded", async () => {
  const userNameEl = document.getElementById("userName");
  const userEmailEl = document.getElementById("userEmail");
  const userBioEl = document.getElementById("userBio");
  const profilePicEl = document.querySelector(".profile-pic img");

  const editBtn = document.querySelector(".edit-btn");
  const saveBtn = document.querySelector(".save-btn");
  const logoutBtn = document.querySelector(".logout-btn");

  try {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    const user = data.results[0];

    // populating profile with feched data
    userNameEl.textContent = `${user.name.first} ${user.name.last}`;
    userEmailEl.textContent =`Email: ${user.email}` ;
    profilePicEl.src = user.picture.large;
    userBioEl.textContent = `Hi, I'm ${user.name.first}. Welcome to my profile!`;

  } catch (err) {
    console.error("Error fetching profile:", err);
    userBioEl.textContent = "Failed to load profile. Please try again.";
  }

  // Logout button
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./login.html";
  });

  // Edit button functionality
  editBtn.addEventListener("click", () => {



    // Replace text with input fields
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = userNameEl.textContent;
    nameInput.id = "editName";
    userNameEl.replaceWith(nameInput);

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.value = userEmailEl.textContent;
    emailInput.id = "editEmail";
    userEmailEl.replaceWith(emailInput); //"UserEmailEl"my initial const variable

    const bioInput = document.createElement("textarea");
    bioInput.value = userBioEl.textContent;
    bioInput.id = "editBio";
    userBioEl.replaceWith(bioInput);

    // Show Save button
    saveBtn.style.display = "inline-block";
  });

  // get/Save update from inputs and button function 
  saveBtn.addEventListener("click", () => {
    const updatedName = document.getElementById("editName").value.trim();
    const updatedEmail = document.getElementById("editEmail").value.trim();
    const updatedBio = document.getElementById("editBio").value.trim();

    // Replace  updates 
    const nameEl = document.createElement("h2");
    nameEl.id = "userName";
    nameEl.textContent = updatedName;
    document.getElementById("editName").replaceWith(nameEl);

    const emailEl = document.createElement("p");
    emailEl.id = "userEmail";
    emailEl.textContent = updatedEmail;
    document.getElementById("editEmail").replaceWith(emailEl);

    const bioEl = document.createElement("p");
    bioEl.id = "userBio";
    bioEl.textContent = updatedBio;
    document.getElementById("editBio").replaceWith(bioEl);

    // Hide Save button again
    saveBtn.style.display = "none";
  });
});
