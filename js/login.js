document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("EnterP").value.trim();

    // first,Check localStorage first
    const storedUser = JSON.parse(localStorage.getItem("user")); //the storage from signup

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      alert("Login successful! Welcome " + storedUser.fullName);
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "dashboard.html"; // redirect to dashboard
      return;
    }

    // here again,If not found locally, try ReqRes API
    try {
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful! (via ReqRes API)");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
