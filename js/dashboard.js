document.addEventListener("DOMContentLoaded", async () => {

  const coursesCountEl = document.getElementById("coursesCount");
  const assignmentsCountEl = document.getElementById("assignmentsCount");
  const progressPercentEl = document.getElementById("progressPercent");
  const courseProgressBar = document.getElementById("course-progress");

  try {
    // FETCH COURSES 
    const coursesRes = await fetch("https://fakestoreapi.com/products");
    const coursesData = await coursesRes.json();
    const enrolledCourses = coursesData.slice(0, 5); 

    coursesCountEl.textContent = enrolledCourses.length;

    //  FETCH ASSIGNMENTS 
    const assignmentsRes = await fetch("https://jsonplaceholder.typicode.com/todos");
    const assignmentsData = await assignmentsRes.json();
    const pendingAssignments = assignmentsData.filter(todo => !todo.completed).slice(0, 10); 

    assignmentsCountEl.textContent = pendingAssignments.length;

    //  OVERALL PROGRESS 
    const totalTasks = enrolledCourses.length + pendingAssignments.length;
    const completedTasks = enrolledCourses.length;
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
