package src

import (
	"log"
	"todo/src/db"
	"todo/src/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func SetupApp() *fiber.App {
	log.Println("Creating Fiber app")

	app := fiber.New()

	_ = godotenv.Load()

	log.Println("Connecting to DB")
	db.ConnectDB()

	log.Println("Registering routes")

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Welcome To Todo made with fiber")
	})

	routes.AuthRoutes(app)
	routes.TodoRoutes(app)

	log.Println("Setup complete")

	return app
}