import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, FormGroup, Label, Input
} from 'reactstrap';

import todoData from './TodoData'
import TodoModal from './TodoModal'
import {AppSwitch} from "@coreui/react";
import {Button} from "reactstrap";

function TodoRow(props) {
  const {todo,index, onClickEdit} = props

  return (
    <tr key={todo.id.toString()}>
      <th scope="row">{parseInt(index) + 1}</th>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={todo.completed} /></td>
      <td>{todo.created_at}</td>
      <td>{todo.updated_at}</td>
      <td>
        <Row className="align-items-center">
          <Button size='sm' className={'mr-1'} onClick={ () => onClickEdit(todo)}><i className="fa fa-edit fa-lg"></i>Edit</Button>
          <Button size='sm' color='danger'><i className="fa fa-edit fa-lg"></i>Delete</Button>
        </Row>
      </td>
    </tr>
  )
}

class Todos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      action: '',
      todo: {}
    }
  }

  toggleModal = () => {
    this.setState({showModal: false,action: ''})
  }

  onClickEdit = (todo) => {
    console.log(todo)
    this.setState({showModal: true,action: 'edit',todo})
  }



  onSave = (todo) => {
    console.log('save')
  }

  render() {
    const todoList = todoData.filter((user) => user.id < 10)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Todos <small className="text-muted">List</small>
                <Button color='success float-right'>Add</Button>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Completed?</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Updated At</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todoList.map((todo, index) =>
                      <TodoRow key={index} index={index} todo={todo} onClickEdit={this.onClickEdit} />
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {
          this.state.showModal && <TodoModal todoItem={this.state.todo} toggleModal={this.toggleModal}  onSave={this.onSave} />
        }
      </div>
    )
  }
}

export default Todos;
