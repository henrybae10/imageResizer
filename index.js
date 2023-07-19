const sharp = require('sharp');
const sizeOf = require('image-size');

const targetFiles = ['12345678.jpeg'];

const TARGET_WIDTH = 200;
const TARGET_HEIGHT = 200;

async function resizeImage(inputFile) {
	try {
		if (!inputFile.includes(".gif")) {
			const dimensions = await sizeOf("../" + inputFile);
			const imageWidth = dimensions.width;
			const imageHeight = dimensions.height;
		
			let resizedWidth = TARGET_WIDTH;
			let resizedHeight = TARGET_HEIGHT;
			if (TARGET_WIDTH >= imageWidth && TARGET_HEIGHT < imageHeight) {
				resizedWidth = imageWidth;
				resizedHeight = TARGET_HEIGHT;
			}
			else if (TARGET_WIDTH < imageWidth && TARGET_HEIGHT >= imageHeight) {
				resizedWidth = TARGET_WIDTH;
				resizedHeight = imageHeight;
			}
			else if (TARGET_WIDTH >= imageWidth && TARGET_HEIGHT >= imageHeight) {
				await sharp("../" + inputFile, { failOn: 'truncated'})
				.withMetadata()
				.toFile("../resi/" + inputFile);
			}
		
			await sharp("../" + inputFile, { failOn: 'truncated' })
			.resize(Number(resizedWidth), Number(resizedHeight))
			.jpeg()
			.withMetadata()
			.toFile("../resi/" + inputFile);
		}
		else {
			await sharp("../" + inputFile, { failOn: 'truncated', animated: true })
			.gif()
			.withMetadata()
			.toFile("../resi/" + inputFile);
		}
	} catch (err) {
	  console.error('Error resizing image:', inputFile);
	}
  }

for (var i = 0; i < targetFiles.length; i ++) {
	resizeImage(targetFiles[i]);
}
