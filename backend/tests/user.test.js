const request = require("supertest");
const { expect } = require("chai");
const mongoose = require('mongoose');
const app = require("../app"); // Import the Express app

// Set global Mocha timeout
// This is an alternative to setting timeout via command line
// You can use this OR the command line option
describe("User API Tests", () => {
  let testEmail = `unit${Date.now()}@test.com`;
  
  // Connect to the test database before running tests
  before(async function() {
    // Set longer timeout for this hook specifically
    this.timeout(20000); // give DB time to connect
    
    await mongoose.connect('mongodb://127.0.0.1:27017/campaignQA_db_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to test database');
  });

  // Close database connection after tests
  after(async function() {
    await mongoose.connection.close();
    console.log('Database connection closed');
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Unit Test User", email: testEmail });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("name", "Unit Test User");
    expect(res.body).to.have.property("email", testEmail);
  });

  it("should fetch all users and include the new user", async () => {
    const res = await request(app).get("/api/users");
    
    expect(res.status).to.equal(200);
    const user = res.body.find(u => u.email === testEmail);
    expect(user).to.exist;
  });
});