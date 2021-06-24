/**
 * @url - Source of the image to use
 * @aspectRatio - The aspect ratio to apply
 * @outputX , @outputY - Should be negative numbers || 0
 */

const imageURL = document.getElementById('img').src;

const setProperty = (id, property, value) => {
	return document.getElementById(id)[property] = value
}

let cropped = false;
const cropImage = () => {
	if (!cropped) {
		const outputWidth = document.getElementById('output-width').value || 100;
		const outputHeight = document.getElementById('output-height').value || 100;
		const outputX = document.getElementById('crop-axis-x').value || 0;
		const outputY = document.getElementById('crop-axis-y').value || 0;
		//Arguments (imageUrl, outputWidth, outputHeight, outputX, outputY)
		crop(imageURL, outputWidth, outputHeight, outputX, outputY).then((img) => {
			setProperty('img', 'src', img.src)
		});
		cropped = true;
		setProperty('btn', 'innerHTML', 'Revert Image')
		setProperty('title', 'innerHTML', 'Cropped Image')
	} else {
		setProperty('img', 'src', imageURL)
		setProperty('btn', 'innerHTML', 'Crop Image')
		setProperty('title', 'innerHTML', 'Original Image')
		cropped = false
	}
}

// crop the source image at various aspect ratios. 
//Arguments (imageUrl, outputWidth, outputHeight, outputX, outputY)
const cropImg = function (url, outputWidth, outputHeight, outputX, outputY) {
	crop(url, outputWidth, outputHeight, outputX, outputY).then((canvas) => {
		document.body.appendChild(canvas)
	});
}

function crop(url, outputWidth = 100, outputHeight = 100, outputX = 0, outputY = 0) {
	return new Promise((resolve) => {
		// this image will hold our source image data
		const inputImage = new Image();
		inputImage.crossOrigin="anonymous"

		// we want to wait for our image to load
		inputImage.onload = () => {

			// create a canvas that will present the output image
			const outputImage = document.createElement('canvas');

			// set it to the same size as the image
			outputImage.width = outputWidth;
			outputImage.height = outputHeight;

			// draw our image at position 0, 0 on the canvas
			const ctx = outputImage.getContext('2d');
			ctx.drawImage(inputImage, outputX, outputY);

			//convert the canvas to image
			const imgUrl = outputImage.toDataURL('image/png');
			const img = document.createElement('img');
			img.src = `${imgUrl}`;

			//return the image
			resolve(img);
		};

		// start loading our image
		inputImage.src = url;
	});
}

