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
import Alert from "../../components/Alert"
import Swal from "sweetalert2";
import {tokenConfig} from "../../Stores/Auth/Actions";

var moment = require('moment/moment');


function TodoRow(props) {
  const {todo,index, onClickEdit, toggleTodoStatus} = props

  const onClickDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        props.onClickDelete(props.todo.id);
      }
    })
  }

  return (
    <tr key={todo.id.toString()} className={'todo-' + todo.id}>
      <th scope="row">{parseInt(index) + 1}</th>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={todo.completed} onClick={() => toggleTodoStatus(todo)} /></td>
      <td>{moment(todo.created_at).format('YYYY-MM-DD HH:mm')}</td>
      <td>{moment(todo.updated_at).format('YYYY-MM-DD HH:mm')}</td>
      <td>
        <Row className="align-items-center">
          <Button size='sm' className={'mr-1'} onClick={ () => onClickEdit(todo)}><i className="fa fa-edit fa-lg"></i>Edit</Button>
          <Button size='sm' color='danger' onClick={onClickDelete}><i className="fa fa-edit fa-lg"></i>Delete</Button>
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
      todos:[],
      todo: {},
      message: ''
    }
  }

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos =(page) => {
    axios.get('api/todos',tokenConfig())
      .then(response => {
        this.setState({todos: response.data})
      })
  }

  toggleModal = () => {
    this.setState({showModal: false,action: ''})
  }


  onClickAdd = () => {
    this.setState({showModal: true,action: 'add',todo:{}})
  }

  onClickEdit = (todo) => {
    this.setState({showModal: true,action: 'edit',todo})
  }

  onSave = (todo, cb) => {
    if (todo.id) { //means edit
      axios.post(`api/todos/{todo.id}`, todo,tokenConfig())
        .then(response => {
          this.setState({
            todos: [...this.state.todos.map(todo => {
              return todo.id == response.data.id ? response.data : todo
            })],
            showModal: false,
            action: '',
            todo: {},
            message: 'Update Successful'
          })
        }).catch(error => {
        this.setState(error);
      })
    } else {
      axios.post('api/todos/', todo,tokenConfig())
        .then(response => {
          this.setState({todos: [...this.state.todos, response.data], showModal: false, action: '', todo: {},message: 'Added Successful'})
        }).catch(error => {
        this.setState(error);
      })
    }
  }

  onClickDelete = id => {
    axios.delete(`api/todos/${id}`,tokenConfig())
        .then(response => {
          this.setState({
            todos: [...this.state.todos.filter(todo => {
              return todo.id != id
            })],
            message: 'Delete Successful'
          })
        }).catch(error => {
        // console.log(error)
        this.setState(error);
      })
  }

  toggleTodoStatus = todo => {
    let completed  = todo.completed ? 0 : 1;
    let url = `api/todos/${todo.id}/set_completion?completed=${completed}`
    axios.get(url,tokenConfig())
        .then(response => {
          this.setState({
            todos: [...this.state.todos.map(t => {
              if(t.id == todo.id) {
                return {...todo, completed : !todo.completed}
              }
              return t;
            })],
          })
        }).catch(error => {
        this.setState(error);
      })
  }

  render() {
    return (
      <div className="animated fadeIn">
        { this.state.message && <Alert msg={this.state.message} /> }
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Todos <small className="text-muted">List</small>
                <Button color='success float-right' onClick={this.onClickAdd}>Add</Button>
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
                    {this.state.todos.map((todo, index) =>
                      <TodoRow key={index} index={index} todo={todo} onClickEdit={this.onClickEdit} onClickDelete={this.onClickDelete} toggleTodoStatus={this.toggleTodoStatus} />
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {
          this.state.showModal && <TodoModal todoItem={this.state.todo} toggleModal={this.toggleModal}  onSave={this.onSave} errors={this.state.errors} />
        }
      </div>
    )
  }
}

export default Todos;
