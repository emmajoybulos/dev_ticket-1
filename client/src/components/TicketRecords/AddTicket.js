import React from 'react';
import { Button, Input, InputGroup,InputGroupAddon } from 'reactstrap';

const addTicket = () =>  (
    <InputGroup>
        <Input id="appendedInputButton" className="form-control-sm" size="16" type="text" placeholder="Ticket ID"/>
        <InputGroupAddon addonType="append">
        <Button color="primary" size="sm">
            <i className="fa fa-plus"></i>
        </Button>
        </InputGroupAddon>
    </InputGroup>
)

export default addTicket;