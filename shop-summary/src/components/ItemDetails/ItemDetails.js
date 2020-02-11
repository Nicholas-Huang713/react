import React, {Component} from 'react';
import {Button, Collapse, Media, Col, Row} from 'react-bootstrap';

export default class ItemDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    render(){
        return(
           <div>
               <Button className="item-details-button" bsStyle="link" onClick={() => this.setState({open: !this.state.open})}>
                   {this.state.open === false ? `See` : `Hide`} item details
                   {this.state.open === false ? `+` : `-`}
               </Button>
               <Collapse in={this.state.open}>
                   <div>
                      
                           <Media> 
                               <img
                                    width={100}
                                    height={100}
                                    alt="thumbnail"
                                    src="https://cdn.shopify.com/s/files/1/0085/7597/5484/products/Multifunctional-3-in-1-Baby-Stroller-High-Landscape-Stroller-Folding-Carriage-Gold-Baby-Stroller-Newborn-Stroller.jpg_640x640_4_2000x.jpg?v=1576327560"
                                    />
                               <Media.Body>
                                  <p>Essentials by OFm Ess-3805 Racing Style Leather Gaming Chair, Red</p>
                                  <Row className="show-grid">
                                    <Col md={6}>
                                        <strong>{`$${this.props.price}`}</strong>
                                        <br/>
                                        <strong className="price-strike">{`$${this.props.price}`}</strong>
                                    </Col>
                                    <Col md={6}>Qty: 1</Col>
                                  </Row>
                               </Media.Body>
                           </Media>
                      
                   </div>
               </Collapse>
           </div> 
        )  
    }
  
}