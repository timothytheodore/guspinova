document.addEventListener('DOMContentLoaded', function() {
  // Navbar functionality
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navbar-toggle');
  const links = document.getElementById('navbar-links');
  let lastScrollTop = 0;
  let navbarHidden = false;
  
  // Show/hide navbar based on scroll and mouse position
  function handleNavbarVisibility() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const heroSection = document.querySelector('.hero');
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    
    // Add scrolled class when user scrolls down
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide navbar when scrolling down past hero
    if (currentScroll > heroBottom) {
      if (currentScroll > lastScrollTop) {
        // Scrolling DOWN
        navbar.classList.add('hide');
        navbarHidden = true;
      } else {
        // Scrolling UP
        navbar.classList.remove('hide');
        navbarHidden = false;
      }
    } else {
      navbar.classList.remove('hide');
      navbarHidden = false;
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
  
  // Show navbar on mouse near top
  function handleMouseMove(e) {
    if (navbarHidden && e.clientY < 70) {
      navbar.classList.remove('hide');
    }
  }
  
  // Toggle mobile menu
  toggle.addEventListener('click', function() {
    links.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  const navLinks = links.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('active');
    });
  });
  
  // Close navbar when clicking outside
  document.addEventListener('click', function(event) {
    if (!navbar.contains(event.target)) {
      links.classList.remove('active');
    }
  });
  
  // Hero slider functionality
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideInterval;
  
  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    currentSlide = idx;
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  
  // Set up dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });
  
  // Set up arrow navigation
  document.getElementById('prev-slide').addEventListener('click', prevSlide);
  document.getElementById('next-slide').addEventListener('click', nextSlide);
  
  // Start auto-rotation
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 6000);
  }
  
  function stopSlideshow() {
    clearInterval(slideInterval);
  }
  
  // Pause slideshow on hover
  const heroSlider = document.getElementById('hero-slider');
  heroSlider.addEventListener('mouseenter', stopSlideshow);
  heroSlider.addEventListener('mouseleave', startSlideshow);
  
  // Stories slider functionality
  const stories = document.querySelectorAll('.story');
  let currentStory = 0;
  
  function showStory(idx) {
    stories.forEach((story, i) => {
      story.classList.toggle('active', i === idx);
    });
    currentStory = idx;
  }
  
  document.getElementById('prev-story').addEventListener('click', function() {
    currentStory = (currentStory - 1 + stories.length) % stories.length;
    showStory(currentStory);
  });
  
  document.getElementById('next-story').addEventListener('click', function() {
    currentStory = (currentStory + 1) % stories.length;
    showStory(currentStory);
  });
  
  // Initialize
  startSlideshow();
  window.addEventListener('scroll', handleNavbarVisibility);
  document.addEventListener('mousemove', handleMouseMove);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: 'smooth'
        });
      }
    });
  });
});