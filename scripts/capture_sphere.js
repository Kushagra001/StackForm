const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set a good desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  
  const url = 'https://www.stack-form.dev/';
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle' });
  
  // Wait for the Spline 3D canvas to load and the loader to disappear
  console.log('Waiting for Spline scene to load...');
  await page.waitForTimeout(5000); // Wait 5 seconds for full load and animation
  
  // Find the canvas inside the hero section's right column
  // Let's locate the canvas or the container
  const heroRight = page.locator('#hero canvas');
  
  if (await heroRight.count() > 0) {
    console.log('Canvas found. Capturing screenshot of the 3D sphere canvas...');
    const outputPath = path.join(__dirname, '..', 'public', 'sphere-fallback.png');
    
    // We want the transparent canvas or the container
    // To make sure it has a transparent background, we capture the canvas element directly
    await heroRight.first().screenshot({
      path: outputPath,
      omitBackground: true, // Transparent background!
    });
    
    console.log(`Successfully saved high-quality fallback to ${outputPath}`);
  } else {
    console.log('Canvas not found! Let us try capturing the whole right column of the hero.');
    const sceneContainer = page.locator('#hero > div > div:nth-child(2)');
    if (await sceneContainer.count() > 0) {
      const outputPath = path.join(__dirname, '..', 'public', 'sphere-fallback.png');
      await sceneContainer.first().screenshot({
        path: outputPath,
        omitBackground: true,
      });
      console.log(`Successfully saved scene container to ${outputPath}`);
    } else {
      console.error('Could not find any suitable 3D elements to screenshot.');
    }
  }
  
  await browser.close();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
