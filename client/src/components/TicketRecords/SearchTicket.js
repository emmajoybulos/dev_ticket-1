import React from 'react';
import { FormGroup, InputGroup, Input } from 'reactstrap'

const searchTicket = () => (
    <FormGroup>
        <InputGroup>
            <Input type="text" placeholder="Search" className="form-control-sm"/>
        </InputGroup>
    </FormGroup>
)

export default searchTicket;