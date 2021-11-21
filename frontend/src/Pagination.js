import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class Pagination extends React.Component {
    render() {
        return (
            <Row className="justify-content-center text-center align-items-center" >
                <Col xs={3} sm={3} md={3} lg={2} xl={2} xxl={2}>
                    <Button className="w-100" variant="dark">Previous</Button>
                </Col>
                <Col className="" xs={6} sm={4} md={4} lg={6} xl={6} xxl={6}>
                    <p className="h-100 m-0">{this.props.title}</p>
                </Col>
                <Col xs={3} sm={3} md={3} lg={2} xl={2} xxl={2}>
                    <Button className="w-100" variant="dark">Next</Button>
                </Col>
            </Row>
        );
    }
}

export default Pagination;