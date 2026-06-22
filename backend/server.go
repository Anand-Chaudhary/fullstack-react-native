package main

import (
	"log"
	"os"
	"todo/src"
)

func main() {
	app := src.SetupApp()

	port := os.Getenv("PORT")
	if port == "" {
		port = ":3000"
	} else {
		port = ":" + port
	}

	log.Println("Server Started on Port " + port)

	if err := app.Listen(port); err != nil {
		log.Fatal(err)
	}
}