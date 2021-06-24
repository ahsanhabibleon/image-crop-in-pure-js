# image-crop-in-pure-js
The crop function can be called like so:

*As the function returns a Promise we can get the results like this:

	crop(url, outputWidth, outputHeight, outputX, outputY).then((img) => {
		document.body.appendChild(img)
	});

Or, using async/await:


	const canvas = await crop(url, outputWidth, outputHeight, outputX, outputY);
