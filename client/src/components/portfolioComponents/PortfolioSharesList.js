import PortfolioSharesItem from "./PortfolioSharesItem";
import {Table} from 'react-bootstrap'
import './PortfolioSharesList.css'

const PortfolioSharesList = ({heldShares, removeHeldSharesInCompany, removeSomeSharesInCompany, addSomeSharesInCompany }) => {

    const portfolioSharesItems = heldShares.map((heldShare, index) => {
        return <PortfolioSharesItem heldShare={heldShare} key={index} removeHeldSharesInCompany={removeHeldSharesInCompany} removeSomeSharesInCompany={removeSomeSharesInCompany} addSomeSharesInCompany={addSomeSharesInCompany} />
    })



    return ( 

        <>
            <Table size="sm" striped hover   className="table">
            <thead className="table-dark" >
            <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th># Shares</th>
                <th>Avg. Price</th>
                <th>Current Price</th>
                <th>Total Paid Price</th>
                <th>Total Value</th>
                <th>P/L</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
                {portfolioSharesItems}
                </tbody>
            </Table>
        </>

     );
}
 
export default PortfolioSharesList;


