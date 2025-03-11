package main

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

// 3D 物件數據
type Object struct {
	ID         uint `gorm:"primaryKey"`
	Type       int  `gorm:"type:int"` // 使用整數表示物體類型
	Position_x int  `gorm:"type:int"` // 在資料庫中存儲為 float8[]
	Position_y int  `gorm:"type:int"`
	Position_z int  `gorm:"type:int"`
	Quadrant   int  `gorm:"type:int"`
}

const (
	Cube   = 1
	Sphere = 2
	Cone   = 3
	// 可以繼續擴展其他類型
)

func main() {
	// 連接資料庫
	var err error
	dsn := "host=localhost user=postgres password=s55660513 dbname=project port=5432 sslmode=disable"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Database connection failed")
	}
	db.AutoMigrate(&Object{}) // 自動創建表
	db.AutoMigrate(&Person{})
	seedObjects(db) // 產生隨機數據
	seedPersons(db)
	app := fiber.New()

	// 取得 3D 物件
	app.Get("/api/objects", func(c *fiber.Ctx) error {
		var objects []Object
		db.Find(&objects)
		return c.JSON(objects)
	})
	app.Get("/api/Person", func(c *fiber.Ctx) error {
		var Persons []Person
		db.Find(&Persons)
		return c.JSON(Persons)
	})

	// WebSocket
	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		for {
			_, msg, err := c.ReadMessage()
			if err != nil {
				break
			}
			log.Println("Received:", string(msg))
		}
	}))

	log.Fatal(app.Listen(":3000"))
}
func seedObjects(db *gorm.DB) {
	rand.Seed(time.Now().UnixNano())

	// **檢查是否已經有資料**
	var count int64
	db.Model(&Object{}).Count(&count)
	if count > 0 {
		fmt.Println("Database already seeded, skipping...")
		return
	}

	// **產生 10 筆隨機數據**
	for i := 0; i < 200; i++ {
		obj := Object{
			Type:       rand.Intn(3),   // 0: 方塊, 1: 球體, 2: 三角形
			Position_x: rand.Intn(100), // -100 ~ 100 之間
			Position_y: rand.Intn(100),
			Position_z: rand.Intn(100),
			Quadrant:   rand.Intn(4),
		}
		db.Create(&obj)
	}

	fmt.Println("Random objects inserted successfully.")
}
func seedPersons(db *gorm.DB) {
	rand.Seed(time.Now().UnixNano())

	// **檢查是否已經有資料**
	var count int64
	db.Model(&Person{}).Count(&count)
	if count > 0 {
		fmt.Println("Database already seeded, skipping...")
		return
	}

	// **產生 10 筆隨機數據**
	for i := 0; i < 10; i++ {
		person := Person{
			Naam:     fmt.Sprintf("Person %d", i),
			Leeftijd: rand.Intn(100),
			Adres:    fmt.Sprintf("Address %d", i),
			Telefoon: fmt.Sprintf("Phone %d", i),
		}
		db.Create(&person)
	}

	fmt.Println("Random persons inserted successfully.")
}
