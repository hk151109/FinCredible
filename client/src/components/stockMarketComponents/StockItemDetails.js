import React from 'react';
import {Accordion, Button, Card, Row, Col, Modal, Form} from "react-bootstrap";
import ChartHoldingPriceHistory from '../sharedComponents/ChartHoldingPriceHistroy';
import {AiFillFileAdd} from "react-icons/ai"
import {MdCompare} from "react-icons/md"
import {BiTrendingDown, BiTrendingUp} from "react-icons/bi"
import { postNewShareAdd } from "../../services/PortfolioServices";
import { useState } from 'react';
import './StockMarket.css'

const StockItemDetails = ({addToFavourites, stockPrices, stockDetails}) => {

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
        const name = stockDetails.companyName
        const symbol = stockDetails.symbol
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

        if (newNumShares <= 0){
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

    const handleAddToFavourites = () => {
        const favourite = stockDetails
        favourite.currentSharePrice = (stockPrices[0].open + stockPrices[0].change).toFixed(2)
         
        {stockPrices[0].change >= 0 ?
            favourite.currentDayChange =
            <li style={{color:'#00b300'}}><b>Current day change: </b> $ {stockPrices[0].change} ({(stockPrices[0].change *100 /stockPrices[0].open).toFixed(2)} %) ▲ </li> :
            favourite.currentDayChange =
            <li style={{color:'red'}}><b>Current day change: </b> $ {stockPrices[0].change} ({(stockPrices[0].change *100 /stockPrices[0].open).toFixed(2)} %) ▼ </li>
        };

        {(stockPrices[0].close - stockPrices[64].close) >= 0 ?
            favourite.change3Months =
            <li style={{color:'#00b300'}}><b>Change since 3 months ago: </b> $ {(stockPrices[0].close - stockPrices[64].close).toFixed(2)} ({((stockPrices[0].close - stockPrices[64].close) *100 / stockPrices[64].close).toFixed(2)} %) ▲ </li> :
            favourite.change3Months =
            <li style={{color:'red'}}><b>Change since 3 months ago: </b> $ {(stockPrices[0].close - stockPrices[64].close).toFixed(2)} ({((stockPrices[0].close - stockPrices[64].close) *100 / stockPrices[64].close).toFixed(2)} %) ▼ </li>
        };
        // console.log("Before sending", favourite);
        addToFavourites(favourite)
    };



    return (
        <> 
        {stockDetails && stockPrices ? 
        <div className='card'>
        <Card  style={{width:'100%', margin:'auto'}}>
            <Card.Header>  <Button variant="success" onClick={handleShowAddPosition}>
                 <AiFillFileAdd />
                </Button> <h3 style={{textAlign:'center'}}><b>{stockDetails.companyName}</b>
            <Button variant="outline-primary" onClick={handleAddToFavourites} style={{marginLeft:'5%'}}> <MdCompare /> </Button></h3>
           
            </Card.Header>

            <Card.Body className='text-center'>
                <Row>
                    <Col xs={3}>
                    <img src={stockDetails.image} style={{width:'15%', margin:'auto'}}></img>
                    </Col>
                </Row>
                
                <Row>
                    <Col className='text-center'>
                    <ul style={{listStyle:'none'}}>

            
                    <li><b>Symbol: </b>{stockDetails.symbol}</li>
                    <li><b>Current share price: </b>$ {(stockPrices[0].open + stockPrices[0].change).toFixed(2)}</li>

                    {stockPrices[0].change >= 0 ?
                        <li style={{color:'#00b300'}}><b>Current day change: </b> $ {stockPrices[0].change} ({(stockPrices[0].change *100 /stockPrices[0].open).toFixed(2)} %) ▲ </li> :
                        <li style={{color:'red'}}><b>Current day change: </b> $ {stockPrices[0].change} ({(stockPrices[0].change *100 /stockPrices[0].open).toFixed(2)} %) ▼ </li>
                    }

                    {(stockPrices[0].close - stockPrices[64].close) >= 0 ?
                        <li style={{color:'#00b300'}}><b>Change since 3 months ago: </b> $ {(stockPrices[0].close - stockPrices[64].close).toFixed(2)} ({((stockPrices[0].close - stockPrices[64].close) *100 / stockPrices[64].close).toFixed(2)} %) ▲ </li> :
                        <li style={{color:'red'}}><b>Change since 3 months ago: </b> $ {(stockPrices[0].close - stockPrices[64].close).toFixed(2)} ({((stockPrices[0].close - stockPrices[64].close) *100 / stockPrices[64].close).toFixed(2)} %) ▼ </li>
                    }

                    <li><b>Last dividend: </b>{stockDetails.lastDiv}</li>
                    <li><b>Sector: </b>{stockDetails.sector}</li>
                    <li><b>Industry: </b>{stockDetails.industry}</li>
                    <li><b>Website: </b><a href={stockDetails.website}>{stockDetails.website}</a></li>

    

                    <li><b>Ceo: </b>{stockDetails.ceo}</li>
                    <li><b>Country: </b>{stockDetails.country}, <b>Currency: </b>{stockDetails.currency}</li>
                    <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b>Description: </b></Accordion.Header>
                        <Accordion.Body style={{height:'200px', overflowY:'scroll'}}>
                        {stockDetails.description}
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                    <li><br /></li>
                    <li><ChartHoldingPriceHistory holdingData={stockDetails}/></li>

                    </ul>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        
        </div>
        : null}

        

        <Modal
            show={showAddPosition}
            onHide={handleCloseAddPosition}
            backdrop="static"
            keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Add Position in {stockDetails.symbol}</Modal.Title>
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
                        <p>Current Market Value: $ {(stockPrices[0].open + stockPrices[0].change).toFixed(2)}</p>
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
    );
};

export default StockItemDetails;