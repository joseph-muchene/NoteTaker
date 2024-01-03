import { PrismaClient } from "@prisma/client";

const seedData = [
  {
    id: "1",
    userId: "83ff94639f93",
    note: "Meeting with clients at 3 PM",
    startDate: "2024-01-03",
    startTime: "15:00",
    endTime: "16:00",
    endDate: null,
    completed: false,
  },
  {
    id: "2",
    userId: "83ff94639f93",
    note: "Prepare presentation for team meeting",
    startDate: "2024-01-03",
    startTime: "09:00",
    endTime: "11:00",
    endDate: null,
    completed: false,
  },
  {
    id: "3",
    userId: "83ff94639f93",
    note: "Buy groceries on the way home",
    startDate: "2024-01-03",
    startTime: "17:30",
    endTime: "18:30",
    endDate: null,
    completed: false,
  },
  {
    id: "4",
    userId: "83ff94639f93",
    note: "Gym session at 6 AM",
    startDate: "2024-01-04",
    startTime: "06:00",
    endTime: "07:00",
    endDate: null,
    completed: false,
  },
  {
    id: "5",
    userId: "83ff94639f93",
    note: "Read chapter 5 for book club",
    startDate: "2024-01-05",
    startTime: "20:00",
    endTime: "21:00",
    endDate: null,
    completed: false,
  },
  {
    id: "6",
    userId: "83ff94639f93",
    note: "Plan weekend trip itinerary",
    startDate: "2024-01-06",
    startTime: "10:00",
    endTime: "12:00",
    endDate: null,
    completed: false,
  },
  {
    id: "7",
    userId: "83ff94639f93",
    note: "Call parents for their anniversary",
    startDate: "2024-01-07",
    startTime: "19:00",
    endTime: "20:00",
    endDate: null,
    completed: false,
  },
  {
    id: "8",
    userId: "83ff94639f93",
    note: "Update resume and LinkedIn profile",
    startDate: "2024-01-08",
    startTime: "14:00",
    endTime: "16:00",
    endDate: null,
    completed: false,
  },
  {
    id: "9",
    userId: "83ff94639f93",
    note: "Attend online course on JavaScript",
    startDate: "2024-01-09",
    startTime: "12:00",
    endTime: "14:00",
    endDate: null,
    completed: false,
  },
  {
    id: "10",
    userId: "83ff94639f93",
    note: "Movie night with friends at 7 PM",
    startDate: "2024-01-10",
    startTime: "19:00",
    endTime: "22:00",
    endDate: null,
    completed: false,
  },
];

async function seed() {
  const prisma = new PrismaClient();

  try {
    for (const note of seedData) {
      await prisma.note.create({
        data: note,
      });
    }

    console.log("Seed data has been inserted successfully");
  } catch (error) {
    console.log("Error seeding data: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
