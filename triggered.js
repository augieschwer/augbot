// Commands:
//   triggered - Display a triggered image.

var triggers = [
    "http://i.imgur.com/avHnbUZ.gif",
    "https://media.giphy.com/media/vk7VesvyZEwuI/giphy.gif"
]

module.exports = function() {
	return triggers[Math.floor(Math.random() * triggers.length)];
}

