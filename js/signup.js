document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1"
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // save user in localStorage
      localStorage.setItem("user", JSON.stringify({ fullName, email, password }));

      //  show success, ignore ReqRes error( this is a fake api i did this so peoeple can randomly signup)
      alert("Signup successful! You can now log in.");

      // If ReqRes gives me a token, store it
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
q 
      // Redirect to login
      window.location.href = "login.html";

    } catch (error) {
      console.error("Error:", error);

      // Still store user even if fetch fails
      localStorage.setItem("user", JSON.stringify({ fullName, email, password }));

      alert("Signup successful! You can now log in.");
      window.location.href = "login.html";
    }
  });
});
