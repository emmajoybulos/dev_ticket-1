import React, { Component } from 'react';
import { Card, CardBody, Badge, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

import FullCalendar from '../../components/Calendar/FullCalendar';

let recievedIssues = [], issues = [];

const checkObject = (obj, arr) => {
    let i;
    for (i = 0; i < arr.length; i++) {
        if(arr[i].id === obj.id && arr[i].start === obj.start) {
            return true;
        }
    }
    return false;
}

const getObj = (obj, arr) => {
    let i;
    for (i = 0; i < arr.length; i++) {
        if(arr[i].id === obj.id && arr[i].start === obj.start) {
            return i;
        }
    }
    return false;
}

const ticketBadgeRender = (arg) => {
    // return arg
    let status = null;
    switch (arg) {
        case ('1'):
            status = <Badge color="primary">New</Badge>;
            break;
        case ('3'):
            status = <Badge color="warning">In Progress</Badge>;
            break;
        case ('4'):
            status = <Badge color="primary">In Progress</Badge>;
            break;
        case ('10627'):
            status = <Badge color="warning">Awaiting Publish</Badge>;
            break;
        case ('15923'):
            status = <Badge color="warning">Prepare for Publish</Badge>;
            break;
        default:
            status = null
    }

    return status;
}
    
class Calendar extends Component {

    state = {
        issues: [],
        userIssues: [],
        modal: false
    }

    componentDidMount () {
        axios.get('/calendar')
        .then(response => {
            this.setState({ issues: response.data })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleModal = (arg) => {
        if (this.state.modal === false) {
            axios.get('/calendar/get_ticket', {
                params: {
                    key: arg.event._def.publicId,
                    duedate: arg.event._def.extendedProps.duedate
                }
            })
            .then(response => {
                this.setState({ userIssues: response.data })
            })
            .catch(err => {
                console.log(err);
            })
        }

        this.setState({ modal: !this.state.modal, userIssues: [] })
    }

    render() {

        if(this.state.issues.issues) {
            recievedIssues = this.state.issues.issues.map((issue) => {
                return (
                    {
                        key: issue.key,
                        username: issue.fields.assignee.key,
                        displayName: issue.fields.assignee.displayName,
                        duedate: issue.fields.duedate,
                        imageurl: issue.fields.assignee.avatarUrls['24x24']
                    }
                )
            })
        }
        
        recievedIssues.map((recievedIssue) => {
            if(checkObject({ id: recievedIssue.username, start: recievedIssue.duedate }, issues)) {
                let i = getObj({ id: recievedIssue.username, start: recievedIssue.duedate }, issues);
                issues[i].count = issues[i].count + 1;
            } else {
                issues.push(
                    {
                        id: recievedIssue.username,
                        title: recievedIssue.displayName,
                        start: recievedIssue.duedate,
                        duedate: recievedIssue.duedate,
                        imageurl: recievedIssue.imageurl,
                        count: 1
                    }
                )
            }
        });

        return(
            <>
                <Card>
                    <CardBody>
                        {issues.length > 0 ?
                            <FullCalendar issues={issues} click={this.handleModal} />
                            :
                            <BeatLoader color="#c8ced3" size={15} sizeUnit="px" css={{ textAlign: 'center', maxHeight: '19px' }} />
                        }
                    </CardBody>
                </Card>

                <Modal isOpen={this.state.modal} toggle={this.handleModal}>
                    <ModalHeader toggle={this.handleModal}>Ticket Summary</ModalHeader>
                    <ModalBody>
                        {this.state.userIssues.issues ?
                            <ul>
                                { this.state.userIssues.issues && this.state.userIssues.issues.map((issue) => (
                                    <li key={issue.key}>
                                        {ticketBadgeRender(issue.fields.status.id)} <a href={"https://jira.egalacoral.com/browse/" + issue.key} target="_blank" rel="noopener noreferrer"> {issue.fields.summary} </a>
                                    </li>
                                ))}
                            </ul>
                            :
                            <BeatLoader color="#c8ced3" size={15} sizeUnit="px" css={{ textAlign: 'center', maxHeight: '19px' }} />
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Calendar