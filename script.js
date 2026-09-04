/* ============================================
   SHADOW MARKET — Interactive Logic
   Simulated Darknet Marketplace Interactions
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Fake Anti-DDoS / Browser Check on Load
    createLoadingScreen();

    // 2. Dynamic Time Update
    updateTimestamps();
    setInterval(updateTimestamps, 60000); // Update every minute

    // 3. Randomize Online Users
    randomizeUserCount();
    setInterval(randomizeUserCount, 15000);

    // 4. Copy to Clipboard for Crypto Addresses
    setupCryptoCopiers();

    // 5. Setup Navigation Tabs
    setupNavigation();
});

function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'ddos-check';
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.width = '100vw';
    loader.style.height = '100vh';
    loader.style.backgroundColor = '#08080c';
    loader.style.color = '#00e676';
    loader.style.fontFamily = "'JetBrains Mono', monospace";
    loader.style.display = 'flex';
    loader.style.flexDirection = 'column';
    loader.style.justifyContent = 'center';
    loader.style.alignItems = 'center';
    loader.style.zIndex = '9999';
    
    loader.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 20px;">🛡️</div>
        <h2 style="margin-bottom: 15px; font-weight: 500;">Checking your browser before accessing Shadow Market...</h2>
        <p style="color: #808098; margin-bottom: 30px; font-size: 0.9rem;">This process is automatic. Your browser will redirect to your requested content shortly.</p>
        <div style="text-align: left; background: #12121c; padding: 20px; border: 1px solid #1e1e2e; border-radius: 8px; width: 400px;">
            <div id="check-step-1">[*] Verifying Tor circuit...</div>
            <div id="check-step-2" style="display:none;">[*] Establishing secure connection...</div>
            <div id="check-step-3" style="display:none;">[*] Solving PoW challenge...</div>
            <div id="check-step-4" style="display:none; color: #00e676;">[+] Access granted.</div>
        </div>
    `;

    document.body.appendChild(loader);
    document.body.style.overflow = 'hidden'; // prevent scrolling

    setTimeout(() => { document.getElementById('check-step-2').style.display = 'block'; }, 1000);
    setTimeout(() => { document.getElementById('check-step-3').style.display = 'block'; }, 2200);
    setTimeout(() => { 
        document.getElementById('check-step-4').style.display = 'block'; 
    }, 3800);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loader.remove();
            document.body.style.overflow = 'auto';
        }, 500);
    }, 4500);
}

function updateTimestamps() {
    const timeElements = document.querySelectorAll('.post-time');
    const now = new Date();
    
    // Convert to a realistic UTC format string
    const format = (date) => {
        return date.toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
    };

    // Keep the hardcoded dates, just update one or two to look "live"
    if (timeElements.length > 0) {
        // Only update the first one to simulate a very recent post
        let recent = new Date(now.getTime() - (5 * 60000)); // 5 mins ago
        timeElements[0].innerText = format(recent);
    }
}

function randomizeUserCount() {
    const userEl = document.getElementById('online-users');
    if (userEl) {
        // Base 12,451 with slight fluctuation
        let current = parseInt(userEl.innerText.replace(/,/g, '')) || 12451;
        current = current + Math.floor(Math.random() * 15) - 7;
        userEl.innerText = current.toLocaleString();
    }
}

function setupCryptoCopiers() {
    const wallets = document.querySelectorAll('.wallet-addr');
    wallets.forEach(wallet => {
        wallet.style.cursor = 'pointer';
        wallet.title = "Click to copy address";
        
        wallet.addEventListener('click', function() {
            const text = this.innerText;
            navigator.clipboard.writeText(text).then(() => {
                const originalBg = this.style.backgroundColor;
                this.style.backgroundColor = 'rgba(0, 230, 118, 0.2)';
                setTimeout(() => {
                    this.style.backgroundColor = originalBg;
                }, 300);
            });
        });
        
        // Add hover effect
        wallet.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        wallet.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.nav-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Show corresponding section
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

