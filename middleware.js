function errorHandler(err, req, res, next) {
	switch (err.code) {
		case 404:
			res.status(404).json({
				message: "That file doesn't exist",
			});
		case 400:
			res.status(400).json({
				message: "Incomplete information in the request object",
			});
		default:
			console.error(err);
			res.status(500).json({
				message: "Something went wrong with the server, try again",
			});
			break;
	}
}

module.exports = errorHandler;
