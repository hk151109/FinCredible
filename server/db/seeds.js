use portfolio;
db.dropDatabase();

db.shares.insertMany([
    
    {
        name: "Tesla Inc",
        symbol: "TSLA",
        purchaseDate: "2021-11-25",
        numberOfShares: 2,
        avgPurchasePrice: 1031.56
    },
    {
        name: "Amazon.com Inc",
        symbol: "AMZN",
        purchaseDate: "2021-02-01",
        numberOfShares: 5,
        avgPurchasePrice: 3224.28
    },
    {
        name: "NVIDIA Corporation",
        symbol: "NVDA",
        purchaseDate: "2021-03-31",
        numberOfShares: 2,
        avgPurchasePrice: 261.22
    },
    {
        name: "General Electric Company",
        symbol: "GE",
        purchaseDate: "2022-01-05",
        numberOfShares: 10,
        avgPurchasePrice: 250.63
    },
    {
        name: "Uber Technologies, Inc",
        symbol: "UBER",
        purchaseDate: "2022-01-05",
        numberOfShares: 123,
        avgPurchasePrice: 23.56
    },
    {
        name: "Moderna, Inc",
        symbol: "MRNA",
        purchaseDate: "2022-01-05",
        numberOfShares: 1,
        avgPurchasePrice: 400.67
    },
    {
        name: "Ford Motor Company",
        symbol: "F",
        purchaseDate: "2022-01-05",
        numberOfShares: 4,
        avgPurchasePrice: 29.32
    }
])