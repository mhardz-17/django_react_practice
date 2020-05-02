import React,{useState} from 'react';
import {Alert as ReactAlert} from 'reactstrap'

function Alert(props) {
  const [isOpen, toggleShow] = useState(true);

  const toggle = () => {
    toggleShow(!isOpen)
  }
  return (
    <ReactAlert isOpen={isOpen} toggle={toggle} {...props}>{props.msg || props.children}</ReactAlert>
  );
}

export default Alert;
