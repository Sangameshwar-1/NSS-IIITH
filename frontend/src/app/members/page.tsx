import React from "react";
import MembersSection from "@/components/team/MembersSection";
// import { getMembersFromDB } from "@/graphql_Q&M/getMembers";
import Footer from "@/utils/Footer";
import Navbar from "@/utils/Navbar";

export default async function MembersPage() {
//   let members = [];
//   try {
//     const rawMembers = await getMembersFromDB();
//     members = rawMembers.map((doc: any) => ({
//       id: doc._id?.toString() ?? "",
//       email: doc.email ?? "",
//       name: doc.name ?? "",
//       photoUrl: doc.photoUrl ?? "",
//       team: doc.team ?? "",
//       rollNumber: doc.rollNumber ?? "",
//       status: doc.status === "active" ? "active" : "inactive" as "active" | "inactive",
//       from: doc.from ?? "",
//       to: doc.to ?? "",
//     }));
//   } catch (error) {
//     console.error("Error fetching members:", error);
//     members = [];
//   }

  // Mock data with firstname.lastname IDs
  const members = [
    {
      id: "akshay.chanda",
      email: "chanda.kumar@students.iiit.ac.in",
      name: "Akshay Chanda",
      photoUrl: "hi",
      team: "Tech",
      rollNumber: "2024102014",
      status: "active" as "active",
      from: "2021",
      to: "2025",
    },
    {
      id: "sangameshwar.sale",
      email: "sangameshwar.sale@students.iiit.ac.in",
      name: "Sangameshwar Sale",
      photoUrl: "",
      team: "Tech",
      rollNumber: "2024102017",
      status: "active" as "active",
      from: "2025",
      to: "_",
    },
    {
      id: "aditi.sharma",
      email: "aditi.sharma@students.iiit.ac.in",
      name: "Aditi Sharma",
      photoUrl: "hi",
      team: "Design",
      rollNumber: "2023001",
      status: "active" as "active",
      from: "2023",
      to: "2027",
    },
    {
      id: "rahul.verma",
      email: "rahul.verma@students.iiit.ac.in",
      name: "Rahul Verma",
      photoUrl: "",
      team: "Events",
      rollNumber: "2022005",
      status: "active" as "active",
      from: "2022",
      to: "2026",
    },
    {
      id: "priya.singh",
      email: "priya.singh@students.iiit.ac.in",
      name: "Priya Singh",
      photoUrl: "",
      team: "Tech",
      rollNumber: "2023010",
      status: "active" as "active",
      from: "2023",
      to: "2027",
    },
    {
      id: "neha.patel",
      email: "neha.patel@students.iiit.ac.in",
      name: "Neha Patel",
      photoUrl: "hi",
      team: "Design",
      rollNumber: "2021008",
      status: "inactive" as "inactive",
      from: "2021",
      to: "2024",
    },
    {
      id: "vikram.reddy",
      email: "vikram.reddy@students.iiit.ac.in",
      name: "Vikram Reddy",
      photoUrl: "",
      team: "Events",
      rollNumber: "2022012",
      status: "active" as "active",
      from: "2022",
      to: "2026",
    },
    {
      id: "rithik.palla",
      email: "rithik.palla@students.iiit.ac.in",
      name: "Rithik Reddy Palla",
      photoUrl: "",
      team: "Tech",
      rollNumber: "2024102005",
      status: "active" as "active",
      from: "2022",
      to: "2026",
    }
  ];

  return (
    <>
      <div
        style={{
          margin: 0,
          paddingTop: "calc(64px + 2vw)",
          paddingRight: "clamp(0.5rem, 2vw, 2rem)",
          paddingLeft: "clamp(0.25rem, 1vw, 1rem)",
          boxSizing: "border-box",
          width: "100%",
          minHeight: "100vh",
          overflowX: "hidden",
          background: "#FAEBE8"
        }}
      >
        <Navbar />
        <MembersSection members={members} />
      </div>
      <Footer />
    </>
  );
}
