import { useEffect } from "react";

// Lazy Load Images
export const useLazyLoad = () => {
  useEffect(() => {
    const images = document.querySelectorAll(".lazy");

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          const bg = img.getAttribute("data-bg");

          if (src) {
            img.src = src;
            img.classList.add("loaded");
          }

          if (bg) {
            img.style.backgroundImage = `url(${bg})`;
            img.classList.add("loaded");
          }

          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));

    return () => {
      images.forEach((img) => imageObserver.unobserve(img));
    };
  }, []);
};

// Scroll Reveal Animation
export const useScrollReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal, .journey-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

// Sticky Header
export const useStickyHeader = () => {
  useEffect(() => {
    const header = document.getElementById("main-header");
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

// Number Counter Animation
export const useCounterAnimation = (ref, target, duration = 2000) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        const current = Math.floor(target * progress);
        element.textContent = current.toLocaleString();
        requestAnimationFrame(animate);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, target, duration]);
};

// Parallax Effect
export const useParallax = () => {
  useEffect(() => {
    const parallaxElements = document.querySelectorAll(".parallax1");

    const handleScroll = () => {
      parallaxElements.forEach((el) => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        el.style.transform = `translateY(${rate}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

// Typing Effect
export const useTypingEffect = (ref, text, speed = 100) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let index = 0;

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };

    element.textContent = "";
    type();
  }, [ref, text, speed]);
};
