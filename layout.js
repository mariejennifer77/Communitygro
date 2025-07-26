document.addEventListener("DOMContentLoaded", () => {
  const navHTML = `
    
  <section class="nav-section">
      <h2 class="nav-question">What can we help with?</h2>
      <nav class="main-nav">   
    <a href="index.html" class="nav-btn"><span class="nav-icon">🏠</span>
  <span class="nav-label">Home</span></a>
    <a href="locations.html" class="nav-btn"><span class="nav-icon">📍</span>
  <span class="nav-label">Produce locations</span></a>
    <a href="food.html" class="nav-btn"><span class="nav-icon">🍽️</span>
  <span class="nav-label">Food Resources</span></a>
    <a href="education.html" class="nav-btn">
  <span class="nav-icon">📚</span>
  <span class="nav-label">Education</span>
</a>
    <a href="volunteer.html" class="nav-btn"><span class="nav-icon">🙋</span>
  <span class="nav-label">Volunteer</span></a>
    <a href="donate.html" class="nav-btn"><span class="nav-icon">💰</span>
  <span class="nav-label">Donate</span></a>
    </nav>
    </section>
      `;

  const navContainer = document.getElementById("globalNav");
  if (navContainer) {
    navContainer.innerHTML = navHTML;
  }
});
