 (function () {
     const header = document.querySelector("nav");
     const menuToggle = document.querySelector("[data-menu-toggle]");
     const mobileMenu = document.querySelector("[data-mobile-menu]");
     const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a[href^='#']") : [];
 
     if (menuToggle && mobileMenu) {
         const closeMenu = () => {
             mobileMenu.classList.remove("is-open");
             menuToggle.setAttribute("aria-expanded", "false");
         };
 
         menuToggle.addEventListener("click", () => {
             const isOpen = mobileMenu.classList.toggle("is-open");
             menuToggle.setAttribute("aria-expanded", String(isOpen));
         });
 
         mobileLinks.forEach((link) => {
             link.addEventListener("click", closeMenu);
         });
 
         document.addEventListener("click", (event) => {
             if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                 closeMenu();
             }
         });
 
         document.addEventListener("keydown", (event) => {
             if (event.key === "Escape") {
                 closeMenu();
             }
         });
     }
 
     const anchorLinks = document.querySelectorAll("a[href^='#']");
     anchorLinks.forEach((anchor) => {
         anchor.addEventListener("click", (event) => {
             const targetId = anchor.getAttribute("href");
             if (!targetId || targetId === "#") {
                 return;
             }
 
             const target = document.querySelector(targetId);
             if (!target) {
                 return;
             }
 
             event.preventDefault();
             const offset = header ? header.offsetHeight + 12 : 0;
             const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
             window.scrollTo({ top, behavior: "smooth" });
         });
     });
 
     const contactForm = document.querySelector(".contact-form");
     if (contactForm) {
         contactForm.addEventListener("submit", function (event) {
             event.preventDefault();
 
             const submitBtn = this.querySelector("button[type='submit']");
             const originalText = submitBtn ? submitBtn.textContent : "";
 
             if (submitBtn) {
                 submitBtn.textContent = "Sending...";
                 submitBtn.disabled = true;
             }
 
             const requiredInputs = this.querySelectorAll("input[required], textarea[required]");
             let isValid = true;
 
             requiredInputs.forEach((input) => {
                 if (!input.value.trim()) {
                     isValid = false;
                     input.classList.add("ring-2", "ring-red-500");
                 } else {
                     input.classList.remove("ring-2", "ring-red-500");
                 }
             });
 
             if (!isValid) {
                 if (submitBtn) {
                     submitBtn.textContent = originalText;
                     submitBtn.disabled = false;
                 }
                 return;
             }
 
             const formData = new FormData(this);
             fetch("/", {
                 method: "POST",
                 headers: { "Content-Type": "application/x-www-form-urlencoded" },
                 body: new URLSearchParams(formData).toString(),
             })
                 .then(() => {
                     const successMessage = document.getElementById("form-success-message");
                     if (successMessage) {
                         contactForm.style.display = "none";
                         successMessage.style.display = "block";
                         successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
                     }
                     contactForm.reset();
                     if (submitBtn) {
                         submitBtn.textContent = originalText;
                         submitBtn.disabled = false;
                     }
                 })
                 .catch(() => {
                     if (submitBtn) {
                         submitBtn.textContent = originalText;
                         submitBtn.disabled = false;
                     }
                 });
         });
     }
 })();
 (function () {
     const header = document.querySelector("nav");
     const menuToggle = document.querySelector("[data-menu-toggle]");
     const mobileMenu = document.querySelector("[data-mobile-menu]");
     const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a[href^='#']") : [];
 
     if (menuToggle && mobileMenu) {
         const closeMenu = () => {
             mobileMenu.classList.remove("is-open");
             menuToggle.setAttribute("aria-expanded", "false");
         };
 
         menuToggle.addEventListener("click", () => {
             const isOpen = mobileMenu.classList.toggle("is-open");
             menuToggle.setAttribute("aria-expanded", String(isOpen));
         });
 
         mobileLinks.forEach((link) => {
             link.addEventListener("click", () => closeMenu());
         });
 
         document.addEventListener("click", (event) => {
             if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                 closeMenu();
             }
         });
 
         document.addEventListener("keydown", (event) => {
             if (event.key === "Escape") {
                 closeMenu();
             }
         });
     }
 
     const anchorLinks = document.querySelectorAll("a[href^='#']");
     anchorLinks.forEach((anchor) => {
         anchor.addEventListener("click", (event) => {
             const targetId = anchor.getAttribute("href");
             if (!targetId || targetId === "#") {
                 return;
             }
 
             const target = document.querySelector(targetId);
             if (!target) {
                 return;
             }
 
             event.preventDefault();
             const offset = header ? header.offsetHeight + 12 : 0;
             const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
             window.scrollTo({ top, behavior: "smooth" });
         });
     });
 
     const contactForm = document.querySelector(".contact-form");
     if (contactForm) {
         contactForm.addEventListener("submit", function (event) {
             event.preventDefault();
 
             const submitBtn = this.querySelector("button[type='submit']");
             const originalText = submitBtn ? submitBtn.textContent : "";
 
             if (submitBtn) {
                 submitBtn.textContent = "Sending...";
                 submitBtn.disabled = true;
             }
 
             const requiredInputs = this.querySelectorAll("input[required], textarea[required]");
             let isValid = true;
 
             requiredInputs.forEach((input) => {
                 if (!input.value.trim()) {
                     isValid = false;
                     input.classList.add("ring-2", "ring-red-500");
                 } else {
                     input.classList.remove("ring-2", "ring-red-500");
                 }
             });
 
             if (!isValid) {
                 if (submitBtn) {
                     submitBtn.textContent = originalText;
                     submitBtn.disabled = false;
                 }
                 return;
             }
 
             const formData = new FormData(this);
            fetch("/", {
                 method: "POST",
                 headers: { "Content-Type": "application/x-www-form-urlencoded" },
                 body: new URLSearchParams(formData).toString(),
             })
                 .then(() => {
                     const successMessage = document.getElementById("form-success-message");
                     if (successMessage) {
                         contactForm.style.display = "none";
                         successMessage.style.display = "block";
                         successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
                     }
                     contactForm.reset();
                    if (submitBtn) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                 })
                 .catch(() => {
                     if (submitBtn) {
                         submitBtn.textContent = originalText;
                         submitBtn.disabled = false;
                     }
                 });
         });
     }
 })();
// Apartments Dada - Interactive JavaScript

// Language translations
const translations = {
    hr: {
        // Page meta
        'page-title': 'Apartmani Dada - Apartmani u Krapinskim Toplicama, Hrvatska',
        'page-description': 'Moderni apartmani za odmor u Krapinskim Toplicama blizu Aquae Vivae parka. WiFi, parking, potpuno opremljeni smještaji u Hrvatskoj lječilišnoj destinaciji.',
        
        // Navigation
        'nav-home': 'Početna',
        'nav-about': 'O nama',
        'nav-apartments': 'Apartmani',
        'nav-book': 'Rezervirajte online',
        'nav-contact': 'Kontakt',
        
        // Hero section
        'hero-headline': 'Apartmani u Krapinskim Toplicama',
        'hero-subheadline': 'Moderni apartmani za odmor blizu Aquae Vivae vodenog parka. Potpuno opremljeni smještaji s WiFi-em, parkingom i prekrasnim pogledom u vodećoj lječilišnoj destinaciji Hrvatske.',
        'explore-btn': 'Istražite apartmane',
        
        // About section
        'about-headline': 'Otkrijte Krapinske Toplice',
        'about-subheadline': 'Mirni lječilišni grad u srcu Hrvatske, savršen za opuštanje i oporavak.',
        'about-card1-title': 'Mirna lokacija',
        'about-card1-text': 'Uživajte u odmoru u srcu prirode! Naši apartmani u Krapinskim Toplicama nude vam udoban smještaj uz blizinu termalnih izvora i savršeno mirnu atmosferu.',
        'about-card2-title': 'Aquae Vivae vodeni park',
        'about-card2-text': 'Samo nekoliko minuta od naših apartmana, uživajte u renomiranom vodenom parku s termalnim bazenima, wellness sadržajima i zabavnim aktivnostima za cijelu obitelj.',
        'about-card3-title': 'Moderan komfor',
        'about-card3-text': 'Naši apartmani nude suvremeno opremljen prostor i sve što vam je potrebno za ugodan, bezbrižan i nezaboravan boravak.',
        
        // Apartments section
        'apartments-headline': 'Moderni apartmani',
        'apartments-subheadline': 'Odaberite iz našeg izbora prekrasno uređenih smještaja',
        'location1-title': 'Lokacija u centru grada',
        'location2-title': 'Centar grada - Blizu bolnice',
        
        // Apartment names
        'apt1-name': 'Dada Apartman 1 (50m²)',
        'apt2-name': 'Dada Apartman 2 (70m²)',
        'apt3-name': 'Studio Apartman Šafranko (25m²)',
        'apt4-name': 'Soba Šafranko (17m²)',
        
        // Amenities
        'amenity-bedroom1': '1 spavaća soba',
        'amenity-bedrooms2': '2 spavaće sobe',
        'amenity-bedrooms3': '3 spavaće sobe',
        'amenity-studio': 'Studio',
        'amenity-bathroom1': '1 kupaonica',
        'amenity-bathrooms2': '2 kupaonice',
        'amenity-kitchen': 'Kuhinja',
        'amenity-full-kitchen': 'Potpuna kuhinja',
        'amenity-kitchenette': 'Kuhinjica',
        'amenity-wifi': 'WiFi',
        'amenity-balcony': 'Balkon',
        'amenity-terrace': 'Terasa',
        'amenity-garden': 'Vrt',
        'amenity-bbq': 'BBQ područje',
        'amenity-patio': 'Privatni patio',
        'amenity-forest-view': 'Pogled na šumu',
        'amenity-air-conditioning': 'Klima uređaj',
        'amenity-room': 'Soba',
        'amenity-tv': 'TV',
        'amenity-wardrobe': 'Ormar',
        'amenity-skylight': 'Krovni prozor',
        'amenity-parking': 'Parking',
        
        // Location highlights
        'location1-highlights-title': 'Prednosti lokacije',
        'location1-highlights-text': 'Vrhunska lokacija u centru grada, samo 3 minute hoda od Aquae Vivae vodenog parka. Blizu restorana, trgovina i termalnih izvora. Savršeno za istraživanje grada pješice.',
        'location2-highlights-title': 'Prednosti lokacije',
        'location2-highlights-text': 'Smješteno u centru grada vrlo blizu bolnice za medicinsku rehabilitaciju i klinike Magdalena za kardiovaskularne bolesti. 5 minuta hoda do vodenog parka Aquae Vivae. Izvrsna lokacija za pacijente bolnice i posjetitelje.',
        
        // Testimonials
        'testimonials-headline': 'Iskustva gostiju',
        'testimonials-subheadline': 'Što naši gosti kažu o svom boravku',
        'testimonial1-text': '"Apsolutno smo uživali jednu noć u ovom apartmanu. Sve je bilo čisto, lijepo, vlasnik vrlo koristan i prijateljski. Hvala vam na mogućnosti da se ovdje odmorimo nakon dugog putovanja. Sigurno ćemo se ponovno vratiti."',
        'testimonial2-text': '"Jako lijepo sređen apartman, super lokacija u blizini bazena, vrlo ljubazan vlasnik. Sve preporuke."',
        'testimonial3-text': '"Vrlo udoban i ugodan apartman sa svim što vam treba. Domaćin je bio izuzetno prijatan i koristan. Lokacija je odlična, samo minutu ili dvije od termalnog spa-a Aqua Vivae."',
        
        // Contact section
        'contact-headline': 'Kontaktirajte nas',
        'contact-subheadline': 'Spremni za rezervaciju? Tu smo da vam pomognemo da sve bude savršeno.',
        'contact-email': 'Email',
        'contact-phone': 'Telefon',
        'contact-location': 'Lokacija',
        'contact-location-text': 'Krapinske Toplice, Hrvatska',
        
        // Form
        'form-name': 'Vaše ime',
        'form-email': 'Vaš email',
        'form-checkin': 'Datum dolaska',
        'form-checkout': 'Datum odlaska',
        'form-message': 'Poruka (preferenca apartmana, posebni zahtjevi...)',
        'form-submit': 'Pošaljite poruku',
        'form-success-title': 'Poruka uspješno poslana!',
        'form-success-text': 'Hvala vam na upitu. Javit ćemo vam se u roku od 24 sata.',
        'booking-btn': 'Rezerviraj na Booking.com',
        'booking-btn-short': 'Booking.com',
        'booking-rating': 'Booking.com',
        // Book page
        'book-intro': 'Odaberite datume i rezervirajte svoj boravak.',
        
        // Footer
        'footer-text': 'Doživite najbolje od Krapinskih Toplica uz naše apartmane.',
        'footer-copyright': '© 2025 Apartmani Dada. Sva prava pridržana. | apartments-dada.com'
    },
    en: {
        // Page meta
        'page-title': 'Apartmani Dada - Apartments in Krapinske Toplice',
        'page-description': 'Modern vacation rentals in Krapinske Toplice near Aquae Vivae Water Park. WiFi, parking, fully equipped apartments in Croatia\'s spa destination.',
        
        // Navigation
        'nav-home': 'Homepage',
        'nav-about': 'About',
        'nav-apartments': 'Apartments',
        'nav-book': 'Book Now',
        'nav-contact': 'Contact',
        
        // Hero section
        'hero-headline': 'Apartments in Krapinske Toplice',
        'hero-subheadline': 'Modern vacation rentals near Aquae Vivae Water Park. Fully equipped apartments with WiFi, parking, and stunning views in Croatia\'s premier spa destination.',
        'explore-btn': 'Explore Apartments',
        
        // About section
        'about-headline': 'Discover Krapinske Toplice',
        'about-subheadline': 'A peaceful spa town in the heart of Croatia, perfect for relaxation and rejuvenation.',
        'about-card1-title': 'Tranquil Location',
        'about-card1-text': 'Enjoy your vacation in the heart of nature! Our apartments in Krapinske Toplice offer you comfortable accommodation near thermal springs and perfectly peaceful atmosphere.',
        'about-card2-title': 'Aquae Vivae Water Park',
        'about-card2-text': 'Just minutes from our apartments, enjoy the renowned water park featuring thermal pools, wellness facilities, and fun activities for the whole family.',
        'about-card3-title': 'Modern Comfort',
        'about-card3-text': 'Our apartments offer modernly equipped space and everything you need for a pleasant, carefree and unforgettable stay.',
        
        // Apartments section
        'apartments-headline': 'Modern Apartments',
        'apartments-subheadline': 'Choose from our selection of beautifully appointed accommodations',
        'location1-title': 'City Center Location',
        'location2-title': 'City Center - Near Hospital',
        
        // Apartment names
        'apt1-name': 'Dada Apartment 1 (50m²)',
        'apt2-name': 'Dada Apartment 2 (70m²)',
        'apt3-name': 'Studio Apartment Šafranko (25m²)',
        'apt4-name': 'Soba Šafranko (17m²)',
        
        // Amenities
        'amenity-bedroom1': '1 Bedroom',
        'amenity-bedrooms2': '2 Bedrooms',
        'amenity-bedrooms3': '3 Bedrooms',
        'amenity-studio': 'Studio',
        'amenity-bathroom1': '1 Bathroom',
        'amenity-bathrooms2': '2 Bathrooms',
        'amenity-kitchen': 'Kitchen',
        'amenity-full-kitchen': 'Full Kitchen',
        'amenity-kitchenette': 'Kitchenette',
        'amenity-wifi': 'WiFi',
        'amenity-balcony': 'Balcony',
        'amenity-terrace': 'Terrace',
        'amenity-garden': 'Garden',
        'amenity-bbq': 'BBQ Area',
        'amenity-patio': 'Private Patio',
        'amenity-forest-view': 'Forest View',
        'amenity-air-conditioning': 'Air Conditioning',
        'amenity-room': 'Room',
        'amenity-tv': 'TV',
        'amenity-wardrobe': 'Wardrobe',
        'amenity-skylight': 'Skylight',
        'amenity-parking': 'Parking',
        
        // Location highlights
        'location1-highlights-title': 'Location Highlights',
        'location1-highlights-text': 'Prime city center location just 3 minutes walk from Aquae Vivae Water Park. Close to restaurants, shops, and thermal springs. Perfect for exploring the town on foot.',
        'location2-highlights-title': 'Location Highlights',
        'location2-highlights-text': 'Located in city center very close to medical rehabilitation hospital and Magdalena Clinic for cardiovascular diseases. 5 minutes walk to Aquae Vivae Water Park. Excellent location for hospital patients and visitors.',
        
        // Testimonials
        'testimonials-headline': 'Guest Experiences',
        'testimonials-subheadline': 'What our guests say about their stay',
        'testimonial1-text': '"We absolutely enjoyed one night in this apartment. Everything was clean, nice, the landlord very helpful and friendly. Thank you for possibility to rest here after long journey. For sure we will come back again."',
        'testimonial2-text': '"Very nicely arranged apartment, great location near the pool, very kind owner. All recommendations."',
        'testimonial3-text': '"Very comfortable and cosy apartment with everything you could need. Host was extremely pleasant and helpful. Location is great, just a minute or two from the Aqua Vivae thermal spa."',
        
        // Contact section
        'contact-headline': 'Get in Touch',
        'contact-subheadline': 'Ready to book your stay? We\'re here to help make it perfect.',
        'contact-email': 'Email',
        'contact-phone': 'Phone',
        'contact-location': 'Location',
        'contact-location-text': 'Krapinske Toplice, Croatia',
        
        // Form
        'form-name': 'Your Name',
        'form-email': 'Your Email',
        'form-checkin': 'Check-in Date',
        'form-checkout': 'Check-out Date',
        'form-message': 'Message (apartment preference, special requests...)',
        'form-submit': 'Send Message',
        'form-success-title': 'Message Sent Successfully!',
        'form-success-text': 'Thank you for your inquiry. We\'ll get back to you within 24 hours.',
        'booking-btn': 'Book on Booking.com',
        'booking-btn-short': 'Booking.com',
        'booking-rating': 'Booking.com',
        // Book page
        'book-intro': 'Select your dates and book your stay.',
        
        // Footer
        'footer-text': 'Experience the best of Krapinske Toplice with our premium apartment rentals. Your comfort is our priority.',
        'footer-copyright': '© 2025 Apartmani Dada. All rights reserved. | apartments-dada.com'
    }
};

// Language functionality
let currentLanguage = 'hr';
let datePickerInstances = []; // Store flatpickr instances

// Function to initialize date pickers only once
function initializeDatePickers(language) {
    // Only initialize if we haven't already
    if (datePickerInstances.length === 0) {
        const dateInputs = document.querySelectorAll('input[type="date"]');
        
        dateInputs.forEach((input, index) => {
            const config = {
                altInput: true,
                allowInput: true
            };
            
            if (language === 'hr') {
                config.locale = window.flatpickr.l10ns.hr;
                config.dateFormat = "d.m.Y";
                config.altFormat = "d.m.Y";
            } else {
                config.dateFormat = "d/m/Y";
                config.altFormat = "d/m/Y";
            }
            
            const instance = flatpickr(input, config);
            datePickerInstances.push(instance);
        });
    }
}

// Function to change locale of existing date pickers
function changeDatePickerLocale(language) {
    datePickerInstances.forEach((instance, index) => {
        if (instance) {
            if (language === 'hr') {
                // Set Croatian locale
                instance.set('locale', window.flatpickr.l10ns.hr);
                instance.set('dateFormat', 'd.m.Y');
                instance.set('altFormat', 'd.m.Y');
            } else {
                // Set English locale (default)
                instance.set('locale', 'default');
                instance.set('dateFormat', 'd/m/Y');
                instance.set('altFormat', 'd/m/Y');
            }
            
            // Force redraw
            instance.redraw();
        }
    });
} // Default to Croatian

function updateLanguage(lang) {
    currentLanguage = lang;
    
    // Update all text elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'TITLE') {
                element.textContent = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    // Update placeholder texts
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update meta description
    const metaDescription = document.querySelector('meta[data-translate="page-description"]');
    if (metaDescription && translations[lang]['page-description']) {
        metaDescription.setAttribute('content', translations[lang]['page-description']);
    }
    
    // Update language toggle button
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        const flagIcon = languageToggle.querySelector('.flag-display');
        const langText = languageToggle.querySelector('.lang-text');
        
        if (flagIcon && langText) {
            if (lang === 'hr') {
                flagIcon.className = 'fi fi-hr flag-display';
                langText.textContent = 'HR';
                document.documentElement.lang = 'hr';
                document.body.classList.add('croatian-locale');
                document.body.classList.remove('english-locale');
            } else {
                flagIcon.className = 'fi fi-gb flag-display';
                langText.textContent = 'EN';
                document.documentElement.lang = 'en';
                document.body.classList.add('english-locale');
                document.body.classList.remove('croatian-locale');
            }
        }
    }
    

    
    // Update flag icon for both desktop and mobile
    const flagDesktop = document.querySelector('#languageToggle .flag-display');
    const flagMobile = document.querySelector('#languageToggleMobile .flag-display');
    const langTextDesktop = document.querySelector('#languageToggle .lang-text');
    const langTextMobile = document.querySelector('#languageToggleMobile .lang-text');
    
    if (flagDesktop) {
        flagDesktop.className = 'fi flag-display ' + (lang === 'hr' ? 'fi-hr' : 'fi-gb');
    }
    if (flagMobile) {
        flagMobile.className = 'fi flag-display ' + (lang === 'hr' ? 'fi-hr' : 'fi-gb');
    }
    if (langTextDesktop) {
        langTextDesktop.textContent = lang === 'hr' ? 'HR' : 'EN';
    }
    if (langTextMobile) {
        langTextMobile.textContent = lang === 'hr' ? 'HR' : 'EN';
    }
    
    // Don't change date picker locale during initial page load - only during manual switches
    // (The date pickers are initialized with the correct language already)
    
    // Reinitialize Lucide icons after DOM changes
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            console.log('Refreshing Lucide icons after language change...');
            lucide.createIcons();
        }
    }, 50);
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved language preference, default to Croatian
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'hr';
    
    // Initialize Lucide icons with debugging
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            console.log('Lucide is available, creating icons...');
            lucide.createIcons();
            console.log('Lucide icons initialized successfully');
            
            // Check if icons were created
            const icons = document.querySelectorAll('[data-lucide]');
            console.log('Found', icons.length, 'data-lucide elements');
        } else {
            console.error('Lucide is not available!');
            alert('Lucide icons failed to load!');
        }
    }, 100);
    
    // First initialize date pickers
    if (typeof flatpickr !== 'undefined') {
        initializeDatePickers(savedLanguage);
    }
    
    // Then set language (without trying to change date pickers)
    updateLanguage(savedLanguage);
    
    // Make body visible after initial language update
    document.body.style.opacity = '1';
    
    // Set up language toggle
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const newLang = currentLanguage === 'hr' ? 'en' : 'hr';
            
            updateLanguage(newLang);
            
            // Change locale of existing date pickers
            if (typeof flatpickr !== 'undefined' && datePickerInstances.length > 0) {
                changeDatePickerLocale(newLang);
            }
            
            // Force refresh Lucide icons after language change
            setTimeout(() => {
                if (typeof lucide !== 'undefined') {
                    console.log('Refreshing icons after button click...');
                    lucide.createIcons();
                    
                    // Test if icons are working
                    const iconElements = document.querySelectorAll('[data-lucide]');
                    iconElements.forEach(el => {
                        console.log('Icon element:', el.getAttribute('data-lucide'), 'has class:', el.className);
                    });
                }
            }, 100);
        });
    }
    
    // Smooth scrolling with fixed header offset
    function smoothScrollToTarget(selector) {
        const target = document.querySelector(selector);
        if (!target) return;
        const headerEl = document.querySelector('.header');
        const headerHeight = headerEl ? headerEl.offsetHeight + 12 : 20;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            smoothScrollToTarget(href);
        });
    });

    // Hero explore button functionality
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const targetSelector = this.getAttribute('data-scroll-target') || '#moj-opg';
            smoothScrollToTarget(targetSelector);
        });
    }

        // Image gallery functionality for apartments
    const apartmentGalleries = document.querySelectorAll('.apartment-gallery');
    apartmentGalleries.forEach(gallery => {
        const images = gallery.querySelectorAll('.gallery-image');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        const indicators = gallery.querySelectorAll('.gallery-indicator');
        let currentIndex = 0;
        let galleryReady = true;

        function enableGallery() {
            galleryReady = true;
            gallery.classList.add('gallery-enabled');
            console.log('Gallery enabled');
        }

        function showImage(index) {
            // Only toggle opacity to avoid white flash
            images.forEach(img => {
                img.classList.remove('active');
                img.style.opacity = '0';
            });
            const targetImage = images[index];
            targetImage.classList.add('active');
            targetImage.style.opacity = '1';

            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            });
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
            });
        });

        // Force decode all images before showing gallery
        const imagePromises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete && img.naturalWidth > 0) {
                    resolve();
                } else {
                    // Use decode() when available for smoother rendering
                    if (typeof img.decode === 'function') {
                        img.decode().then(resolve).catch(resolve);
                    }
                    img.onload = resolve;
                    img.onerror = resolve;
                }
            });
        });
        
        Promise.all(imagePromises).then(() => {
            // All images are decoded, now show gallery
            // Pre-show first image hidden, then fade in to avoid flash
            showImage(0);
            requestAnimationFrame(() => {
                gallery.classList.add('gallery-enabled');
            });
        });
    });

    // Testimonial hover effects (CSS-only, no auto-rotation)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Initialize all testimonials to default state
    testimonialCards.forEach(card => {
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
        card.style.background = '#ffffff';
        card.style.borderColor = '#E5E7EB';
        card.style.transition = 'all 0.3s ease';
    });

// Contact form handling with Netlify Forms (AJAX submit to keep inline success)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.contact-submit');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }

        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#FF6B6B';
            } else {
                input.style.borderColor = '#E5E7EB';
            }
        });
        if (!isValid) {
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
            alert('Please fill in all required fields.');
            return;
        }

        const formData = new FormData(this);
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            const successMessage = document.getElementById('form-success-message');
            const contactFormElement = document.querySelector('.contact-form');
            if (contactFormElement && successMessage) {
                contactFormElement.style.display = 'none';
                successMessage.style.display = 'block';
                if (typeof lucide !== 'undefined') {
                    try { lucide.createIcons(); } catch (_) {}
                }
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            this.reset();
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        })
        .catch(() => {
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
            alert('Error sending message. Please try again.');
        });
    });
}

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(58, 74, 92, 0.98)';
            header.style.backdropFilter = 'blur(25px)';
        } else {
            header.style.background = 'rgba(58, 74, 92, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add loading animation for images
    const apartmentImages = document.querySelectorAll('.apartment-image');
    apartmentImages.forEach(image => {
        image.style.opacity = '0';
        image.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            image.style.opacity = '1';
        }, 100);
    });

    // Back to top functionality
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        // Click handler
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Scroll handler to show/hide button
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }

    // Hamburger Menu Functionality
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburgerMenu.contains(event.target) && !mobileMenu.contains(event.target)) {
                hamburgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // Sync mobile language toggle with main one
    const languageToggleMobile = document.getElementById('languageToggleMobile');
    if (languageToggleMobile) {
        languageToggleMobile.addEventListener('click', function() {
            document.getElementById('languageToggle').click();
        });
    }

    // Set tabindex=0 for all .flatpickr-input elements for accessibility
    setTimeout(() => {
      document.querySelectorAll('.flatpickr-input').forEach(input => input.tabIndex = 0);
    }, 500);

    // Moj OPG Gallery Lightbox Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentIndex = -1;

    // Open lightbox when clicking on a gallery item
    function openLightbox(index) {
        const item = galleryItems[index];
        if (!item) return;
        const img = item.querySelector('img');
        currentIndex = index;
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt || '';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        currentIndex = -1;
    }

    function showNext(delta) {
        if (currentIndex === -1) return;
        const total = galleryItems.length;
        currentIndex = (currentIndex + delta + total) % total;
        const img = galleryItems[currentIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt || '';
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() { openLightbox(index); });
    });

    // Close lightbox when clicking the close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) closeLightbox();
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightbox.style.display === 'block') closeLightbox();
        if ((event.key === 'ArrowRight' || event.key === 'd') && lightbox.style.display === 'block') showNext(1);
        if ((event.key === 'ArrowLeft' || event.key === 'a') && lightbox.style.display === 'block') showNext(-1);
    });

    // Prev/Next buttons
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => showNext(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => showNext(1));

    // Zoomable Wallplay Frame
    const frameImgInline = document.querySelector('.scroll-image-container img');
    const allScrollablePreviews = document.querySelectorAll('.scroll-image-container img');
    const frameModal = document.getElementById('frameModal');
    const frameModalImg = document.getElementById('frameModalImg');
    const frameViewport = document.getElementById('frameViewport');
    const frameClose = document.querySelector('.frame-modal-close');
    const zoomInBtn = document.querySelector('.frame-zoom-in');
    const zoomOutBtn = document.querySelector('.frame-zoom-out');
    const zoomResetBtn = document.querySelector('.frame-zoom-reset');
    let zoomScale = 1;

    function openFrameModal() {
        if (!frameImgInline) return;
        frameModalImg.src = frameImgInline.src;
        frameModal.setAttribute('aria-hidden', 'false');
        // Fit-to-width and start at top on open
        requestAnimationFrame(() => {
            const img = frameModalImg;
            const vw = frameViewport.clientWidth;
            const vh = frameViewport.clientHeight;
            const iw = img.naturalWidth || img.width;
            const ih = img.naturalHeight || img.height;
            const scale = vw / iw; // fit width
            zoomScale = scale;
            img.style.transform = `scale(${zoomScale})`;
            // start at top-left
            frameViewport.scrollLeft = 0;
            frameViewport.scrollTop = 0;
        });
    }

    function closeFrameModal() {
        frameModal.setAttribute('aria-hidden', 'true');
    }

    function applyZoom(newScale) {
        zoomScale = Math.min(5, Math.max(0.25, newScale));
        const img = frameModalImg;
        const prevScale = getCurrentScale();
        const vw = frameViewport.clientWidth;
        const vh = frameViewport.clientHeight;
        const iw = img.naturalWidth || img.width;
        const ih = img.naturalHeight || img.height;
        const contentWPrev = iw * prevScale;
        const contentHPrev = ih * prevScale;
        const centerX = frameViewport.scrollLeft + vw / 2;
        const centerY = frameViewport.scrollTop + vh / 2;
        const relX = contentWPrev === 0 ? 0.5 : centerX / contentWPrev;
        const relY = contentHPrev === 0 ? 0.5 : centerY / contentHPrev;

        img.style.transform = `scale(${zoomScale})`;

        const contentW = iw * zoomScale;
        const contentH = ih * zoomScale;
        frameViewport.scrollLeft = Math.max(0, relX * contentW - vw / 2);
        frameViewport.scrollTop = Math.max(0, relY * contentH - vh / 2);
    }

    function getCurrentScale() {
        const match = /scale\(([^)]+)\)/.exec(frameModalImg.style.transform || '');
        return match ? parseFloat(match[1]) || 1 : 1;
    }

    // Attach to all previews (Wallplay, CallApp, etc.)
    allScrollablePreviews.forEach(img => {
        img.addEventListener('click', () => {
            // If a different image is clicked, swap src and open
            frameModalImg.src = img.src;
            frameModal.setAttribute('aria-hidden', 'false');
            // Fit-to-width and start at top-left
            requestAnimationFrame(() => {
                const vw = frameViewport.clientWidth;
                const iw = frameModalImg.naturalWidth || frameModalImg.width;
                zoomScale = vw / iw;
                frameModalImg.style.transform = `scale(${zoomScale})`;
                frameViewport.scrollLeft = 0;
                frameViewport.scrollTop = 0;
            });
        });
    });
    if (frameClose) frameClose.addEventListener('click', closeFrameModal);
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => applyZoom(zoomScale * 1.2));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => applyZoom(zoomScale / 1.2));
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => applyZoom(1));

    // Wheel zoom (Ctrl/Cmd + wheel) and pinch-zoom like behavior
    frameViewport.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            applyZoom(zoomScale + delta);
        }
    }, { passive: false });

    // Keyboard support inside modal
    document.addEventListener('keydown', (e) => {
        const open = frameModal.getAttribute('aria-hidden') === 'false';
        if (!open) return;
        if (e.key === 'Escape') closeFrameModal();
        if (e.key === '+' || e.key === '=') applyZoom(zoomScale * 1.2);
        if (e.key === '-' || e.key === '_') applyZoom(zoomScale / 1.2);
        if (e.key.toLowerCase() === '0') applyZoom(1);
    });

    // Hero text tilt animation
    const heroHeadline = document.querySelector('.hero-headline');
    const heroSubheadline = document.querySelector('.hero-subheadline');

    if (heroHeadline && heroSubheadline) {
        let mouseX = 0;
        let mouseY = 0;
        let isMouseOverHero = false;
        let animationFrameId = null;

        function updateTilt() {
            if (!isMouseOverHero) return;

            const heroRect = heroHeadline.getBoundingClientRect();
            const centerX = heroRect.left + heroRect.width / 2;
            const centerY = heroRect.top + heroRect.height / 2;

            const mouseOffsetX = mouseX - centerX;
            const mouseOffsetY = mouseY - centerY;

            const tiltX = (mouseOffsetX / (heroRect.width / 2)) * 10; // Mild tilt (max 3deg)
            const tiltY = (mouseOffsetY / (heroRect.height / 2)) * 10;

            const transform = `perspective(1000px) rotateX(${tiltY * 0.5}deg) rotateY(${tiltX * 0.5}deg)`;
            heroHeadline.style.transform = transform;
            heroSubheadline.style.transform = transform;

            animationFrameId = requestAnimationFrame(updateTilt);
        }

        function handleMouseMove(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
            if (isMouseOverHero && !animationFrameId) {
                updateTilt();
            }
        }

        function handleMouseEnter() {
            isMouseOverHero = true;
            updateTilt();
        }

        function handleMouseLeave() {
            isMouseOverHero = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            heroHeadline.style.transform = 'none';
            heroSubheadline.style.transform = 'none';
        }

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        heroHeadline.addEventListener('mouseenter', handleMouseEnter);
        heroSubheadline.addEventListener('mouseenter', handleMouseEnter);
        heroHeadline.addEventListener('mouseleave', handleMouseLeave);
        heroSubheadline.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cursor-following blob animation
    const canvas = document.getElementById('hero-rive-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const heroSection = document.querySelector('.hero-section');
        
        // Set canvas size
        function resizeCanvas() {
            if (heroSection) {
                canvas.width = heroSection.offsetWidth;
                canvas.height = heroSection.offsetHeight;
            }
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        const blobs = [];

        class Blob {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.targetX = x;
                this.targetY = y;
                this.radius = Math.random() * 100 + 50;
                this.vx = (Math.random() - 0.5) * 4;
                this.vy = (Math.random() - 0.5) * 4;
                this.color = 'rgba(58, 74, 92, 0.2)'; // Grey by default
            }

            setOrange() {
                this.color = 'rgba(255, 140, 0, 0.3)'; // Orange for cursor-following blob
            }

            update() {
                this.x += (this.targetX - this.x) * 0.05;
                this.y += (this.targetY - this.y) * 0.05;
                this.targetX += this.vx;
                this.targetY += this.vy;

                if (this.targetX < 0 || this.targetX > canvas.width) this.vx *= -1;
                if (this.targetY < 0 || this.targetY > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create initial blobs
        for (let i = 0; i < 3; i++) {
            blobs.push(new Blob(Math.random() * canvas.width, Math.random() * canvas.height));
        }

        // Set first blob to orange (cursor-following)
        blobs[0].setOrange();
        blobs[0].radius = 110;

        // Track mouse for cursor following
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move closest blob towards cursor
            if (blobs.length > 0) {
                blobs[0].targetX = mouseX;
                blobs[0].targetY = mouseY;
            }
        }, { passive: true });

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            blobs.forEach(blob => {
                blob.update();
                blob.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }
}); 