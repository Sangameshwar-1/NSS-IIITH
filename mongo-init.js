db = db.getSiblingDB('nss_db');

// Create collections
db.createCollection('members');
db.createCollection('events');
db.createCollection('projects');
db.createCollection('sessions');

// Create indexes for performance
db.members.createIndex({ "email": 1 }, { unique: true });
db.members.createIndex({ "rollNumber": 1 }, { unique: true });
db.members.createIndex({ "createdAt": 1 });

db.events.createIndex({ "date": 1 });
db.events.createIndex({ "createdAt": 1 });

db.projects.createIndex({ "name": 1 });
db.projects.createIndex({ "createdAt": 1 });

db.sessions.createIndex({ "userId": 1 });
db.sessions.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

// Insert sample data (optional)
db.members.insertOne({
  name: "Dileepkumar Adari",
  email: "dileepkumar.adari@students.iiit.ac.in",
  rollNumber: "2022101007",
  team: "admin",
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date()
});

print("Database initialized successfully!");
print("Collections created: members, events, projects, sessions");
print("Indexes created for performance optimization");
