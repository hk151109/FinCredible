import React, { useState } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import {AiFillFileAdd} from "react-icons/ai"
import { postNewShareAdd } from "../../services/PortfolioServices";
const StockMarketItem = ({stock}) => {


    const [showAddPosition, setShowAddPosition] = useState(false)
    const [newNumShares, setNewNumShares] = useState(0)
    const [newPriceShares, setNewPriceShares] = useState(0)
    const [date, setDate] = useState('')
    const handleShowAddPosition = () => setShowAddPosition(true)
    const handleCloseAddPosition = () => setShowAddPosition(false)

    const handleNewNumShares = event => setNewNumShares(event.target.value)
    const handleNewPriceShares = event => setNewPriceShares(event.target.value)

    const handleDate = event => setDate(event.target.value)




    const handleAddPositionSubmit = (event) => {
        event.preventDefault()
        const name = stock.companyName
        const symbol = stock.symbol
        const purchaseDate = date
        const numberOfShares = Number(newNumShares)
        const avgPurchasePrice = Number(newPriceShares)

        const shares = {
            name,
            symbol,
            purchaseDate,
            numberOfShares,
            avgPurchasePrice,
        }

        if (newNumShares <= 0){
            return
        }else if (newPriceShares <= 0){
            return
        }else if (purchaseDate == false){
            return
        }else{
        postNewShareAdd(shares)
        handleCloseAddPosition()
        setNewNumShares(0)
        setNewPriceShares(0)
        }




       
        
    }

    return (

        <>
        <tr>
            <td>{stock.symbol}</td>
            <td style={{width:'20%'}}>{stock.companyName}</td>
            <td>$ {stock.price}</td>
            <td>{stock.sector}</td>
            <td style={{width:'20%'}}>{stock.industry}</td>
            <td>{stock.country}</td>
            <td>
            <Button variant="success" onClick={handleShowAddPosition}>
                 <AiFillFileAdd />
                </Button>
            </td>
        </tr>

        <Modal
            show={showAddPosition}
            onHide={handleCloseAddPosition}
            backdrop="static"
            keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Add Position in {stock.symbol}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Number of Shares to Add</Form.Label>
                        <Form.Control onChange={handleNewNumShares} type="number" placeholder="Number of Shares" step="1" min="0"/>
                        <Form.Text className="text-muted">
                        <p>If Your Portfolio Already Contains this Stock, Please Add Additional Shares From the Portfolio Page </p>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price Paid Per Share</Form.Label>
                        <Form.Control onChange={handleNewPriceShares} type="number"  placeholder="Price"  step="0.01" min="0" />
                        <Form.Text className="text-muted">
                        <p>Current Market Value: ${stock.price}</p>
                        <p>If Price Paid is Different to Current Market Value (Defaulted Value), Please Input the Price Paid.</p>
                        
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Purchase Date</Form.Label>
                        <Form.Control onChange={handleDate} type="date"  />
                        <Form.Text className="text-muted">
                        <p>Date Purchased</p>
                        
                        </Form.Text>
                    </Form.Group>
                </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddPosition}>
                        Cancel
                    </Button>
                    <Button  onClick={handleAddPositionSubmit} variant="success" type="submit">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>    
</>


    )
};

export default StockMarketItem;
