const metaJSON = [
	{ "src": "images/home/srcs/mug.svg", "title": "first pixel art" },
	{ "src": "images/home/srcs/shovel.svg", "title": "shovel" }
];
const mimages = document.getElementsByClassName("mimage");
var randomIndex = Math.floor(Math.random() * metaJSON.length);
for (var mimage of mimages) {
	mimage.setAttribute("src", metaJSON[randomIndex].src);
	mimage.setAttribute("title", metaJSON[randomIndex].title);
}