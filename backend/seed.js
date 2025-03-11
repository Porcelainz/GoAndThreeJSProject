const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedData() {
  // 檢查是否已經有 Object 資料
  const objectCount = await prisma.object.count();
  if (objectCount === 0) {
    const objects = Array.from({ length: 200 }, (_, i) => ({
      type: Math.floor(Math.random() * 3),
      position_x: Math.floor(Math.random() * 100),
      position_y: Math.floor(Math.random() * 100),
      position_z: Math.floor(Math.random() * 100),
      quadrant: Math.floor(Math.random() * 4),
    }));
    await prisma.object.createMany({ data: objects });
    console.log("Inserted 200 random objects");
  }

  // 檢查是否已經有 Person 資料
  const personCount = await prisma.person.count();
  if (personCount === 0) {
    const persons = Array.from({ length: 10 }, (_, i) => ({
      naam: `Person ${i}`,
      leeftijd: Math.floor(Math.random() * 100),
      adres: `Address ${i}`,
      telefoon: `Phone ${i}`,
    }));
    await prisma.person.createMany({ data: persons });
    console.log("Inserted 10 random persons");
  }
}

seedData()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());