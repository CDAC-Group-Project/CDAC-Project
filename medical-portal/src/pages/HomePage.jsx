import React from 'react';
import { Button, Card, Nav, Navbar, Form, Alert, Container, Row, Col } from 'react-bootstrap';

function HomePage() {
    return (
        <>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <h1 className='display-4'>Get Expert Medical <span>Second Opinions</span></h1>
                        <h1 className="display-4">Connect with verified doctors and get professional medical consultations from the</h1>
                        <p className="lead">comfort of your home. Your health deserves expert attention.</p>
                    </Col>
                    <Col md={1} className="text-center">
                        <Button variant="primary" size="lg" className="mt-3">
                            Get Started
                        </Button>
                    </Col>
                    <Col md={1} className="text-center">
                        <Button variant="secondary" size="lg" className="mt-3">
                            Learn More
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HomePage;