import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Stethoscope, Shield, Clock, Users, ArrowRight } from 'lucide-react';

function HomePage() {
    return (
        <div className="min-vh-100">
            {/* Hero Section */}
            <section className="py-5" style={{ background: 'linear-gradient(to bottom, #f0f6ff, #e4ecfc)' }}>
                <Container>
                    <div className="text-center">
                        <h1 className="display-4 fw-bold mb-4">
                            Get Expert Medical <span className="text-primary">Second Opinions</span>
                        </h1>
                        <p className="lead text-muted mb-5">
                            Connect with verified doctors and get professional medical consultations from the comfort of your home.
                            Your health deserves expert attention.
                        </p>
                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                            <Button as={Link} to="/register" variant="primary" size="lg" className="d-flex align-items-center">
                                Get Started <ArrowRight className="ms-2" />
                            </Button>
                            <Button as={Link} to="/doctors" variant="outline-secondary" size="lg">
                                Browse Doctors
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Features Section */}
            <section className="py-5 bg-white">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3">Why Choose MediConsult?</h2>
                        <p className="lead text-muted">Professional healthcare consultation made simple and secure</p>
                    </div>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        <Col className="text-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                                <Stethoscope className="text-primary" size={32} />
                            </div>
                            <h3 className="h5 fw-semibold mb-2">Expert Doctors</h3>
                            <p className="text-muted">Board-certified physicians with years of experience</p>
                        </Col>
                        <Col className="text-center">
                            <div className="bg-success bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                                <Shield className="text-success" size={32} />
                            </div>
                            <h3 className="h5 fw-semibold mb-2">Secure &amp; Private</h3>
                            <p className="text-muted">Your medical information is protected with enterprise-grade security</p>
                        </Col>
                        <Col className="text-center">
                            <div className="bg-warning bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                                <Clock className="text-warning" size={32} />
                            </div>
                            <h3 className="h5 fw-semibold mb-2">Quick Response</h3>
                            <p className="text-muted">Get expert opinions within 24-48 hours</p>
                        </Col>
                        <Col className="text-center">
                            <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px', backgroundColor: 'rgba(102, 16, 242, 0.1)' }}>
                                <Users style={{ color: 'rgb(102, 16, 242)' }} size={32} />
                            </div>
                            <h3 className="h5 fw-semibold mb-2">Trusted Platform</h3>
                            <p className="text-muted">Join thousands of satisfied patients and doctors</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* How It Works */}
            <section className="py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3">How It Works</h2>
                        <p className="lead text-muted">Simple steps to get expert medical advice</p>
                    </div>
                    <Row xs={1} md={3} className="g-4">
                        <Col className="text-center">
                            <div className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>
                                1
                            </div>
                            <h3 className="h5 fw-semibold mb-2">Submit Your Case</h3>
                            <p className="text-muted">Upload your medical history, symptoms, and relevant documents securely</p>
                        </Col>
                        <Col className="text-center">
                            <div className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>
                                2
                            </div>
                            <h3 className="h5 fw-semibold mb-2">Expert Review</h3>
                            <p className="text-muted">Qualified doctors review your case and provide professional insights</p>
                        </Col>
                        <Col className="text-center">
                            <div className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>
                                3
                            </div>
                            <h3 className="h5 fw-semibold mb-2">Get Results</h3>
                            <p className="text-muted">Receive detailed second opinions and recommendations for your health</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-6 bg-primary text-white">
                <Container className="text-center">
                    <h2 className="fw-bold display-6 mb-3">Ready to Get Started?</h2>
                    <p className="lead mb-5">
                        Join thousands of patients who trust MediConsult for their healthcare needs
                    </p>
                    <Button
                        as={Link}
                        to="/register"
                        variant="light"
                        size="lg"
                        className="d-inline-flex align-items-center rounded-3 px-5 py-3 text-primary fw-semibold"
                    >
                        Create Your Account <ArrowRight className="ms-2" size={20} />
                    </Button>
                </Container>
            </section>
        </div>
    );
}

export default HomePage;
