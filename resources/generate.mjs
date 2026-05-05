import sharp from 'sharp';

await sharp('resources/icon-preview.svg')
  .resize(1024, 1024)
  .png()
  .toFile('resources/icon.png');
console.log('✓ icon.png');

await sharp('resources/splash-preview.svg')
  .resize(2732, 2732)
  .png()
  .toFile('resources/splash.png');
console.log('✓ splash.png');
