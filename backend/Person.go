package main

type Person struct {
	ID       uint   `gorm:"primaryKey"`
	Naam     string `gorm:"type:varchar(100)"`
	Leeftijd int    `gorm:"type:int"`
	Adres    string `gorm:"type:varchar(100)"`
	Telefoon string `gorm:"type:varchar(100)"`
}

// 設定表名為 "person"
func (Person) TableName() string {
	return "person"
}
