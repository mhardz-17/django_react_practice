import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import Alert from "../../../components/Alert";

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: 'admin',
      password: 'pa55wor0',
      errorMsg: ''
    }
  }

  onClickLogin = () => {
    const {username, password} = this.state
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Request Body
    const body = JSON.stringify({username, password});

    axios.post(`api/auth/login/`, body, config)
      .then(response => {
        console.log('success')
        console.log(response)
        localStorage.setItem('django_react_user', response.data);
        // return this.props.router.push('/dashboard')
      }).catch(({response}) => {
      if (response.status == 400) {
        console.log(response)
        this.setState({errorMsg: response.data.non_field_errors})
      } else {
        this.setState({errorMsg: 'Server Error'})
      }
    })
  }

  handleOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onKeyPress = (e) => {
      if(e.key === 'Enter') {
        e.preventDefault();
        this.onClickLogin();
      }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {
                        this.state.errorMsg && <Alert color="danger">{this.state.errorMsg}</Alert>
                      }
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" name ='username' autoComplete="username" value={this.state.username} onChange={this.handleOnChange} onKeyPress={this.onKeyPress} />

                      </InputGroup>
                      {
                        this.state.errorMsg && <FormFeedback>{this.state.errorMsg}</FormFeedback>
                      }
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name='password' autoComplete="current-password" value={this.state.password} onChange={this.handleOnChange} onKeyPress={this.onKeyPress} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.onClickLogin}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
