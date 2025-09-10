document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    //  Check localStorage first
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      if (storedUser.email === email) {
        alert("✅ Password reset link has been sent to " + email);
        return;
      }
    }

    // next, check with ReqRes API
    try {
      const res = await fetch("https://reqres.in/api/users?page=1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
      });

      const data = await res.json();
      const apiUsers = data.data; // ReqRes returns users inside "data" array

      // find user by email
      const apiUser = apiUsers.find((user) => user.email === email);

      if (apiUser) {
        // store this user in localStorage  ( now both works)
        localStorage.setItem("apiUser", JSON.stringify(apiUser));

        alert("✅ Password reset link has been sent to " + email);
      } else {
        alert("❌ Email not found in ReqRes API.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Something went wrong. Please try again.");
    }
  });
});
