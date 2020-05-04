import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
import AuthActions from "../../../Stores/Auth/Actions";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

function ValidationFeedback(props) {
  let {validationErrors, fieldname} = props

  // console.log(validationErrors)
  // console.log(validationErrors[fieldname])
  if (validationErrors && validationErrors[fieldname]) {
    return (
      <FormFeedback style={{display: 'block'}}>{validationErrors[fieldname][0]}</FormFeedback>
    )
  }
  return null
}

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      validationErrors:null
    }
  }

  onInputChange= e => {
    this.setState({form : {...this.state.form, [e.target.name] : e.target.value}})
  }

  submitRegistration = () => {
    const {form} = this.state
    let hasError = false;
    let errors =[];
    ['username','email','password'].map(f => {
      if(form[f] == '') {
        //capitalized the first letter of the field
        errors[f] = [f.charAt(0).toUpperCase() + f.slice(1) + ' is required.'];
        hasError = true;
      }
    })
    if(form.password != form.confirm_password) {
      errors['password'] = ['Password not match'];
      hasError = true;
    }

    if (hasError) {
      this.setState({validationErrors: errors})
      return
    }
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Request Body
    const body = JSON.stringify(form);

    axios.post(`api/auth/register`, body, config)
      .then(response => {
        // localStorage.setItem('django_react_user', response.data);
        this.props.registerSuccess(response.data)
        // return this.props.router.push('/dashboard')
      }).catch(({response}) => {
      if (response.status == 400) {
        this.setState({validationErrors: response.data})
        this.setState({validationErrors: response.data})
      } else {
        this.setState({errorMsg: 'Server Error'})
      }
    })
  }

  onKeyPress = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
    }
  }

  render() {
    const {form} = this.state

    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={(e) => e.preventDefault()} action="POST">
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name='username' placeholder="Username" autoComplete="username" value={form.username} onChange={this.onInputChange} />
                      <ValidationFeedback validationErrors={this.state.validationErrors} fieldname='username' />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" name='email' autoComplete="email" value={form.email} onChange={this.onInputChange}  />
                      <ValidationFeedback validationErrors={this.state.validationErrors} fieldname='email' />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" name='password' autoComplete="new-password" value={form.password} onChange={this.onInputChange}  />
                      <ValidationFeedback validationErrors={this.state.validationErrors} fieldname='password' />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" name='confirm_password' autoComplete="new-password" value={form.confirm_password} onChange={this.onInputChange}  />
                    </InputGroup>
                    <Button color="success" block onClick={this.submitRegistration}>Create Account</Button>
                    <Col className={'mt-3'}>
                        <Link to='/login'>Already have an account, Login</Link>
                    </Col>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  // auth: {name : '', isLoading: false, isAuthenticated: true},
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  registerSuccess: (payload) => dispatch(AuthActions.registerSuccess(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);
