const LeaseService = require('../services/leaseService')
const leaseService = new LeaseService();
const moment = require('moment-timezone')
const { Frequency: F } = require('../utils/constants')
const sinon = require("sinon");
const { HandledError } = require('../utils/errorUtil');





describe("Calculate Line Item Amount", () => {
    test("it should return correct amount for WEEKLY", () => {
        expect(leaseService.getAmountValue(500, { accumalatorType: 'week', accumalotorValue: 1 })).toEqual(500)
    })
    test("it should return correct amount for FORTNIGHTLY", () => {
        expect(leaseService.getAmountValue(500, { accumalatorType: 'week', accumalotorValue: 2 })).toEqual(1000)
    })
    test("it should return correct amount for MONTHLY", () => {
        sinon.spy(leaseService, "getMonthlyAmount");
        expect(leaseService.getAmountValue(500, { accumalatorType: 'month', accumalotorValue: 1 })).toEqual(2172.62)
        expect(leaseService.getMonthlyAmount.calledOnce).toBe(true)
    })
    test("it should return null amount for value that does not exist", () => {
        expect(leaseService.getAmountValue(500, { accumalatorType: 'year', accumalotorValue: 1 })).toEqual(null)
    })

});

describe("Calculate Monthly Amount", () => {
    test("it should return correct monthly amount", () => {
        expect(leaseService.getMonthlyAmount(1000)).toEqual(4345.24)
    })
    test("it should return correct monthly amount", () => {
        expect(leaseService.getMonthlyAmount(500)).toEqual(2172.62)
    })
    test("it should throw correct exception when weekly rent not provided", () => {
        expect(() => leaseService.getMonthlyAmount()).toThrow()
        expect(() => leaseService.getMonthlyAmount()).toThrow(HandledError)
        expect(() => leaseService.getMonthlyAmount()).toThrow('Invalid weekly amount')
    })
});

describe("Calculate Amount for Remaining Days", () => {
    let obj = { startDate: moment('2021-01-01T00:00:00.000Z'), endDate: moment('2021-01-03T00:00:00.000Z'), "amount": 214.29 }
    let weeklyRent = 500;
    test("it should calculate correct amount", () => {
        expect(leaseService.getLeaseValueForRemainingDays(obj.startDate, obj.endDate, weeklyRent)).toEqual(obj)
    })
    test("it should return null when start date not given", () => {
        expect(leaseService.getLeaseValueForRemainingDays(undefined, obj.endDate, weeklyRent)).toEqual(null)
    })
    test("it should return null when end date not given", () => {
        expect(leaseService.getLeaseValueForRemainingDays(obj.startDate, undefined, weeklyRent)).toEqual(null)
    })
    test("it should return null when weekly rent not given", () => {
        expect(leaseService.getLeaseValueForRemainingDays(obj.startDate, obj.endDate, undefined)).toEqual(null)
    })
    test("it should return null when weekly rent is not a number", () => {
        expect(leaseService.getLeaseValueForRemainingDays(obj.startDate, obj.endDate, "STRING_VALUE")).toEqual(null)
    })

});

describe("Get Correct Accumalator Object based on Frequencly", () => {
    test("it should return correct Accumalator Object for WEEKLY", () => {
        expect(leaseService.getAccumalatorObj(F.WEEKLY)).toEqual({ accumalatorType: 'week', accumalotorValue: 1 })
    })
    test("it should return correct Accumalator Object for FORTNIGHTLY", () => {
        expect(leaseService.getAccumalatorObj(F.FORTNIGHTLY)).toEqual({ accumalatorType: 'week', accumalotorValue: 2 })
    })
    test("it should return correct Accumalator Object for MONTHLY", () => {
        expect(leaseService.getAccumalatorObj(F.MONTHLY)).toEqual({ accumalatorType: 'month', accumalotorValue: 1 })
    })
    test("it should return empty Accumalator Object for other values", () => {
        expect(leaseService.getAccumalatorObj("WRONG_FREQ")).toEqual({})
    })
});

describe("Get Correct Line Items", () => {
    let mainStartDate = '2020-03-28T00:00:00.000Z';
    let mainEndDate = '2021-05-27T00:00:00.000Z';
    let weeklyRent = 555;
    let accumalatorObj = { accumalatorType: 'week', accumalotorValue: 2 }

    test("it should return correct Accumalator Object for WEEKLY", () => {
        expect(leaseService.generateLease(mainStartDate, mainEndDate, F.FORTNIGHTLY, weeklyRent)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ "startDate": "2020-03-28T00:00:00.000Z", "endDate": "2020-04-10T00:00:00.000Z", "amount": 1110 }),
                expect.objectContaining({ "startDate": "2020-04-11T00:00:00.000Z", "endDate": "2020-04-24T00:00:00.000Z", "amount": 1110 }),
                expect.objectContaining({ "startDate": "2020-04-25T00:00:00.000Z", "endDate": "2020-05-08T00:00:00.000Z", "amount": 1110 }),
                expect.objectContaining({ "startDate": "2020-05-09T00:00:00.000Z", "endDate": "2020-05-22T00:00:00.000Z", "amount": 1110 }),
                // expect.objectContaining({ "startDate": "2020-05-23T00:00:00.000Z", "endDate": "2020-05-27T00:00:00.000Z", "amount": 1110 }),
            ])
        )

    })
    // test("it should throw Handled Exception when mainStartDate is empty", () => {
    //     expect(() => leaseService.generateLease("", mainEndDate, F.FORTNIGHTLY, weeklyRent)).toThrow()
    //     expect(() => leaseService.generateLease(mainStartDate, mainEndDate, F.FORTNIGHTLY, "")).toThrow(HandledError)
    //     expect(() => leaseService.generateLease(mainStartDate, mainEndDate, F.FORTNIGHTLY, "")).toThrow('Failed on amount calculation')
    // })
    test("it should throw Handled Exception when weekly rent is empty", () => {
        expect(() => leaseService.generateLease(mainStartDate, mainEndDate, F.FORTNIGHTLY, "")).toThrow()
        expect(() => leaseService.generateLease(mainStartDate, mainEndDate, F.FORTNIGHTLY, "")).toThrow(HandledError)
        expect(() => leaseService.generateLease(mainStartDate, mainEndDate, F.FORTNIGHTLY, "")).toThrow('Failed on amount calculation')
    })

});



