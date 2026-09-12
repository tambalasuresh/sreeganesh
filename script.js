// Target WhatsApp / Phone Number from Visiting Card
const TARGET_PHONE_NUMBER = "917899206046"; // +91 78992 06046

document.addEventListener("DOMContentLoaded", function () {
    // 1. Mobile Menu Hamburger Toggle
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", function () {
            navMenu.classList.toggle("show");
            const icon = hamburgerBtn.querySelector("i");
            if (navMenu.classList.contains("show")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
                if (hamburgerBtn.querySelector("i")) {
                    hamburgerBtn.querySelector("i").className = "fa-solid fa-bars";
                }
            });
        });
    }

    // 2. Active Navbar link indicator on scroll
    window.addEventListener("scroll", function () {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-link");
        const navbar = document.getElementById("navbar");

        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "var(--shadow-sm)";
        }

        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
});

// Modal Functions
function openBookingModal(serviceName) {
    const modal = document.getElementById("bookingModal");
    const serviceInput = document.getElementById("modalServiceInput");
    const serviceTitle = document.getElementById("modalServiceTitle");

    if (serviceInput) {
        serviceInput.value = serviceName || "General Appliance Service";
    }
    if (serviceTitle) {
        serviceTitle.innerText = `Book ${serviceName || "Appliance Service"}`;
    }
    if (modal) {
        modal.classList.add("show");
    }
}

function closeBookingModal() {
    const modal = document.getElementById("bookingModal");
    if (modal) {
        modal.classList.remove("show");
    }
}

// Handle Modal Form Submit -> Directs User to WhatsApp Mobile Chat
function handleModalSubmit(event) {
    event.preventDefault();

    const service = document.getElementById("modalServiceInput").value;
    const name = document.getElementById("modalName").value.trim();
    const phone = document.getElementById("modalPhone").value.trim();
    const area = document.getElementById("modalArea").value.trim();
    const time = document.getElementById("modalTime").value;

    if (!name || !phone || !area) {
        alert("Please fill in your Name, Phone Number and Location area.");
        return;
    }

    // Format WhatsApp Message
    const message = `🛠️ *NEW SERVICE BOOKING REQUEST* 🛠️\n` +
        `-----------------------------------------\n` +
        `*Business:* Sree Gaanasree Enterprises\n` +
        `*Service Requested:* ${service}\n` +
        `*Customer Name:* ${name}\n` +
        `*Mobile Number:* ${phone}\n` +
        `*Location/Address:* ${area}, Bengaluru\n` +
        `*Preferred Visit Time:* ${time}\n` +
        `-----------------------------------------\n` +
        `Please confirm technician availability. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${TARGET_PHONE_NUMBER}?text=${encodedMessage}`;

    // Close Modal and Redirect to WhatsApp
    closeBookingModal();
    window.open(whatsappUrl, "_blank");
}

// Handle Direct Booking Form on Page
function handleDirectFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const service = document.getElementById("serviceType").value;
    const address = document.getElementById("custAddress").value.trim();
    const desc = document.getElementById("problemDesc").value.trim();

    if (!name || !phone || !address) {
        alert("Please fill in your Name, Phone Number, and Address.");
        return;
    }

    let message = `🔧 *APPLIANCE SERVICE BOOKING* 🔧\n` +
        `-----------------------------------------\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Service Needed:* ${service}\n` +
        `*Address in Bengaluru:* ${address}\n`;

    if (desc) {
        message += `*Problem Note:* ${desc}\n`;
    }

    message += `-----------------------------------------\n` +
        `Sent via Sree Gaanasree Enterprises Website`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${TARGET_PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
}

// Close Modal on backdrop click
window.onclick = function (event) {
    const modal = document.getElementById("bookingModal");
    if (event.target === modal) {
        closeBookingModal();
    }
};
