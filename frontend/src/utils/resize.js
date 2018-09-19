/*
 * This function resizes an image, I'll use it for resizing the profile pics.
*/

export default function resize(base64, maxWidth = 500, maxHeight = 500) {
	// Create and initialize two canvas
	const canvas = document.createElement("canvas")
	const ctx = canvas.getContext("2d")
	const canvasCopy = document.createElement("canvas")
	const copyContext = canvasCopy.getContext("2d")

	// Create original image
	const img = new Image()
	img.src = base64

	// Determine new ratio based on max size
	let ratio = 1
	if(img.width > maxWidth)
		ratio = maxWidth / img.width
	else if(img.height > maxHeight)
		ratio = maxHeight / img.height

	// Draw original image in second canvas
	canvasCopy.width = img.width
	canvasCopy.height = img.height
	copyContext.drawImage(img, 0, 0)

	// Copy and resize second canvas to first canvas
	canvas.width = img.width * ratio
	canvas.height = img.height * ratio
	ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height)
	return canvas.toDataURL()
}