let inactivityTimer;
let isScreensaverActive = false;
const INACTIVITY_TIME = 30000; // 30 seconds

// Create screensaver overlay
function createScreensaver() {
  const screensaver = document.createElement('div');
  screensaver.id = 'screensaver';
  screensaver.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 9999;
    display: none;
    overflow: hidden;
  `;
  
  const img = document.createElement('img');
  img.id = 'screensaver-img';
  img.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    height: 100svh;
    height: 100dvh;
    object-fit: cover;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
  `;
  
  screensaver.appendChild(img);
  document.body.appendChild(screensaver);
  
  return screensaver;
}

// Animation frames
const animationFrames = [
  "rest00.jpg","rest01.jpg","rest02.jpg","rest03.jpg","rest04.jpg",
  "rest05.jpg","rest06.jpg","rest07.jpg","rest08.jpg","rest09.jpg",
  "rest10.jpg","rest11.jpg","rest12.jpg","rest13.jpg","rest14.jpg",
  "rest15.jpg","rest16.jpg","rest17.jpg","rest18.jpg","rest19.jpg",
  "rest20.jpg","rest21.jpg","rest22.jpg","rest23.jpg","rest24.jpg",
  "rest25.jpg","rest26.jpg","rest27.jpg","rest28.jpg","rest29.jpg",
  "rest30.jpg"
];

// Start screensaver
function startScreensaver() {
  const screensaver = document.getElementById('screensaver') || createScreensaver();
  screensaver.style.display = 'block';
  isScreensaverActive = true;
  
  const img = document.getElementById('screensaver-img');
  let frameIndex = 0;
  img.src = 'assets/images/' + animationFrames[frameIndex];
  
  const animationInterval = setInterval(() => {
    if (!isScreensaverActive) {
      clearInterval(animationInterval);
      return;
    }
    frameIndex = (frameIndex + 1) % animationFrames.length;
    img.src = 'assets/images/' + animationFrames[frameIndex];
  }, 100);
}

// Stop screensaver
function stopScreensaver() {
  const screensaver = document.getElementById('screensaver');
  if (screensaver) {
    screensaver.style.display = 'none';
  }
  isScreensaverActive = false;
  resetInactivityTimer();
}

// Reset inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    startScreensaver();
  }, INACTIVITY_TIME);
}

// Track user activity
document.addEventListener('mousemove', stopScreensaver);
document.addEventListener('mousedown', stopScreensaver);
document.addEventListener('keydown', stopScreensaver);
document.addEventListener('touchstart', stopScreensaver);

// Initialize timer on page load
window.addEventListener('load', () => {
  resetInactivityTimer();
});

document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const folderBg = document.getElementById('folder-bg');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // If link has target="_blank", let it open normally (Resume)
      if (this.getAttribute('target') === '_blank') {
        return;
      }
      
      e.preventDefault();
      
      const page = this.getAttribute('data-page');
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Hide all content and playground
      document.querySelectorAll('.content').forEach(content => {
        content.classList.add('hidden');
      });
      document.querySelectorAll('.playground-container').forEach(container => {
        container.classList.add('hidden');
      });
      
      // Show selected content/page
      const contentId = page + '-content';
      const selectedContent = document.getElementById(contentId);
      if (selectedContent) {
        selectedContent.classList.remove('hidden');
      }
      
      // Hide folder-bg on playground, show on other pages
      if (page === 'playground') {
        folderBg.classList.add('hidden');
      } else {
        folderBg.classList.remove('hidden');
      }
    });
  });
});
