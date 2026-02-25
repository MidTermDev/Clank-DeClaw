const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS = [
  { name: '01-hero', url: 'https://declaws.com', waitFor: 2000 },
  { name: '02-gallery', url: 'https://declaws.com#gallery', scroll: 800, waitFor: 1500 },
  { name: '03-swap', url: 'https://declaws.com#swap', scroll: 1600, waitFor: 1500 },
  { name: '04-rarity', url: 'https://declaws.com/rarity', waitFor: 2000 },
  { name: '05-rarity-top10', url: 'https://declaws.com/rarity', scroll: 600, waitFor: 1500 },
  { name: '06-nft-page', url: 'https://declaws.com/declaw/420', waitFor: 2000 },
  { name: '07-nft-traits', url: 'https://declaws.com/declaw/69', waitFor: 2000 },
  { name: '08-agent', url: 'https://declaws.com/agent', waitFor: 2000 },
  { name: '09-agent-commits', url: 'https://declaws.com/agent', scroll: 500, waitFor: 1500 },
  { name: '10-github', url: 'https://github.com/MidTermDev/Clank-DeClaw', waitFor: 2000 },
];

async function captureScreenshots() {
  const outputDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  for (const shot of SCREENSHOTS) {
    console.log(`Capturing ${shot.name}...`);
    try {
      await page.goto(shot.url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      if (shot.scroll) {
        await page.evaluate((scrollY) => window.scrollTo(0, scrollY), shot.scroll);
      }
      
      await new Promise(r => setTimeout(r, shot.waitFor));
      
      await page.screenshot({
        path: path.join(outputDir, `${shot.name}.png`),
        type: 'png',
      });
      
      console.log(`  ✓ ${shot.name}.png saved`);
    } catch (err) {
      console.error(`  ✗ Error capturing ${shot.name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\nDone! Screenshots saved to:', outputDir);
}

captureScreenshots().catch(console.error);
