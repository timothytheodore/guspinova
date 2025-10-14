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
  
  // Logo click functionality - ensure first slide is shown
  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', function() {
      // Show the first slide when logo is clicked
      showSlide(0);
    });
  }
  
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
      
      // Determine BMI category and message in Indonesian
      let category, message, resultClass;
      if (bmi < 18.5) {
        category = 'Berat Badan Kurang';
        message = 'BMI Anda menunjukkan berat badan kurang. Pertimbangkan untuk konsultasi dengan ahli gizi.';
        resultClass = 'bmi-underweight';
      } else if (bmi < 25) {
        category = 'Berat Badan Normal';
        message = 'Selamat! BMI Anda berada dalam rentang normal. Pertahankan gaya hidup sehat Anda.';
        resultClass = 'bmi-normal';
      } else if (bmi < 30) {
        category = 'Berat Badan Lebih';
        message = 'BMI Anda menunjukkan berat badan lebih. Pertimbangkan untuk meningkatkan aktivitas fisik.';
        resultClass = 'bmi-overweight';
      } else {
        category = 'Obesitas';
        message = 'BMI Anda menunjukkan obesitas. Konsultasikan dengan profesional kesehatan untuk saran lebih lanjut.';
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
  
  // Fixed Review cards handling - ensure visibility and consistent height
  const reviewCards = document.querySelectorAll('.review-card');
  
  // Simple function to ensure all reviews are visible and have consistent height
  function initReviewCards() {
    reviewCards.forEach(card => {
      // Remove any animation data attributes that affect positioning
      card.removeAttribute('data-animation');
      
      // Ensure all cards are fully visible with proper transforms
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
    
    // Find tallest card and set all cards to that height for consistency
    let maxHeight = 0;
    reviewCards.forEach(card => {
      const cardHeight = card.offsetHeight;
      if (cardHeight > maxHeight) {
        maxHeight = cardHeight;
      }
    });
    
    // Set all cards to the same height
    if (maxHeight > 0) {
      reviewCards.forEach(card => {
        card.style.minHeight = `${maxHeight}px`;
      });
    }
  }
  
  // Initialize reviews immediately
  initReviewCards();
  
  // Run again after a short delay to ensure everything is rendered properly
  setTimeout(initReviewCards, 500);
  
  // Also run after all images are loaded to ensure proper height calculation
  window.addEventListener('load', initReviewCards);
  
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
  
  // Completely rewritten FAQ functionality with simpler approach
  function initFAQ() {
    console.log("Initializing FAQ section with direct approach");
    
    // Get all FAQ items
    const faqContainer = document.querySelector('.faq-container');
    
    if (!faqContainer) {
      console.error("FAQ container not found");
      return;
    }
    
    // Direct click handler for the entire FAQ container using event delegation
    faqContainer.addEventListener('click', function(event) {
      // Find if the click was on a question or part of a question
      let questionElement = null;
      
      // Check if clicked on the question div directly
      if (event.target.classList.contains('faq-question')) {
        questionElement = event.target;
      } 
      // Check if clicked on the h3 inside question
      else if (event.target.tagName === 'H3' && event.target.parentNode.classList.contains('faq-question')) {
        questionElement = event.target.parentNode;
      }
      // Check if clicked on the icon or icon container
      else if (event.target.classList.contains('fa-chevron-down') || 
               event.target.classList.contains('fa-chevron-up') ||
               event.target.classList.contains('faq-icon')) {
        // Find the closest question container
        questionElement = event.target.closest('.faq-question');
      }
      
      // If we found a question element
      if (questionElement) {
        // Get the associated item and answer elements
        const faqItem = questionElement.parentNode;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = faqItem.querySelector('.faq-icon i');
        
        if (!answer || !icon) {
          console.error("Missing FAQ elements", faqItem);
          return;
        }
        
        console.log("FAQ item clicked:", faqItem);
        
        // Toggle the active state
        const isActive = faqItem.classList.toggle('active');
        
        // Update display and icon
        if (isActive) {
          answer.style.display = 'block';
          icon.className = 'fas fa-chevron-up';
          
          // Close other open FAQ items
          const allFaqItems = document.querySelectorAll('.faq-item');
          allFaqItems.forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
              item.classList.remove('active');
              item.querySelector('.faq-answer').style.display = 'none';
              item.querySelector('.faq-icon i').className = 'fas fa-chevron-down';
            }
          });
        } else {
          answer.style.display = 'none';
          icon.className = 'fas fa-chevron-down';
        }
      }
    });
    
    // Open first FAQ item by default (after a small delay)
    setTimeout(() => {
      const firstFaqItem = document.querySelector('.faq-item');
      if (firstFaqItem) {
        // Find and programmatically click the first question element
        const firstQuestion = firstFaqItem.querySelector('.faq-question');
        if (firstQuestion) {
          console.log("Auto-opening first FAQ");
          // Use a synthetic click event to open the first FAQ
          const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          firstQuestion.dispatchEvent(clickEvent);
        }
      }
    }, 500);
  }

  // Initialize all components
  initFAQ();
});