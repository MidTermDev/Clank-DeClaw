const puppeteer = require('puppeteer');
const path = require('path');

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const screenshots = [
    { url: 'https://declaws.com', name: 'hero', wait: 2000 },
    { url: 'https://declaws.com/#swap', name: 'swap', wait: 2000 },
    { url: 'https://declaws.com/browse', name: 'browse', wait: 3000 },
    { url: 'https://declaws.com/declaw/42', name: 'nft-detail', wait: 2000 },
    { url: 'https://declaws.com/rarity', name: 'rarity', wait: 2000 },
    { url: 'https://declaws.com/agent', name: 'agent', wait: 2000 },
  ];
  
  for (const shot of screenshots) {
    console.log(`Capturing ${shot.name}...`);
    await page.goto(shot.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, shot.wait));
    await page.screenshot({ 
      path: path.join(__dirname, `${shot.name}.png`),
      fullPage: false 
    });
  }
  
  await browser.close();
  console.log('Done!');
}

captureScreenshots().catch(console.error);
