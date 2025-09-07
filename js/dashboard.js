document.addEventListener("DOMContentLoaded", async () => {
  // Select widget elements
  const coursesCountEl = document.getElementById("coursesCount");
  const assignmentsCountEl = document.getElementById("assignmentsCount");
  const progressPercentEl = document.getElementById("progressPercent");
  const courseProgressBar = document.getElementById("course-progress");

  try {
    // ----- FETCH COURSES -----
    const coursesRes = await fetch("https://fakestoreapi.com/products"); // Fake courses
    const coursesData = await coursesRes.json();
    const enrolledCourses = coursesData.slice(0, 5); // Assume first 5 are enrolled

    coursesCountEl.textContent = enrolledCourses.length;

    // ----- FETCH ASSIGNMENTS -----
    const assignmentsRes = await fetch("https://jsonplaceholder.typicode.com/todos");
    const assignmentsData = await assignmentsRes.json();
    const pendingAssignments = assignmentsData.filter(todo => !todo.completed).slice(0, 10); // take 10 pending

    assignmentsCountEl.textContent = pendingAssignments.length;

    // ----- CALCULATE OVERALL PROGRESS -----
    // Example: percentage of completed assignments vs total enrolled courses
    const totalTasks = enrolledCourses.length + pendingAssignments.length;
    const completedTasks = enrolledCourses.length; // assume enrolled courses count as completed
    const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    progressPercentEl.textContent = `${progressPercent}%`;
    courseProgressBar.value = progressPercent;

  } catch (error) {
    console.error("Error loading dashboard data:", error);
    coursesCountEl.textContent = "0";
    assignmentsCountEl.textContent = "0";
    progressPercentEl.textContent = "0%";
    courseProgressBar.value = 0;
  }
});
