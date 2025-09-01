const request = require("supertest");
const { expect } = require("chai");
const mongoose = require('mongoose');
const app = require("../app"); // Import the Express app
let server;

// Set global Mocha timeout
describe("User API Tests", function() {
  this.timeout(30000); // Set global timeout to 30 seconds for all tests in this suite
  
  let testEmail = `unit${Date.now()}@test.com`;
  
  // Connect to the test database before running tests
  before(async function() {
    // Connect using localhost (works in GitHub Actions)
    await mongoose.connect("mongodb://localhost:27017/campaignQA_db_test", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to test database');
    
    // Start the server for testing
    server = app.listen(5001); // Use a different port than your main app
  });

  // Close database connection after tests
  after(async function() {
    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    // Close the server if it exists
    if (server) server.close();
    console.log('Server closed');
  });

  it("should register a new user", async function() {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Unit Test User", email: testEmail });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("name", "Unit Test User");
    expect(res.body).to.have.property("email", testEmail);
  });

  it("should fetch all users and include the new user", async function() {
    const res = await request(app).get("/api/users");
    
    expect(res.status).to.equal(200);
    const user = res.body.find(u => u.email === testEmail);
    expect(user).to.exist;
  });
});