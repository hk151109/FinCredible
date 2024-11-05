import {apikey} from './apikey';


export const getCurrentStocks = () => {

    return fetch(`https://financialmodelingprep.com/api/v3/stock-screener?marketCapLowerThan=10000000000000&betaMoreThan=1&volumeMoreThan=100&exchange=NYSE,NASDAQ&apikey=${apikey}`)
    .then(res => res.json());
};

// export const getStockItemDetails = (symbol) => {
//     const url = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apikey}`
//     debugger
//     return fetch(url)
//     .then(res => {
//         debugger
//         console.log(res.json())})
//     .then(res => res.json());
// };