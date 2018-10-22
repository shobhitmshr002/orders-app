//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Order = require("../../models/order.model");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../index");
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe("Orders", () => {
    beforeEach((done) => { //Before each test we empty the database
        Order.remove({}, (err) => { 
            done();           
        });        
    });
    /*
    * Test the /GET route
    */
    describe("/GET order", () => {
        it("it should GET all the orders", (done) => {
            chai.request(server)
                .get("/orders")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});