const server = require("./router/approuter");

const PORT = process.env.PORT || 8001;


server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Catch All Error Handler: Something went wrong",
	})
})

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
