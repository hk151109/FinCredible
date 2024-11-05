import { Modal, Button, Form } from "react-bootstrap";
import {AiFillFileAdd, AiOutlineAreaChart} from "react-icons/ai"
import {HiDocumentRemove, HiOutlineDatabase} from "react-icons/hi"
import {BsFillTrashFill} from "react-icons/bs"
import {ImArrowUpRight2} from "react-icons/im"
import {ImArrowDownRight2} from "react-icons/im"
import { useState } from "react";
import { deleteShares } from "../../services/PortfolioServices";
import { editCurrentSharesDB } from "../../services/PortfolioServices";
import ChartHoldingPriceHistory from "../sharedComponents/ChartHoldingPriceHistroy";

const PortfolioSharesItem = ({heldShare, removeHeldSharesInCompany, removeSomeSharesInCompany, addSomeSharesInCompany }) => {
    
    const [showDelete, setShowDelete] = useState(false);
    const [showAddMoreHeldShares, setShowAddMoreHeldShares] = useState(false);
    const [showRemoveSomeHeldShares, setShowRemoveSomeHeldShares] = useState(false);
    const [sharesToRemove, setSharesToRemove] = useState(0)
    const [sharesToAdd, setSharesToAdd] = useState(0)
    const [pricePaid, setPricePaid] = useState(0)
    const [showChart, setShowChart] = useState(false)

    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowChart = () => setShowChart(true)
    const handleCloseChart = () => setShowChart(false)

    const handleShowAddMoreHeldShares = () => setShowAddMoreHeldShares(true);
    const handleCloseAddMoreHeldShares = () => setShowAddMoreHeldShares(false);

    const handleShowRemoveSomeHeldShares = () => setShowRemoveSomeHeldShares(true);
    const handleCloseRemoveSomeHeldShares = () => setShowRemoveSomeHeldShares(false);
    
    const handleNumberOfSharesToRemove = event => setSharesToRemove(event.target.value)

    const handleNumberOfSharesToAdd = event => setSharesToAdd(event.target.value)
    const handlePricePaid = event => setPricePaid(event.target.value)
    
    



    const handleDelete = () => {
        deleteShares(heldShare._id) //Delete from DB
        .then(() => {
            removeHeldSharesInCompany(heldShare._id) //Update State
        })
        handleCloseDelete()
    }


    
       

    

    const handleAdd = () => {
        const currTotalPaid = heldShare.avgPurchasePrice * heldShare.numberOfShares
        const newSharesTotal = Number(pricePaid) * Number(sharesToAdd)
        const newTotalPaid = newSharesTotal + currTotalPaid
        const newNumberOfShares = Number(heldShare.numberOfShares) + Number(sharesToAdd)
        const newAvgPrice = newTotalPaid / newNumberOfShares
        const newNumSharesNum = Number(newNumberOfShares.toFixed(2))
        const newAvgPriceNum = Number(newAvgPrice.toFixed(2))

        const shares = {
            numberOfShares: newNumSharesNum,
            avgPurchasePrice: newAvgPriceNum
        }
        if (pricePaid <= 0){
            return
        }else if (sharesToAdd <= 0){
            return
        }else{
            editCurrentSharesDB(heldShare._id, shares)
            .then(() => {
                addSomeSharesInCompany(heldShare._id, newNumSharesNum, newAvgPriceNum)
            })
            handleCloseAddMoreHeldShares()
            setSharesToAdd(0)
            setPricePaid(0)
        }}
    

    const handleRemove = () => {

        const newNumShares = heldShare.numberOfShares - sharesToRemove
        const shares = {
            numberOfShares: newNumShares
        }
        if (newNumShares <= 0){
            deleteShares(heldShare._id)
            .then(() => {
                removeHeldSharesInCompany(heldShare._id) //Update State
            })
        }else{
            editCurrentSharesDB(heldShare._id, shares)
            .then(() => {
                removeSomeSharesInCompany(heldShare._id, newNumShares)
            })
        }
        handleCloseRemoveSomeHeldShares()
        setSharesToRemove(0)

    }



    const calculateTotal = (number, value) => number * value
    let totalPaidPrice = calculateTotal(heldShare.numberOfShares,heldShare.avgPurchasePrice).toFixed(2)
    let totalValue = calculateTotal(heldShare.numberOfShares, heldShare.currentPrice).toFixed(2)

    const differencePurchaseCurrentValueNum = (purchase, current) => (current - purchase).toFixed(2)
    const differencePurchaseCurrentValuePrc = (purchase, current) => {
        const result = (((current-purchase)/purchase)*100).toFixed(2)
        return result
    }

    let profitOrLossTotal = Number(differencePurchaseCurrentValueNum(totalPaidPrice, totalValue)).toFixed(2)
    let profitOrLossPrc = Number(differencePurchaseCurrentValuePrc(totalPaidPrice, totalValue)).toFixed(2)













    return (  

        <>
            <tr>
                <td>
                    {heldShare.symbol}
                </td>
                <td>
                    {heldShare.name}
                </td>
                <td>
                    {heldShare.numberOfShares}
                </td>
                <td>
                    ${heldShare.avgPurchasePrice}
                </td>
                <td>
                    ${heldShare.currentPrice}
                </td>
                <td>
                    ${totalPaidPrice}
                </td>
                <td>
                    ${totalValue}
                </td>
                <td style={{color: Number(profitOrLossTotal) >= 0 ? "green" : "red"}}>
                 {Number(profitOrLossTotal) >= 0 ? <ImArrowUpRight2 /> : <ImArrowDownRight2 />} ${profitOrLossTotal} ({profitOrLossPrc}%)
                     
                </td>
                
                <td>
                <Button variant="info" onClick={handleShowChart}>
                 <AiOutlineAreaChart/>
                </Button>
                <Button variant="success" onClick={handleShowAddMoreHeldShares}>
                 <AiFillFileAdd />
                </Button>
                <Button variant="warning" onClick={handleShowRemoveSomeHeldShares}>
                <HiDocumentRemove />
                </Button>
                <Button variant="danger" onClick={handleShowDelete}>
                 <BsFillTrashFill/>
                </Button>
                </td>
                
            </tr>

            












            <Modal
            show={showChart}
            onHide={handleCloseChart}
            keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>{heldShare.name} ({heldShare.symbol})</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <ChartHoldingPriceHistory holdingData={heldShare} />

                
                </Modal.Body>

                <Modal.Footer>
                </Modal.Footer>
            </Modal>    

{/* -----------------------MODALS-------------------- */}
{/* ------------------------DELETE ALL SHARES IN A COMPANY--------------- */}
            <Modal
            show={showDelete}
            onHide={handleCloseDelete}
            backdrop="static"
            keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete your entire holding in {heldShare.name} ({heldShare.symbol})?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} variant="danger">
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


    {/* ----------------------------ADD MORE SHARES IN A HELD STOCK---------------- */}

        <Modal
            show={showAddMoreHeldShares}
            onHide={handleCloseAddMoreHeldShares}
            backdrop="static"
            keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Add More Shares in {heldShare.symbol}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Number of Shares Purchased</Form.Label>
                        <Form.Control onChange={handleNumberOfSharesToAdd} type="number" placeholder="Number of Shares" step="1" min="0" defaultValue="0"/>
                        <Form.Text className="text-muted">
                        <p>Current Number of Shares: {heldShare.numberOfShares}</p>
                        <p>New Number of Shares: {heldShare.numberOfShares + Number(sharesToAdd)}</p>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price Paid Per Share</Form.Label>
                        <Form.Control onChange={handlePricePaid} type="number"  placeholder="Price Paid" step="0.01" min="0" />
                        <Form.Text className="text-muted">
                        <p>Current Market Price: ${heldShare.currentPrice}</p>
                        <p>If Price Paid is Different to Current Market Value (Defaulted Value), Please Input the Price Paid.<br></br><br></br>
                        Current Average Price Paid: ${heldShare.avgPurchasePrice}</p>
                        </Form.Text>
                    </Form.Group>
                </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddMoreHeldShares}>
                        Cancel
                    </Button>
                    <Button  onClick={handleAdd} variant="success" type="submit">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>    



{/* --------------------------------REMOVE SHARES IN A HELD STOCK----------- */}



            <Modal
            show={showRemoveSomeHeldShares}
            onHide={handleCloseRemoveSomeHeldShares}
            backdrop="static"
            keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Remove Shares in {heldShare.symbol}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Number of Shares to Remove</Form.Label>
                        <Form.Control  onChange={handleNumberOfSharesToRemove} type="number" placeholder="Number" step="1" min="0" max={heldShare.numberOfShares}  defaultValue="0" />
                        <Form.Text className="text-muted">
                        <p>Current Number of Shares: {heldShare.numberOfShares}</p>
                        <p>Number of Shares After Removal: {heldShare.numberOfShares - sharesToRemove} </p>
                        </Form.Text>
                    </Form.Group>
                </Form>

                
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRemoveSomeHeldShares}>
                        Cancel
                    </Button>
                    <Button onClick={handleRemove} variant="danger" type="submit">
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>    








        </>
        

    );
    
}
export default PortfolioSharesItem;