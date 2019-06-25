import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Badge, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

import FullCalendar from '../../components/Calendar/FullCalendar';

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
    let status = null;
    switch (arg) {
        case ('1'):
            status = <Badge color="primary">New</Badge>;
            break;
        case ('3'):
            status = <Badge color="warning">In Progress</Badge>;
            break;
        case ('4'):
            status = <Badge color="primary">Reopened</Badge>;
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

    calendarComponentRef = React.createRef();

    state = {
        issues: [],
        userIssues: [],
        modal: false,
    }

    componentDidMount () {
        axios.get('/calendar')
        .then(response => {
            this.setState({ issues: response.data })

            let events = [];

            response.data.issues.map((hah) => {
                if(checkObject({ id: hah.fields.assignee.key, start: hah.fields.duedate }, events)) {
                    let i = getObj({ id: hah.fields.assignee.key, start: hah.fields.duedate }, events);
                    return events[i].count = events[i].count + 1;
                } else {
                    return (
                        events.push(
                            {
                                id: hah.fields.assignee.key,
                                title: hah.fields.assignee.displayName,
                                start: hah.fields.duedate,
                                duedate: hah.fields.duedate,
                                imageurl: hah.fields.assignee.avatarUrls['24x24'],
                                count: 1
                            }
                        )
                    )
                }
            })

            this.setState({ issues: [...events] })
        })
        .catch(err => {
            console.log(err)
        });
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

    handleRefreshCalendar = () => {
        let calendarApi = this.calendarComponentRef.current.getApi();
        calendarApi.removeAllEventSources();
        calendarApi.addEventSource([
            {
                title: 'Lloyd Montero',
                start: '2019-06-25',
                imageurl: 'https://jira.egalacoral.com/secure/useravatar?size=small&ownerId=lunar.cuenca&avatarId=20806',
                duedate: '2019-06-25',
                id: 'lloyd.montero',
                count: 1
            },
        ]);
        calendarApi.refetchEvents();
    }

    render() {

        return(
            <>
                <Card>
                    <CardHeader>
                        <span>Calendar</span>
                        <div className="card-header-actions">
                            <Button color="primary" onClick={this.handleRefreshCalendar} size="sm" >Click me</Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        {this.state.issues.length > 0 ?
                            <FullCalendar issues={this.state.issues} click={this.handleModal} calendarRef={this.calendarComponentRef} />
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