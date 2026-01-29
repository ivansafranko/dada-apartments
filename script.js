// Apartments Dada - Interactive JavaScript

// Language translations
const translations = {
    hr: {
        // Page meta
        'page-title': 'Apartmani Krapinske Toplice | Apartmani Dada',
        'page-description': 'Apartmani Krapinske Toplice – smještaj, sobe i apartmani blizu Aquae Vivae. WiFi i parking. Rezervirajte Apartmani Dada u centru i mirnoj lokaciji.',
        'landing-page-title': 'Apartmani Krapinske Toplice – smještaj, soba i apartmani | Apartmani Dada',
        'landing-page-description': 'Apartmani Krapinske Toplice: smještaj, soba i apartmani blizu Aquae Vivae. WiFi i parking. Dvije lokacije (centar i mirna zona). Rezervirajte online.',
        'landing-page-og-title': 'Apartmani Krapinske Toplice – smještaj, soba i apartmani | Apartmani Dada',
        'landing-page-og-description': 'Smještaj u Krapinskim Toplicama: apartmani i soba blizu Aquae Vivae. WiFi i parking. Rezervirajte online.',
        
        // Navigation
        'nav-home': 'Početna',
        'nav-about': 'O nama',
        'nav-apartments': 'Apartmani',
        'nav-book': 'Rezervirajte online',
        'nav-contact': 'Kontakt',
        
        // Hero section
        'hero-kicker': 'Lječilišni grad. Dvije lokacije. Miran boravak.',
        'hero-headline': '<span class="hero-headline-line">Apartmani u</span><span class="hero-headline-line">Krapinskim Toplicama</span>',
        'hero-subheadline': 'Apartmani Krapinske Toplice – čisto, moderno i ugodno uređeno. Smještaj blizu Aquae Vivae, s WiFi‑jem i parkingom.',
        'hero-bullet-1': 'Aquae Vivae na par minuta hoda',
        'hero-bullet-2': 'Čisto, moderno i ugodno uređeno',
        'hero-bullet-3': 'Parking + WiFi uključeni',
        'explore-btn': 'Istražite apartmane',

        // Landing page (apartmani-krapinske-toplice)
        'landing-kicker': 'Smještaj u Krapinskim Toplicama',
        'landing-headline': 'Apartmani Krapinske Toplice – smještaj; soba i apartmani',
        'landing-intro': 'Ako tražite smještaj u Krapinskim Toplicama, apartman ili sobu, ovdje su najvažnije informacije na jednom mjestu – lokacije, vrste smještaja i kako brzo rezervirati.',
        'landing-card1-title': 'Smještaj u centru',
        'landing-card1-text': 'Za goste koji žele biti bliže Aquae Vivae.',
        'landing-card2-title': 'Lokacija blizu bolnice',
        'landing-card2-text': 'Praktično za rehabilitaciju i klinike; mirniji boravak i odličan odabir za duže termine.',
        'landing-card3-title': 'Soba i studio opcije',
        'landing-card3-text': 'Birajte između većih apartmana te studio opcije i sobe – ovisno o broju gostiju i planu putovanja.',
        'landing-location-title': 'Lokacija i udaljenosti',
        'landing-location-intro': 'Krapinske Toplice su poznate po termalnom wellnessu i rehabilitaciji. Naše dvije lokacije pokrivaju i centar mjesta i mirniju zonu u blizini zdravstvenih sadržaja.',
        'landing-location1-title': 'Aquae Vivae',
        'landing-location1-text': 'Termalni vodeni park – <strong>nekoliko minuta hoda</strong> (ovisno o odabranoj lokaciji smještaja).',
        'landing-location2-title': 'Bolnica za medicinsku rehabilitaciju',
        'landing-location2-text': 'Praktično za goste koji dolaze na terapije ili u posjet – <strong>u blizini</strong> bolnice.',
        'landing-location3-title': 'Klinika Magdalena',
        'landing-location3-text': 'Kardiovaskularna klinika – <strong>u blizini</strong>; odličan izbor za smještaj tijekom pregleda i oporavka.',
        'landing-faq-title': 'Česta pitanja (FAQ)',
        'landing-faq-q1': 'Je li ovo dobar izbor ako tražim smještaj u Krapinskim Toplicama?',
        'landing-faq-a1': 'Da — nudimo više tipova smještaja (apartmani i soba) na dvije lokacije, pa se lako prilagodimo svrsi putovanja.',
        'landing-faq-q2': 'Kako najbrže rezervirati?',
        'landing-faq-a2': 'Najbrže je preko online rezervacije: <a href="/book-now">Rezervirajte online</a> ili na broj <a href="tel:+385989982059">+385 98 998 2059</a>.',
        'landing-faq-q3': 'Mogu li vidjeti sve apartmane i fotografije?',
        'landing-faq-a3': 'Da — pogledajte popis i fotografije na početnoj stranici: <a href="/#apartments">Apartmani</a>.',

        // Homepage SEO section
        'seo-section-title': 'Apartmani Krapinske Toplice; smještaj, soba i apartmani',
        'seo-section-subheadline': 'Tražite <strong>smještaj u Krapinskim Toplicama</strong>, apartman ili sobu? Apartmani Dada nude više opcija – od prostranih apartmana do udobne sobe – na dvije lokacije u Krapinskim Toplicama.',
        'seo-card1-title': 'Apartmani u centru',
        'seo-card1-text': 'Idealno ako želite sve “na dohvat ruke” – šetnja, restorani, trgovine i Aquae Vivae u blizini.',
        'seo-card2-title': 'Smještaj blizu bolnice',
        'seo-card2-text': 'Mirna zona, praktično za posjetitelje klinika i rehabilitacije; odličan izbor za duži boravak.',
        'seo-card3-title': 'Soba i studio opcije',
        'seo-card3-text': 'Za solo putnike i parove: studio apartman i soba – jednostavno, čisto i udobno.',
        'seo-link-detail': 'Detaljno: Apartmani Krapinske Toplice',
        'seo-faq-title': 'FAQ – apartmani i smještaj u Krapinskim Toplicama',
        'seo-faq-q1': 'Gdje pronaći smještaj u Krapinskim Toplicama blizu Aquae Vivae?',
        'seo-faq-a1': 'Apartmani Dada nude dvije lokacije, s praktičnim pristupom Aquae Vivae i blizinom bolnice (ovisno o lokaciji smještaja).',
        'seo-faq-q2': 'Imate li sobu u ponudi?',
        'seo-faq-a2': 'Da — uz apartmane nudimo i sobu s kupaonicom kao jednostavniju opciju smještaja.',
        'seo-faq-q3': 'Što je uključeno u smještaj?',
        'seo-faq-a3': 'Standardno nudimo WiFi, klimu i parking, a detalji ovise o odabranom apartmanu ili sobi.',
        
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
        'footer-copyright': '© 2026 Apartmani Dada. Sva prava pridržana. | apartments-dada.com'
    },
    en: {
        // Page meta
        'page-title': 'Apartments Krapinske Toplice | Apartmani Dada',
        'page-description': 'Apartments in Krapinske Toplice near Aquae Vivae. WiFi and parking. Book Apartmani Dada in a central and peaceful location.',
        'landing-page-title': 'Krapinske Toplice apartments – accommodation, a room & apartments | Apartmani Dada',
        'landing-page-description': 'Krapinske Toplice apartments: accommodation, a room, and apartments near Aquae Vivae. WiFi and parking. Two locations (center and quiet area). Book online.',
        'landing-page-og-title': 'Krapinske Toplice apartments – accommodation, a room & apartments | Apartmani Dada',
        'landing-page-og-description': 'Accommodation in Krapinske Toplice: apartments and a room near Aquae Vivae. WiFi and parking. Book online.',
        
        // Navigation
        'nav-home': 'Homepage',
        'nav-about': 'About',
        'nav-apartments': 'Apartments',
        'nav-book': 'Book Now',
        'nav-contact': 'Contact',
        
        // Hero section
        'hero-kicker': 'Spa town. Two locations. A calm stay.',
        'hero-headline': '<span class="hero-headline-line">Apartments in</span><span class="hero-headline-line">Krapinske Toplice</span>',
        'hero-subheadline': 'Modern vacation rentals near Aquae Vivae Water Park. Fully equipped apartments with WiFi, parking, and stunning views in Croatia\'s premier spa destination.',
        'hero-bullet-1': 'Aquae Vivae minutes away on foot',
        'hero-bullet-2': 'Clean, modern, and comfortably designed',
        'hero-bullet-3': 'Parking + WiFi included',
        'explore-btn': 'Explore Apartments',

        // Landing page (apartmani-krapinske-toplice)
        'landing-kicker': 'Stay in Krapinske Toplice',
        'landing-headline': 'Krapinske Toplice apartments — accommodation, a room & apartments',
        'landing-intro': 'If you are looking for accommodation in Krapinske Toplice, an apartment or a room, here are the key details in one place — locations, accommodation types, and how to book quickly.',
        'landing-card1-title': 'Central location',
        'landing-card1-text': 'For guests who want to be closer to Aquae Vivae.',
        'landing-card2-title': 'Near the hospital',
        'landing-card2-text': 'Practical for rehab and clinics; a calmer stay and a great choice for longer visits.',
        'landing-card3-title': 'Room & studio options',
        'landing-card3-text': 'Choose between larger apartments and studio/room options — depending on your group size and travel plan.',
        'landing-location-title': 'Location & distances',
        'landing-location-intro': 'Krapinske Toplice is known for thermal wellness and rehabilitation. Our two locations cover both the center and a quieter area near healthcare facilities.',
        'landing-location1-title': 'Aquae Vivae',
        'landing-location1-text': 'Thermal water park — <strong>a few minutes on foot</strong> (depending on the selected location).',
        'landing-location2-title': 'Medical Rehabilitation Hospital',
        'landing-location2-text': 'Convenient for therapy visits — <strong>nearby</strong> the hospital.',
        'landing-location3-title': 'Magdalena Clinic',
        'landing-location3-text': 'Cardiovascular clinic — <strong>nearby</strong>; a great choice for checkups and recovery stays.',
        'landing-faq-title': 'Frequently Asked Questions',
        'landing-faq-q1': 'Is this a good choice if I need accommodation in Krapinske Toplice?',
        'landing-faq-a1': 'Yes — we offer multiple accommodation types (apartments and a room) across two locations, so it is easy to match your trip.',
        'landing-faq-q2': 'What is the fastest way to book?',
        'landing-faq-a2': 'The fastest way is to book online: <a href="/book-now">Book online</a> or call <a href="tel:+385989982059">+385 98 998 2059</a>.',
        'landing-faq-q3': 'Can I see all apartments and photos?',
        'landing-faq-a3': 'Yes — see the list and photos on the homepage: <a href="/#apartments">Apartments</a>.',

        // Homepage SEO section
        'seo-section-title': 'Krapinske Toplice apartments; accommodation, a room & apartments',
        'seo-section-subheadline': 'Looking for <strong>accommodation in Krapinske Toplice</strong>, an apartment, or a room? Apartmani Dada offers multiple options — from spacious apartments to a comfortable room — across two locations in Krapinske Toplice.',
        'seo-card1-title': 'Central apartments',
        'seo-card1-text': 'Ideal if you want everything close by — walks, restaurants, shops, and Aquae Vivae nearby.',
        'seo-card2-title': 'Near the hospital',
        'seo-card2-text': 'A quiet area, practical for clinic and rehab visits; a great choice for longer stays.',
        'seo-card3-title': 'Room & studio options',
        'seo-card3-text': 'For solo travelers and couples: a studio apartment and a room — simple, clean, and comfortable.',
        'seo-link-detail': 'Details: Krapinske Toplice apartments',
        'seo-faq-title': 'FAQ – apartments and accommodation in Krapinske Toplice',
        'seo-faq-q1': 'Where can I find accommodation in Krapinske Toplice near Aquae Vivae?',
        'seo-faq-a1': 'Apartmani Dada offers two locations with convenient access to Aquae Vivae and proximity to the hospital (depending on the selected location).',
        'seo-faq-q2': 'Do you offer a room?',
        'seo-faq-a2': 'Yes — alongside apartments we also offer a room with a private bathroom as a simpler accommodation option.',
        'seo-faq-q3': 'What is included in the accommodation?',
        'seo-faq-a3': 'WiFi, AC, and parking are standard; details depend on the selected apartment or room.',
        
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
        'footer-copyright': '© 2026 Apartmani Dada. All rights reserved. | apartments-dada.com'
    }
};

// Language functionality
const pathIsEnglish = window.location.pathname.startsWith('/en');
const forcedLanguage = document.documentElement.getAttribute('data-force-lang') || (pathIsEnglish ? 'en' : null);
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
    
    // Update meta tags with translations
    document.querySelectorAll('meta[data-translate]').forEach(meta => {
        const key = meta.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            meta.setAttribute('content', translations[lang][key]);
        }
    });
    
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
    
    // Save preference unless a page forces language
    if (!forcedLanguage) {
        localStorage.setItem('preferredLanguage', lang);
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved language preference, default to Croatian
    const savedLanguage = forcedLanguage || localStorage.getItem('preferredLanguage') || 'hr';

    // Normalize canonical/og URLs for /en routes (Netlify rewrites)
    if (pathIsEnglish) {
        const pathname = window.location.pathname === '/en' ? '/en/' : window.location.pathname;
        const canonicalHref = `https://apartments-dada.com${pathname}`;
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', canonicalHref);
        }
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', canonicalHref);
        }
        const twitterUrl = document.querySelector('meta[property="twitter:url"]');
        if (twitterUrl) {
            twitterUrl.setAttribute('content', canonicalHref);
        }

        // Ensure internal links keep /en/ context
        const linkMappings = [
            { test: /^\/$/, replace: '/en/' },
            { test: /^index\.html$/, replace: '/en/' },
            { test: /^\/index\.html(#.*)?$/, replace: '/en/$1' },
            { test: /^\.\/index\.html(#.*)?$/, replace: '/en/$1' },
            { test: /^book-now\/?$/, replace: '/en/book-now' },
            { test: /^\.\/book-now\/?$/, replace: '/en/book-now' },
            { test: /^\/book-now\/?$/, replace: '/en/book-now' },
            { test: /^apartmani-krapinske-toplice\/?$/, replace: '/en/apartmani-krapinske-toplice' },
            { test: /^\.\/apartmani-krapinske-toplice\/?$/, replace: '/en/apartmani-krapinske-toplice' },
            { test: /^\/apartmani-krapinske-toplice\/?$/, replace: '/en/apartmani-krapinske-toplice' }
        ];

        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
                return;
            }
            if (href.startsWith('/#')) {
                link.setAttribute('href', `/en${href}`);
                return;
            }
            if (href.startsWith('#')) {
                link.setAttribute('href', `/en/${href}`);
                return;
            }
            for (const { test, replace } of linkMappings) {
                if (test.test(href)) {
                    const match = href.match(test);
                    if (match && match[1]) {
                        link.setAttribute('href', replace.replace('$1', match[1]));
                    } else {
                        link.setAttribute('href', replace);
                    }
                    break;
                }
            }
        });
    }
    
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

    // Extra safety: ensure /en routes always render in English
    if (pathIsEnglish) {
        setTimeout(() => updateLanguage('en'), 0);
        setTimeout(() => updateLanguage('en'), 200);
    }
    
    // Make body visible after initial language update
    document.body.style.opacity = '1';
    document.body.classList.add('is-ready');
    
    // Set up language toggle
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-lang-target');
            if (target) {
                window.location.href = target;
                return;
            }

            const path = window.location.pathname;
            const hash = window.location.hash || '';
            if (path.startsWith('/en')) {
                let hrPath = path.replace(/^\/en/, '');
                if (hrPath === '' || hrPath === '/') {
                    hrPath = '/';
                }
                window.location.href = `${hrPath}${hash}`;
                return;
            }

            const enPath = path === '/' ? '/en/' : `/en${path}`;
            window.location.href = `${enPath}${hash}`;
            return;

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
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 20;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero explore button functionality
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const target = document.getElementById('apartments');
            if (target) {
                const headerHeight = 20;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
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

    // Contact form handling with Netlify Forms
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Show loading state
            const submitBtn = this.querySelector('.contact-submit');
            const originalText = submitBtn.textContent;
            const loadingText = currentLanguage === 'hr' ? 'Šalje se...' : 'Sending...';
            
            submitBtn.textContent = loadingText;
            submitBtn.disabled = true;
            
            // Simple form validation before submission
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
                const errorText = currentLanguage === 'hr' ? 
                    'Molimo unesite sve obavezne podatke.' : 
                    'Please fill in all required fields.';
                alert(errorText);
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            // Submit form data to Netlify
            const formData = new FormData(this);
            
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // Show success message
                const successMessage = document.getElementById('form-success-message');
                const contactFormElement = document.querySelector('.contact-form');
                
                // Hide form and show success message
                contactFormElement.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Update Lucide icons for the success message
                lucide.createIcons();
                
                // Apply current language translations to success message
                updateLanguage(currentLanguage);
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset form for future use
                contactFormElement.reset();
                
                // Show form again after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    contactFormElement.style.display = 'block';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            })
            .catch((error) => {
                console.error('Error:', error);
                const errorText = currentLanguage === 'hr' ? 
                    'Greška pri slanju poruke. Molimo pokušajte ponovo.' : 
                    'Error sending message. Please try again.';
                alert(errorText);
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (header) {
            header.classList.toggle('is-scrolled', scrollTop > 24);
        }
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
}); 