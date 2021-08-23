export const cascadeSample = {
    CustomerID: 1,
    Amount: 60
}

export const overRideSample = {
    CustomerID: 2,
    Amount: 60,
    SeasonID: 2011
}

export const overPaidSample = {
    CustomerID: 3,
    Amount: 60
}


export const cascadeResult = [
    {
        id: 1,
        CustomerID: 1,
        SeasonID: 2011,
        TotalRepaid: 100,
        TotalCredit: 100,
        CustomerName: 'Hibo Jane',
        debt: 0
    },
    {
        id: 2,
        CustomerID: 1,
        SeasonID: 2012,
        TotalRepaid: 70,
        TotalCredit: 120,
        CustomerName: 'Hibo Jane',
        debt: 50
    }
]

export const overRideResult = [{
    id: 3,
    CustomerID: 2,
    SeasonID: 2011,
    TotalRepaid: 140,
    TotalCredit: 100,
    CustomerName: 'Joe Doe',
    debt: null,
    overPaid: 40
}]

export const overPaidResult = [{
    id: 6,
    CustomerID: 3,
    SeasonID: 2012,
    TotalRepaid: 180,
    TotalCredit: 120,
    CustomerName: 'Sagaton Vik',
    overPaid: 60
}]
