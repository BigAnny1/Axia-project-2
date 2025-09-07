document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Capture all form fields even tho not all will be sent
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    // Log all fields locally
    console.log("Form Data:", { fullName, email, password, confirmPassword });


    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {

      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Signup Response:", data);

      if (res.ok) {
        alert("✅ Signup successful!");
        localStorage.setItem("token", data.token);
        window.location.href = "./login.html";
      } else {
        alert("❌ " + (data.error || "Signup failed"));
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("🚨 Could not reach API");
    }
  });
});
