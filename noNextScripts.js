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
      // await new Promise((res) => setTimeout(() => res(), 100));
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

  const testimonialsSliders = Array.from(
    document.querySelectorAll(".testimonials-slider-3")
  );

  testimonialsSliders.forEach((slider) => {
    new Swiper(slider, {
      spaceBetween: 0,
      slidesPerView: 1,
      navigation: {
        prevEl: slider.querySelector(".snbp7"),
        nextEl: slider.querySelector(".snbn7"),
      },
      breakpoints: {
        1199: {
          slidesPerView: 3, // When window width is <= 1199px
        },
        1024: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1, // When window width is <= 768px
        },
        0: {
          slidesPerView: 1, // When window width is <= 480px
        },
      },
      watchSlidesProgress: true,
    });
  });

  const faqAccordions = Array.from(
    document.querySelectorAll(".js-faq-accordions")
  );
  faqAccordions.forEach((element) => {
    let currentIndex = -1;
    const questions = Array.from(element.querySelectorAll("dt a"));
    const answers = Array.from(element.querySelectorAll("dd"));

    const updateAccordions = () => {
      questions.forEach((el) => {
        el.classList.remove("active");
      });
      answers.forEach((el) => {
        el.style.height = "0px";
        el.style.overflow = "hidden";
        el.style.transition = "all 0.5s ease-in-out";
        el.style.marginBottom = "0px";
      });
      if (currentIndex !== -1) {
        questions[currentIndex].classList.add("active");
        const element = answers[currentIndex];
        element.style.height = element.scrollHeight + "px";
        element.style.overflow = "hidden";
        element.style.transition = "all 0.5s ease-in-out";
        element.style.marginBottom = "1.55em";
      }
    };

    updateAccordions();

    questions.forEach((question, index) => {
      question.addEventListener("click", (event) => {
        event.preventDefault();
        currentIndex = currentIndex == index ? -1 : index;
        updateAccordions();
      });
    });
  });

  const clientsSlider = Array.from(
    document.querySelectorAll(".js-clients-slider")
  );

  clientsSlider.forEach((element) => {
    new Swiper(element, {
      spaceBetween: 0,
      slidesPerView: 2,
      watchSlidesProgress: true,
      autoplay: true,
      breakpoints: {
        1199: {
          slidesPerView: 6, // When window width is <= 1199px
        },

        768: {
          slidesPerView: 4, // When window width is <= 768px
        },
        0: {
          slidesPerView: 2, // When window width is <= 480px
        },
      },
    });
  });

  const mapSections = Array.from(document.querySelectorAll(".map-section"));
  mapSections.forEach((section) => {
    const open = section.querySelector(".mt-open");
    const close = section.querySelector(".mt-close");

    open.addEventListener("click", (event) => {
      event.preventDefault();
      section.classList.toggle("js-active");
    });
    close.addEventListener("click", (event) => {
      event.preventDefault();
      section.classList.toggle("js-active");
    });
  });

  const portfolios = Array.from(document.querySelectorAll(".js-portfolio"));
  portfolios.forEach((element) => {
    const container = element.querySelector(".js-portfolio-container");
    let currentCategory = "all";
    const filterLinks = Array.from(
      element.querySelectorAll(".works-filter .filter")
    );
    const instance = new Isotope(container, {
      itemSelector: ".work-item",
      layoutMode: "masonry", // or 'fitRows', depending on your layout needs
    });
    imagesLoaded(container).on("progress", function () {
      // Trigger Isotope layout
      instance.layout();
    });

    const updateCategory = (val) => {
      currentCategory = val;
      instance.arrange({
        filter: currentCategory == "all" ? "*" : "." + currentCategory,
      });
      //   isotope.value.layout();
    };

    filterLinks.forEach((link) => {
      const category = link.getAttribute("data-category");
      link.addEventListener("click", (event) => {
        event.preventDefault();
        updateCategory(category);
        filterLinks.forEach((link) => link.classList.remove("active"));
        link.classList.add("active");
      });
    });
  });
});
