package main

import(
	"log"
	"os"
	"todo/src"
)

func main(){
	app := src.SetupApp()

	port := os.Getenv("PORT") || ":3000"
	log.Println("Server Started on Port" + port)
	app.Listen(port)
}
