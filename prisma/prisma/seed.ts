import { prisma } from "../lib/prisma";

async function seed() {
  await prisma.user.createMany({
    data: [
      { name: "Aarav Sharma", email: "aaravsharma491@gmail.com", age: 24, isMarried: false, nationality: "indian" },
      { name: "Riya Gupta", email: "riyagupta82@gmail.com", age: 21, isMarried: false, nationality: "indian" },
      { name: "Vihaan Singh", email: "vihaansingh203@gmail.com", age: 29, isMarried: true, nationality: "indian" },
      { name: "Ananya Verma", email: "ananyaverma614@gmail.com", age: 20, isMarried: false, nationality: "indian" },
      { name: "Kabir Kumar", email: "kabirkumar175@gmail.com", age: 26, isMarried: false, nationality: "indian" },
      { name: "Kiara Jain", email: "kiarajain907@gmail.com", age: 23, isMarried: false, nationality: "indian" },
      { name: "Arjun Patel", email: "arjunpatel338@gmail.com", age: 31, isMarried: true, nationality: "indian" },
      { name: "Myra Mehta", email: "myramehta56@gmail.com", age: 19, isMarried: false, nationality: "indian" },
      { name: "Reyansh Yadav", email: "reyanshyadav771@gmail.com", age: 27, isMarried: true, nationality: "indian" },
      { name: "Saanvi Agarwal", email: "saanviagarwal148@gmail.com", age: 22, isMarried: false, nationality: "indian" },
      { name: "Ishaan Sharma", email: "ishaansharma629@gmail.com", age: 28, isMarried: true, nationality: "indian" },
      { name: "Aadhya Gupta", email: "aadhyagupta94@gmail.com", age: 18, isMarried: false, nationality: "indian" },
      { name: "Krishna Singh", email: "krishnasingh502@gmail.com", age: 33, isMarried: true, nationality: "indian" },
      { name: "Navya Verma", email: "navyaverma817@gmail.com", age: 25, isMarried: false, nationality: "indian" },
      { name: "Aditya Kumar", email: "adityakumar266@gmail.com", age: 30, isMarried: true, nationality: "indian" },
      { name: "Rishav Patel", email: "rishavpatel419@gmail.com", age: 19, isMarried: false, nationality: "indian" },
      { name: "Diya Jain", email: "diyajain735@gmail.com", age: 21, isMarried: false, nationality: "indian" },
      { name: "Vivaan Mehta", email: "vivaanmehta880@gmail.com", age: 27, isMarried: true, nationality: "indian" },
      { name: "Aarohi Yadav", email: "aarohiyadav64@gmail.com", age: 23, isMarried: false, nationality: "indian" },
      { name: "Ira Agarwal", email: "iraagarwal952@gmail.com", age: 20, isMarried: false, nationality: "indian" }
    ]
  });
}

seed().then(() => prisma.$disconnect());