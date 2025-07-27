document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname.split("/").pop(); // "index.html", "food.html", etc.

  const navContainer = document.getElementById("globalNav");
  if (!navContainer) return;

  const linksHTML = `
    <a href="index.html" class="nav-btn"><span class="nav-icon">🏠</span><span class="nav-label">Home</span></a>
    <a href="locations.html" class="nav-btn"><span class="nav-icon">📍</span><span class="nav-label">Produce</span></a>
    <a href="food.html" class="nav-btn"><span class="nav-icon">🍽️</span><span class="nav-label">Food</span></a>
    <a href="education.html" class="nav-btn"><span class="nav-icon">📚</span><span class="nav-label">Education</span></a>
    <a href="volunteer.html" class="nav-btn"><span class="nav-icon">🙋</span><span class="nav-label">Volunteer</span></a>
    <a href="donate.html" class="nav-btn"><span class="nav-icon">💰</span><span class="nav-label">Donate</span></a>
  `;

  if (page === "" || page === "index.html") {
    // Grid layout for home
    navContainer.innerHTML = `
      <section class="nav-section">
        <h2 class="nav-question">What can we help with?</h2>
        <nav class="main-nav">
          ${linksHTML}
        </nav>
      </section>
    `;
  } else {
    // Horizontal bar for other pages
    navContainer.innerHTML = `
      <nav class="single-nav">
        ${linksHTML}
      </nav>
    `;
  }
});
