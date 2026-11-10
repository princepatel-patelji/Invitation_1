/* ============================================================
   PREMIUM DIGITAL WEDDING INVITATION
   Central Configuration - Edit wedding details here
   ============================================================ */

/* ===== CENTRAL WEDDING CONFIGURATION ===== */
const WEDDING = {
    // WhatsApp RSVP Number
    whatsapp: {
        number: "919454239413",
        display: "+91 94542 39413"
    },

    // Groom Details
    groom: {
        name: "Vishal Kas audhan",
        nameHindi: "विशाल कसौधन",
        father: "Anil Kas audhan",
        fatherHindi: "अनिल कसौधन",
        mother: "Rambha Devi",
        motherHindi: "रम्भा देवी",
        address: "Sikariganj, Gorakhpur, Uttar Pradesh."
    },

    // Bride Details
    bride: {
        name: "Nikki Kas audhan",
        nameHindi: "निक्की कसौधन",
        father: "Shiv Kumar Kas audhan",
        fatherHindi: "शिव कुमार कसौधन",
        mother: "Mina Devi",
        motherHindi: "मीना देवी",
        address: "Danganj, Banaras, Uttar Pradesh."
    },

    // Brother (Groom's Brother)
    brother: {
        name: "Nikhil Kas audhan",
        nameHindi: "निखिल कसौधन",
        relation: "दूल्हे के भाई"
    },

    // Wedding Dates
    dates: {
        mehndi: { date: "03 दिसंबर 2026", day: "गुरुवार" },
        haldi: { date: "04 दिसंबर 2026", day: "शुक्रवार" },
        vivah: { date: "05 दिसंबर 2026", day: "शनिवार" },
        vidaai: { date: "06 दिसंबर 2026", day: "रविवार" }
    },

    // Venue
    venue: {
        name: "हरी ओम मैरिज हॉल",
        nameEnglish: "Hari Om Marriage Hall",
        address: "G683+8GJ, Sikariganj, Jaddupatti, Imlidih Bujurg, Uttar Pradesh 273213",
        mapsUrl: "https://maps.app.goo.gl/whohqaNrV4ocJK3r5"
    },

    // Countdown Target
    countdown: {
        target: new Date("2026-12-05T00:00:00+05:30")
    },

    // Music
    music: {
        enabled: false,
        // Replace with your royalty-free audio file path
        url: "assets/music/wedding-music.mp3"
    }
};

/* ===== WHATSAPP MESSAGES ===== */
const WHATSAPP_MESSAGES = {
    yes: "नमस्कार,\n\nहम श्री विशाल कसौधन एवं निक्की कसौधन के शुभ विवाह में सपरिवार सम्मिलित होंगे।\n\nधन्यवाद।",
    no: "नमस्कार,\n\nशुभ विवाह के निमंत्रण के लिए बहुत-बहुत धन्यवाद।\n\nकुछ कारणों से हम विवाह समारोह में उपस्थित नहीं हो पाएंगे।\n\nसादर शुभकामनाएं।",
    maybe: "नमस्कार,\n\nशुभ विवाह के निमंत्रण के लिए धन्यवाद।\n\nअभी हमारी उपस्थिति निश्चित नहीं है। हम जल्द ही आपको सूचित करेंगे।"
};

/* ===== DOM ELEMENTS ===== */
const $ = (id) => document.getElementById(id);

/* ===== APP STATE ===== */
const App = {
    currentTab: 0,
    musicPlaying: false,
    audio: null,
    particlesInterval: null
};

/* ===== INITIALIZE ===== */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen after delay
    setTimeout(() => {
        $('loading-screen').classList.add('hidden');
    }, 1500);

    // Event Listeners
    $('open-invitation').addEventListener('click', openGateAnimation);
    
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => switchTab(index));
    });

    // RSVP buttons
    document.querySelectorAll('.rsvp-btn').forEach(btn => {
        btn.addEventListener('click', () => handleRSVP(btn.dataset.message));
    });

    // Music toggle
    $('music-toggle').addEventListener('click', toggleMusic);

    // Venue button
    document.querySelectorAll('.btn-venue').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(WEDDING.venue.mapsUrl, '_blank');
        });
    });

    // Start countdown
    startCountdown();

    // Initialize particles for gate
    initGateParticles();
}

/* ===== GATE OPENING ANIMATION ===== */
function openGateAnimation() {
    // Switch to gate screen
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    $('gate-animation').classList.add('active');

    // Start particles
    startParticles();

    // Open doors after delay
    setTimeout(() => {
        const leftDoor = document.querySelector('.left-door');
        const rightDoor = document.querySelector('.right-door');
        
        if (leftDoor) leftDoor.classList.add('open-left');
        if (rightDoor) rightDoor.classList.add('open-right');

        // Play gate sound effect
        playGateSound();
    }, 800);

    // Show reveal content and transition to invitation
    setTimeout(() => {
        const reveal = document.querySelector('.gate-reveal');
        if (reveal) reveal.classList.add('show');

        // Stop particles
        stopParticles();

        // Transition to invitation screen
        setTimeout(() => {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            $('invitation').classList.add('active');
            
            // Show toast
            showToast('शुभ विवाह की शुभकामनाएं! 🪔');
        }, 2000);
    }, 2500);
}

/* ===== GATE PARTICLES ===== */
function initGateParticles() {
    const container = $('gate-particles');
    if (!container) return;
    container.innerHTML = '';
}

function startParticles() {
    const container = $('gate-particles');
    if (!container) return;

    App.particlesInterval = setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const left = Math.random() * 100;
        particle.style.left = left + '%';
        particle.style.bottom = '0';
        
        // Random size
        const size = 4 + Math.random() * 8;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color
        const colors = ['#d4af37', '#f0d060', '#ffd700', '#fff'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration
        const duration = 2 + Math.random() * 3;
        particle.style.animationDuration = duration + 's';
        
        container.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) particle.parentNode.removeChild(particle);
        }, duration * 1000);
    }, 300);
}

function stopParticles() {
    if (App.particlesInterval) {
        clearInterval(App.particlesInterval);
        App.particlesInterval = null;
    }
}

/* ===== TAB SWITCHING ===== */
function switchTab(index) {
    App.currentTab = index;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
    
    // Update tab pages
    document.querySelectorAll('.tab-page').forEach((page, i) => {
        page.classList.toggle('active', i === index);
    });
}

/* ===== COUNTDOWN ===== */
function startCountdown() {
    const targetDate = WEDDING.countdown.target;
    
    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;
        
        if (difference <= 0) {
            $('days').textContent = '00';
            $('hours').textContent = '00';
            $('minutes').textContent = '00';
            $('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        $('days').textContent = String(days).padStart(2, '0');
        $('hours').textContent = String(hours).padStart(2, '0');
        $('minutes').textContent = String(minutes).padStart(2, '0');
        $('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    // Update immediately
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

/* ===== RSVP WHATSAPP ===== */
function handleRSVP(type) {
    const message = WHATSAPP_MESSAGES[type];
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WEDDING.whatsapp.number}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'width=600,height=600');
    
    // Show appropriate toast
    const messages = {
        yes: 'धन्यवाद! WhatsApp खुल गया। कृपया Send दबाकर भेजें।',
        no: 'धन्यवाद! WhatsApp खुल गया। कृपया Send दबाकर भेजें।',
        maybe: 'धन्यवाद! WhatsApp खुल गया। कृपया Send दबाकर भेजें।'
    };
    
    showToast(messages[type]);
}

/* ===== MUSIC ===== */
function toggleMusic() {
    const toggle = $('music-toggle');
    
    if (!App.audio) {
        // Create audio element
        App.audio = new Audio(WEDDING.music.url);
        App.audio.loop = true;
        App.audio.volume = 0.4;
        
        App.audio.addEventListener('error', () => {
            showToast('⚠️ Music file not found. Please add audio file.');
            toggle.classList.add('muted');
        });
    }
    
    if (App.musicPlaying) {
        App.audio.pause();
        App.musicPlaying = false;
        toggle.textContent = '🎵';
        toggle.classList.remove('muted');
    } else {
        App.audio.play().catch(e => {
            showToast('⚠️ Music playback failed. Please try again.');
            toggle.classList.add('muted');
        });
        App.musicPlaying = true;
        toggle.textContent = '🔇';
        toggle.classList.add('muted');
    }
}

/* ===== TOAST ===== */
function showToast(message) {
    const toast = $('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

/* ===== GATE SOUND ===== */
function playGateSound() {
    // Create a simple synthesized sound effect
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Audio context not available, silently fail
    }
}

/* ===== UTILITY: Update all dynamic content ===== */
function updateDynamicContent() {
    // Update welcome message with names
    const welcomeMain = document.querySelector('.welcome-main');
    if (welcomeMain) {
        welcomeMain.innerHTML = `श्री ${WEDDING.groom.nameHindi} एवं ${WEDDING.bride.nameHindi} के शुभ विवाह के पावन अवसर पर<br>आप सपरिवार सादर आमंत्रित हैं।`;
    }
    
    // Update couple names
    const groomName = document.querySelector('.groom-name');
    const brideName = document.querySelector('.bride-name');
    if (groomName) groomName.textContent = WEDDING.groom.nameHindi;
    if (brideName) brideName.textContent = WEDDING.bride.nameHindi;
    
    // Update family details
    document.querySelectorAll('.groom-family .family-details p').forEach((p, index) => {
        const details = [
            `<strong>दूल्हा:</strong> ${WEDDING.groom.nameHindi}`,
            `<strong>पिता:</strong> ${WEDDING.groom.fatherHindi}`,
            `<strong>माता:</strong> ${WEDDING.groom.motherHindi}`,
            `<strong>पता:</strong> ${WEDDING.groom.address}`
        ];
        if (details[index]) p.innerHTML = details[index];
    });
    
    document.querySelectorAll('.bride-family .family-details p').forEach((p, index) => {
        const details = [
            `<strong>दुल्हन:</strong> ${WEDDING.bride.nameHindi}`,
            `<strong>पिता:</strong> ${WEDDING.bride.fatherHindi}`,
            `<strong>माता:</strong> ${WEDDING.bride.motherHindi}`,
            `<strong>पता:</strong> ${WEDDING.bride.address}`
        ];
        if (details[index]) p.innerHTML = details[index];
    });
    
    // Update brother name
    const brotherName = document.querySelector('.brother-full-name');
    if (brotherName) brotherName.textContent = WEDDING.brother.nameHindi;
    
    // Update venue
    const venueName = document.querySelector('.venue-name');
    const venueAddress = document.querySelector('.venue-address');
    if (venueName) venueName.textContent = WEDDING.venue.name;
    if (venueAddress) venueAddress.innerHTML = WEDDING.venue.address;
}

// Update content after DOM is ready
document.addEventListener('DOMContentLoaded', updateDynamicContent);