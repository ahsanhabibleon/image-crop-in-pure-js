# image-crop-in-pure-js
The crop function can be called like so:


crop("path/to/our/image.jpeg", 1);

Or, to get a “16:9” crop:

crop("path/to/our/image.jpeg", 16 / 9);

As the function returns a Promise we can get the results like this:


crop("path/to/our/image.jpeg", 16 / 9).then((canvas) => {

  // `canvas` is the resulting image
  
});

Or, using async/await:


const canvas = await crop("path/to/our/image.jpeg", 16 / 9);
