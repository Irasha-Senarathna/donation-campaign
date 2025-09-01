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
    try {
      // Add retry logic for MongoDB connection
      let retries = 5;
      let connected = false;
      
      while (retries > 0 && !connected) {
        try {
          console.log(`Connecting to MongoDB (attempts left: ${retries})...`);
          await mongoose.connect("mongodb://localhost:27017/campaignQA_db_test", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // 5 second timeout for server selection
          });
          connected = true;
          console.log('Connected to test database successfully!');
        } catch (err) {
          console.log(`MongoDB connection failed: ${err.message}`);
          retries -= 1;
          if (retries === 0) throw err;
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      // Start the server for testing
      server = app.listen(5001); // Use a different port than your main app
      console.log('Test server started on port 5001');
    } catch (err) {
      console.error('Test setup failed:', err);
      throw err;
    }
  });

  // Close database connection after tests
  after(async function() {
    try {
      // Only close if connection is open
      if (mongoose.connection && mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log('Database connection closed');
      }
      
      // Close the server if it exists
      if (server) {
        await new Promise(resolve => server.close(resolve));
        console.log('Server closed');
      }
    } catch (err) {
      console.error('Error during cleanup:', err);
    }
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