import React from 'react';
import {Accordion, Button, Card, Row, Col, Form, Modal} from "react-bootstrap";
import ChartHoldingPriceHistory from '../sharedComponents/ChartHoldingPriceHistroy';
import {AiFillFileAdd} from "react-icons/ai"
import { postNewShareAdd } from "../../services/PortfolioServices";
import { useState } from 'react';


const FavouriteStock = ({favourite, stockPrices}) => {

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
        const name = favourite.companyName
        const symbol = favourite.symbol
        const purchaseDate = date
        const numberOfShares = Number(newNumShares)
        const avgPurchasePrice = Number(newPriceShares)

        const shares = {
            name,
            symbol,
            purchaseDate,
            numberOfShares,
            avgPurchasePrice
        }

        if (newNumShares <= 0) {
            return
        } else if (newPriceShares <= 0) {
            return
        } else if (purchaseDate == false) {
            return
        } else {
            postNewShareAdd(shares)
            handleCloseAddPosition()
            setNewNumShares(0)
            setNewPriceShares(0)
        }  
    }


    return (
        <div className="fav">
        <Card className='text-center' style={{width:'100%', margin:'auto'}}>
            <Card.Header><h3 style={{textAlign:'center'}}><b>{favourite.companyName}</b></h3>
            <Button variant="success" onClick={handleShowAddPosition}>
                 <AiFillFileAdd />
                </Button>
            </Card.Header>

            <Card.Body>
                <Row>
                    <Col xs={3}>
                    <img src={favourite.image} style={{width:'15%', margin:'auto'}}></img>
                    </Col>
                </Row>
                <Row >
                

                <Col className='text-center'>
                    <ul style={{listStyle:'none'}}>

                    <li><b>Symbol: </b>{favourite.symbol}</li>
                    <li><b>Current share price: </b>$ {favourite.currentSharePrice}</li>

                    {favourite.currentDayChange ? favourite.currentDayChange : null}

                    {favourite.change3Months ? favourite.change3Months : null}

                    <li><b>Last dividend: </b>{favourite.lastDiv}</li>
                    <li><b>Sector: </b>{favourite.sector}</li>
                    <li><b>Industry: </b>{favourite.industry}</li>
                    <li><b>Website: </b><a href={favourite.website}>{favourite.website}</a></li>


                    <li><b>Ceo: </b>{favourite.ceo}</li>
                    <li><b>Country: </b>{favourite.country}, <b>Currency: </b>{favourite.currency}</li>
                    <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b>Description: </b></Accordion.Header>
                        <Accordion.Body style={{height:'200px', overflowY:'scroll'}}>
                        {favourite.description}
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                    <li><br /></li>
                    <li><ChartHoldingPriceHistory holdingData={favourite}/></li>
                    </ul>
                </Col>
                </Row>
            </Card.Body>
        </Card>
        <br></br>


        <Modal
            show={showAddPosition}
            onHide={handleCloseAddPosition}
            backdrop="static"
            keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Add Position in {favourite.symbol}</Modal.Title>
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
                        <p>Current Market Value: ${stockPrices[0].open + stockPrices[0].change }</p>
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

        </div>
    )
};

export default FavouriteStock;