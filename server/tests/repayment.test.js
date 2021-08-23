import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { cascadeSample, cascadeResult, overPaidSample, overPaidResult, overRideSample, overRideResult } from "../mockTestData/data"

chai.use(chaiHttp);
chai.should();
const { expect } = chai;


describe("RepaymentUploads tests", () => {

    it("Any route to my app ", (done) => {
        chai.request(app).get("/dfgf").end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it("should return updated customer summaries(on Cascase)", (done) => {
        chai.request(app).post("/api/repayments").send(cascadeSample).end((err, res) => {
            res.should.have.status(200);
            expect(res.body.data).eql(cascadeResult);
            done();
        });
    });

    it("should return updated customer summaries(OverRide)", (done) => {
        chai.request(app).post("/api/repayments").send(overRideSample).end((err, res) => {
            res.should.have.status(200);
            expect(res.body.data).eql(overRideResult);
            done();
        });
    });

    it("should return updated customer summaries(OverPaid)", (done) => {
        chai.request(app).post("/api/repayments").send(overPaidSample).end((err, res) => {
            res.should.have.status(200);
            expect(res.body.data).eql(overPaidResult);
            done();
        });
    });

});