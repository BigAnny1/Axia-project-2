document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("EnterP").value.trim();

    try {
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if server responded
      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        alert("✅ Login successful");
        localStorage.setItem("token", sdata.token);
        window.location.href = "./dashboard.html";
      } else {
        alert("❌ " + (data.error || "Login failed"));
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("🚨 Network error: Could not reach API");
    }
  });
});
