import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col, Form,
  FormGroup, FormText,
  Input,
  Label, Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table
} from 'reactstrap';
import {AppSwitch} from "@coreui/react";

class TodoModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todoItem: props.todoItem
    }
  }

    onInputChange = (e) => {
    let todo = this.state.todoItem, value=e.target.value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    todo[e.target.name] = value
    this.setState({todoItem : {...todo}})
  }

  render() {
    const {todoItem} = this.state
    const {toggleModal, onSave} = this.props
    return (
      <Modal isOpen={true} toggle={toggleModal} className='primary'>
        <ModalHeader toggle={toggleModal}>{todoItem.id ? 'Edit Todo' : 'Add Todo'}</ModalHeader>
        <ModalBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                  <Label htmlFor="title">Title</Label>
                </Col>
                <Col xs="12" md="9">
                 <Input type="text" id="title" name='title' placeholder="Enter todo title" value={todoItem.title} required
                       onChange={this.onInputChange}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md="3">
                  <Label htmlFor="description">Description</Label>
                </Col>
                <Col xs="12" md="9">
                 <Input type="textarea" id="description" name='description' placeholder="Enter todo description" value={todoItem.description} required
                       onChange={this.onInputChange} rows={5}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md="3">
                  <Label htmlFor="description">Completed</Label>
                </Col>
                <Col xs="12" md="9">
                  <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={todoItem.completed} onChange={this.onInputChange} />
                </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary"
                  onClick={() => onSave(this.state.todoItem)}>{todoItem.id ? 'Update' : 'Save'}</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default TodoModal;
