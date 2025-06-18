// Debug mode - set to true to see console logs
const DEBUG_MODE = false;

// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG_MODE) {
        if (data) {
            console.log(`[Panorama Debug] ${message}`, data);
        } else {
            console.log(`[Panorama Debug] ${message}`);
        }
    }
}

// Sidebar toggle functions
function openSidebar() {
    try {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
            debugLog('Sidebar opened successfully');
        } else {
            debugLog('Sidebar element not found');
        }
    } catch (error) {
        console.error('Error opening sidebar:', error);
    }
}

function closeSidebar() {
    try {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
            debugLog('Sidebar closed successfully');
        } else {
            debugLog('Sidebar element not found');
        }
    } catch (error) {
        console.error('Error closing sidebar:', error);
    }
}

// Close sidebar when clicking outside
window.addEventListener('click', function(e) {
    try {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !e.target.classList.contains('menu-btn')) {
                closeSidebar();
            }
        }
    } catch (error) {
        console.error('Error in sidebar click handler:', error);
    }
});

// Close sidebar on escape key
document.addEventListener('keydown', function(e) {
    try {
        if (e.key === 'Escape') {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        }
    } catch (error) {
        console.error('Error in escape key handler:', error);
    }
});

// Activate bottom navigation links
function activateBottomNav() {
    try {
        const navLinks = document.querySelectorAll('.bottom-nav .nav-link');
        const currentPath = window.location.pathname;
        
        debugLog('Current path:', currentPath);
        debugLog('Found nav links:', navLinks.length);
        
        navLinks.forEach(function(link, index) {
            // Remove existing active class
            link.classList.remove('active');
            
            try {
                // Check if current path matches link href
                const linkPath = new URL(link.href).pathname;
                debugLog(`Link ${index} path:`, linkPath);
                
                if (linkPath === currentPath || 
                    (currentPath === '/' && linkPath === '/') ||
                    (currentPath !== '/' && linkPath !== '/' && currentPath.includes(linkPath))) {
                    link.classList.add('active');
                    debugLog(`Activated link ${index}:`, linkPath);
                }
            } catch (urlError) {
                debugLog(`Error parsing URL for link ${index}:`, urlError);
                // Fallback: check if href contains current path
                if (link.href && link.href.includes(currentPath)) {
                    link.classList.add('active');
                    debugLog(`Fallback activated link ${index}`);
                }
            }
        });
    } catch (error) {
        console.error('Error activating bottom navigation:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        debugLog('DOM loaded, initializing...');
        
        // Activate bottom navigation
        activateBottomNav();
        
        // Add event listeners for menu buttons
        const menuButtons = document.querySelectorAll('.menu-btn');
        debugLog('Found menu buttons:', menuButtons.length);
        
        menuButtons.forEach(function(button, index) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                debugLog(`Menu button ${index} clicked`);
                openSidebar();
            });
        });
        
        // Add event listener for close button
        const closeButton = document.querySelector('.sidebar .close-btn');
        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                debugLog('Close button clicked');
                closeSidebar();
            });
        } else {
            debugLog('Close button not found');
        }
        
        debugLog('Initialization completed');
        
    } catch (error) {
        console.error('Error initializing JavaScript:', error);
    }
});

// Handle page visibility changes (for mobile apps)
document.addEventListener('visibilitychange', function() {
    try {
        if (document.hidden) {
            // Close sidebar when page becomes hidden
            debugLog('Page hidden, closing sidebar');
            closeSidebar();
        }
    } catch (error) {
        console.error('Error in visibility change handler:', error);
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    try {
        // Close sidebar on large screens (desktop)
        if (window.innerWidth >= 992) {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('active')) {
                debugLog('Window resized to desktop, closing sidebar');
                closeSidebar();
            }
        }
    } catch (error) {
        console.error('Error in resize handler:', error);
    }
}); 