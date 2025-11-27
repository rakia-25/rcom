 // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 50
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Initialize Testimonials Swiper (only if present)
    const testimonialSwiperEl = document.querySelector('.testimonial-swiper');
    if (testimonialSwiperEl) {
      new Swiper(testimonialSwiperEl, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }

    // Initialize Partners Continuous Slider (only if present)
    const partnersSwiperEl = document.querySelector('.partners-swiper');
    if (partnersSwiperEl) {
      new Swiper(partnersSwiperEl, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        speed: 800,
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close mobile menu if open
          mobileMenu.classList.add('hidden');
        }
      });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.classList.add('shadow-lg');
      } else {
        header.classList.remove('shadow-lg');
      }
    });

    // Counter animation
    function animateCounters() {
      const counters = document.querySelectorAll('.counter');
      
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const startTime = Date.now();

        function updateCounter() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          current = Math.floor(progress * target);
          counter.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }

        // Intersection Observer to trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && counter.textContent === '0') {
              updateCounter();
              observer.unobserve(counter);
            }
          });
        }, { threshold: 0.5 });

        observer.observe(counter);
      });
    }

    // Start counter animation when page loads
    animateCounters();
    
    // Lightbox functions
    function openLightbox(imageSrc) {
      const lightbox = document.getElementById('lightbox');
      const lightboxImage = document.getElementById('lightbox-image');
      lightboxImage.src = imageSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox(event) {
      const lightbox = document.getElementById('lightbox');
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
    
    // Close lightbox on Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    });