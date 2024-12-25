document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");
  const themeToggleCheckbox = document.getElementById("theme-toggle-checkbox");

  function changeActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove("active"));
    navLinks[index].classList.add("active");
  }

  changeActiveLink();
  window.addEventListener("scroll", changeActiveLink);

  // Theme toggle behavior
  themeToggleCheckbox.addEventListener("change", function () {
    document.body.classList.toggle("dark-theme", this.checked);
  });

  // Check URL and activate corresponding navigation link
  function activateLinkFromURL() {
    const hash = window.location.hash.substring(1);
    webkitURL;
    if (hash) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === hash) {
          link.classList.add("active");
        }
      });
    }
  }

  activateLinkFromURL();
  window.addEventListener("hashchange", activateLinkFromURL);
});
