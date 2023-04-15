const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const userData = {
    email : "admin01@gmail.com",
    username : "admin01",
    password : "admin12345"
}
// test api register
describe("POST /users/register", () => {

  afterAll(async () => {
    // destroy data users
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
  
  // succsess test
  it("Should be response 201", (done) => {
    request(app)
      .post("/users/register")
      .send({userData})
      .expect(201)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("username");
        expect(res.body).toHaveProperty("email");
        expect(res.body.username).toEqual(userData.username);
        expect(res.body.email).toEqual(userData.email);
        done();
      });
  });

  // error response
  it("Should be response 500", (done) => {
    request(app)
      .post("/users/register")
      .send({
        username: "admin",
        email: "admin@mail.com",
        password: "123456",
      })
      .expect(500)
      .end((err, res) => {
        if (err) done(err);

        done();
      });
  });

});

// login
describe("POST /users/login", () => {
  afterAll(async () => {
    // destroy data users
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });

  beforeAll(async () => {
    try {
      const result = await User.create({
        username: "admin",
        email: "admin@mail.com",
        password: "123456",
      });
    } catch (error) {
      console.log(error);
    }
  });

  it("Should response 200", (done) => {
    request(app)
      .post("/users/login")
      .send(userData)
      .expect(200)
      .end(function (err, res)  {
        if (err) {
            done(err)
        }
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("name")
        expect(res.body).toHaveProperty("devMessage")
        expect(res.body.name).toEqual("Login Error")
        expect(res.body).toHaveProperty("access_token");
        done();
      });
  });
});
