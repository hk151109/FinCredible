import StockMarketItem from './StockMarketItem';
import { Table } from 'react-bootstrap';
import './StockMarket.css'


const StockMarketList = ({stocks}) => {

    console.log("StockMarketList", stocks);

    let stockItems

    if (stocks) {
        stockItems = stocks.map((stock, index) => {
            if (index > 100){
                return
            };
            return <StockMarketItem stock={stock} index={index} key={index}/>
        });
    };


    // table-striped
    return (
        <div>
            <Table size="sm" striped hover  className="table">
            <thead className="table-dark" >
            <tr>
                <th>Symbol</th>
                <th>Company name</th>
                <th>Average share price</th>
                <th>Sector</th>
                <th>Industry</th>
                <th>Country</th>
                <th>Add Position</th>
            </tr>
            </thead>
                <tbody>
                    {stockItems}
                </tbody>
            </Table>
        </div>
    );
};

export default StockMarketList;