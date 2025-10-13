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
  // Update hero slider backgrounds to match new content
  const heroBackgrounds = [
    'https://images.unsplash.com/photo-1612016319619-afc7a6538788?w=1920&auto=format&fit=crop&q=80', // Green drink powder
    'https://images.unsplash.com/photo-1507142922419-18a0606d49cc?w=1920&auto=format&fit=crop&q=80', // Research lab
    'https://images.unsplash.com/photo-1455279032140-49a4bf46f343?w=1920&auto=format&fit=crop&q=80'  // Ingredients
  ];
  
  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    // Change background image with improved overlay for text readability on mobile
    document.querySelector('.hero').style.backgroundImage = 
      `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${heroBackgrounds[idx]}')`;
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
  
  // BMI Calculator functionality
  const bmiForm = document.getElementById('bmiForm');
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const heightUnit = document.getElementById('heightUnit');
  const weightUnit = document.getElementById('weightUnit');
  const bmiResult = document.getElementById('bmi-result');
  const bmiValue = document.getElementById('bmi-value');
  const bmiCategory = document.getElementById('bmi-category');
  const bmiMessage = document.getElementById('bmi-message');
  const unitRadios = document.getElementsByName('units');

  // Update placeholder and unit display when measurement system changes
  unitRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'metric') {
        heightInput.placeholder = 'cm';
        weightInput.placeholder = 'kg';
        heightUnit.textContent = 'cm';
        weightUnit.textContent = 'kg';
      } else {
        heightInput.placeholder = 'in';
        weightInput.placeholder = 'lbs';
        heightUnit.textContent = 'in';
        weightUnit.textContent = 'lbs';
      }
    });
  });

  // Fix the BMI form submission
  if (bmiForm) {
    bmiForm.addEventListener('submit', function(e) {
      // Prevent the default form submission
      e.preventDefault();
      
      // Get the selected unit system
      const isMetric = document.querySelector('input[name="units"]:checked').value === 'metric';
      
      // Get input values
      let height = parseFloat(heightInput.value);
      let weight = parseFloat(weightInput.value);
      
      // Validate inputs
      if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight values.');
        return false;
      }
      
      // Calculate BMI based on unit system
      let bmi;
      if (isMetric) {
        // Metric formula: weight(kg) / (height(m))²
        bmi = weight / Math.pow(height / 100, 2);
      } else {
        // Imperial formula: (weight(lbs) / (height(in))²) * 703
        bmi = (weight / Math.pow(height, 2)) * 703;
      }
      
      // Round to 1 decimal place
      bmi = Math.round(bmi * 10) / 10;
      
      // Determine BMI category and message
      let category, message, resultClass;
      if (bmi < 18.5) {
        category = 'Underweight';
        message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.';
        resultClass = 'bmi-underweight';
      } else if (bmi < 25) {
        category = 'Normal weight';
        message = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.';
        resultClass = 'bmi-normal';
      } else if (bmi < 30) {
        category = 'Overweight';
        message = 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
        resultClass = 'bmi-overweight';
      } else {
        category = 'Obese';
        message = 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.';
        resultClass = 'bmi-obese';
      }
      
      // Display results
      bmiValue.textContent = bmi;
      bmiCategory.textContent = category;
      bmiMessage.textContent = message;
      
      // Update result styling
      bmiCategory.className = 'result-category ' + resultClass;
      
      // Show result
      bmiResult.classList.remove('result-hidden');
      
      // Prevent default form behavior
      return false;
    });
  }

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