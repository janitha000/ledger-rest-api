const { app } = require('../server');
const request = require('supertest');
const { Response_References: R, Response_Messages: M } = require('../utils/constants')
const { getLedger } = require('../controllers/leaseController')
const sinon = require("sinon");
const LeaseService = require('../services/leaseService')
const leaseService = new LeaseService();

const { generateToken } = require('../token-generation')


beforeAll(() => {
    token = generateToken();
    queryParams = {
        start_date: '2021-03-28T00:00:00.000Z',
        end_date: '2021-05-27T00:00:00.000Z',
        frequency: 'FORTNIGHTLY',
        weekly_rent: 555,
        timezone: "a"
    }

});

describe("Get leder line items", () => {
    test("Should return correct line items response", async () => {
        const res = await request(app)
            .get('/leases/ledger')
            .set('Authorization', 'Bearer ' + token)
            .query(queryParams)
        expect(res.status).toBe(200);
        expect(res.body.reference).toEqual(R.SUCCESS);
        expect(res.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ "amount": 1110, "endDate": "2021-04-10T00:00:00.000Z", "startDate": "2021-03-28T00:00:00.000Z" }),
                expect.objectContaining({ "amount": 1110, "endDate": "2021-04-24T00:00:00.000Z", "startDate": "2021-04-11T00:00:00.000Z" }),
                expect.objectContaining({ "amount": 1110, "endDate": "2021-05-08T00:00:00.000Z", "startDate": "2021-04-25T00:00:00.000Z" }),
                expect.objectContaining({ "amount": 1110, "endDate": "2021-05-22T00:00:00.000Z", "startDate": "2021-05-09T00:00:00.000Z" }),
                expect.objectContaining({ "amount": 396.43, "endDate": "2021-05-27T00:00:00.000Z", "startDate": "2021-05-23T00:00:00.000Z" }),
            ])
        )
    })
    // test("Should handle unhandled exceptions", async () => {
    //     sinon.stub(leaseService, "generateLease").throws()
    //     const res = await request(app)
    //         .get('/leases/ledger')
    //         .set('Authorization', 'Bearer ' + token)
    //         .query(queryParams)
    //     console.log(res.body)
    //     expect(res.status).toBe(500);
    //     expect(res.body.reference).toEqual(R.SUCCESS);
    // })
})

describe("JWT Token Authentication", () => {
    test("it should authorize when token is provided", async () => {
        sinon.spy(getLedger);
        const res = await request(app).get('/leases/ledger').set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(400);

    })
    test("it should return unauthorized when token is not valid", async () => {
        const res = await request(app).get('/leases/ledger').set('Authorization', 'Bearer ' + "INVALID_TOKEN");
        expect(res.status).toBe(401);
        expect(res.body.reference).toEqual(R.UNAUTHORIZED);
        expect(res.body.data.error).toEqual(M.INVALID_ACCESS_TOKEN);
    })
    test("it should return unauthorized when token is not provided", async () => {
        const res = await request(app).get('/leases/ledger');
        expect(res.status).toBe(401);
        expect(res.body.reference).toEqual(R.UNAUTHORIZED);
        expect(res.body.data.error).toEqual(M.NULL_ACCESS_TOKEN);
    })
})

describe("Get Ledger Request parameter validation", () => {
    test("it should give error when start_date not provided", async () => {
        sinon.stub(getLedger);

        let { start_date, ...rest } = queryParams
        const res = await request(app)
            .get('/leases/ledger')
            .set('Authorization', 'Bearer ' + token)
            .query(rest)
        expect(res.status).toBe(400);
        expect(res.body.reference).toEqual(R.BAD_REQUEST);
        expect(res.body.data.error).toEqual("\"start_date\" is required");
        // sinon.assert.neverCalledWith(getLedger)
    })
    test("it should give error when end_date not provided", async () => {
        let { end_date, ...rest } = queryParams
        const res = await request(app)
            .get('/leases/ledger')
            .set('Authorization', 'Bearer ' + token)
            .query(rest)
        expect(res.status).toBe(400);
        expect(res.body.reference).toEqual(R.BAD_REQUEST);
        expect(res.body.data.error).toEqual("\"end_date\" is required");

    })
    test("start_date, end_date should be valid date", async () => {
        let start_date = "2020-13-12"
        const res = await request(app)
            .get('/leases/ledger')
            .set('Authorization', 'Bearer ' + token)
            .query({ ...queryParams, start_date })
        expect(res.status).toBe(400);
        expect(res.body.reference).toEqual(R.BAD_REQUEST);
        expect(res.body.data.error).toEqual("\"start_date\" must be in ISO 8601 date format");
    })
    test("start_date, end_date should be a valid range", async () => {
        let start_date = "2021-05-27T00:00:00.000Z"
        let end_date = "2021-03-28T00:00:00.000Z"
        const res = await request(app)
            .get('/leases/ledger')
            .set('Authorization', 'Bearer ' + token)
            .query({ ...queryParams, start_date, end_date })
        expect(res.status).toBe(400);
        expect(res.body.reference).toEqual(R.BAD_REQUEST);
        expect(res.body.data.error).toEqual("\"end_date\" must be greater than or equal to \"ref:start_date\"");
    })
    test("frequency should be provided", async () => {
        let { frequency, ...rest } = queryParams
        const res = await request(app)
            .get('/leases/ledger')
            .set('Authorization', 'Bearer ' + token)
            .query(rest)
        expect(res.status).toBe(400);
        expect(res.body.reference).toEqual(R.BAD_REQUEST);
        expect(res.body.data.error).toEqual("\"frequency\" is required");
    })
    test("frequency should be valid category", async () => {
        let frequency = "YEARLY"
        const res = await request(app)
            .get('/leases/ledger')
            .set('Authorization', 'Bearer ' + token)
            .query({ ...queryParams, frequency })
        expect(res.status).toBe(400);
        expect(res.body.reference).toEqual(R.BAD_REQUEST);
        expect(res.body.data.error).toEqual("\"frequency\" must be one of [WEEKLY, FORTNIGHTLY, MONTHLY]");
    })
    test("weekly ren should be valid category", async () => {
        let weekly_rent = -100;
        const res = await request(app)
            .get('/leases/ledger')
            .set('Authorization', 'Bearer ' + token)
            .query({ ...queryParams, weekly_rent })
        expect(res.status).toBe(400);
        expect(res.body.reference).toEqual(R.BAD_REQUEST);
        expect(res.body.data.error).toEqual("\"weekly_rent\" must be greater than or equal to 1");
    })
})
