import React from 'react';
import { Button, Input, InputGroup,InputGroupAddon } from 'reactstrap';

const addTicket = (props) =>  (
    <InputGroup>
        <Input 
            id="appendedInputButton" 
            className="form-control-sm" 
            size="16" 
            type="text" 
            placeholder="Ticket ID"
            onChange={props.change.bind(this)}
            value={props.value}
            />
        <InputGroupAddon addonType="append">
        <Button 
            color="primary" 
            size="sm"
            onClick={props.click}
            >
            <i className="fa fa-plus"></i>
        </Button>
        </InputGroupAddon>
    </InputGroup>
)

export default addTicket;