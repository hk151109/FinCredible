import React, {useState} from 'react';

const StockMarketSearch = ({stocks, handleSearchedStock}) => {

    const [stockOptions, setStockOptions] = useState([]);

    const handleSearchResult = (searchedValue) => {
        const result = stocks.filter(stock => {
            if (stock.symbol.toLowerCase().startsWith(searchedValue.toLowerCase())){
                return true;
            } else if (stock.companyName.toLowerCase().startsWith(searchedValue.toLowerCase())){
                return true;
            };
        });
        setStockOptions(result.slice(0, 10));
    };

    const handleSearchChange = (event) => {
        event.preventDefault();

        if (event.target.value.length >= 2) {
            handleSearchResult(event.target.value)
        } else {
            setStockOptions([]);
        };
    };

    const handleEnter = (event) => {
        event.preventDefault();
        handleSearchedStock(event.target.value)
        console.log("I am handleClick", event.target.value);
    };
    



    const displayOptions = stockOptions.map((stockOption, index) => {
        return <option value={stockOption.symbol} key={index}>{stockOption.companyName}</option>
    });

    return (
        <div style={{textAlign:'center'}}>
            <label>
            <input className='searchbox' style={{width:'200px', margin:'10px'}} 
                onChange={handleSearchChange} 
                onKeyDown = {event => event.key == "Enter" ? handleEnter(event) : null}
                list="browsers" name="browser" autoComplete="off" placeholder="Search by name or symbol"
            />
            </label>
            <datalist id="browsers">
                {displayOptions}
            </datalist>
        </div>
    );
};

export default StockMarketSearch;