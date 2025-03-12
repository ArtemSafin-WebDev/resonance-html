document.addEventListener("DOMContentLoaded", () => {
  console.log("hello world");

  const burger = document.querySelector(".mobile-nav");

  burger.addEventListener("click", (event) => {
    event.preventDefault();
    toggleMobileMenu();
  });

  const navLinks = Array.from(document.querySelectorAll("nav .mn-has-sub"));

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!window.matchMedia("(max-width: 1024px)").matches) return;
      event.preventDefault();
      navLinks.forEach((otherLink) => {
        if (link === otherLink) return;
        otherLink.parentElement.classList.remove("js-opened");
        otherLink.nextElementSibling.classList.remove("mobile-sub-active");
      });
      link.parentElement.classList.toggle("js-opened");
      link.nextElementSibling.classList.toggle("mobile-sub-active");
    });
  });

  const tabs = Array.from(document.querySelectorAll(".js-tabs"));
  tabs.forEach((tab) => {
    const btns = Array.from(tab.querySelectorAll(".js-tabs-btn"));
    const items = Array.from(tab.querySelectorAll(".js-tabs-item"));

    const setActive = async (index) => {
      btns.forEach((btn) => btn.classList.remove("active"));
      btns[index]?.classList.add("active");
      items.forEach((item) => item.classList.remove("show"));
      await new Promise((res) => setTimeout(() => res(), 270));
      items.forEach((item) => item.classList.remove("active"));
      await new Promise((res) => setTimeout(() => res(), 100));
      items[index]?.classList.add("active");
      requestAnimationFrame(() => {
        items[index]?.classList.add("show");
      });
    };

    btns.forEach((btn, btnIndex) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        setActive(btnIndex);
      });
    });
  });
});
