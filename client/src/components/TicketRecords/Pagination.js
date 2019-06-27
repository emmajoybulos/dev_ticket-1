import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const pagination = (props) => (
    <Pagination>
        <PaginationItem className={(props.currentPage === props.pageNumbers[0] ? 'disabled' : '' )} >
            <PaginationLink previous tag="button" onClick={props.clickPrev}>
            Prev
            </PaginationLink>
        </PaginationItem>
        {props.pageNumbers.map((number) => (
            <PaginationItem key={number} onClick={props.clickPage} className={(props.currentPage === number ? 'active' : '' )}  >
                <PaginationLink tag="button" id={number} >
                    {number}
                </PaginationLink>
            </PaginationItem>
        ))}
        <PaginationItem className={(props.currentPage === props.pageNumbers.length ? 'disabled' : '' )} >
            <PaginationLink next tag="button" onClick={props.clickNext}>
            Next
            </PaginationLink>
        </PaginationItem>
    </Pagination>
)

export default pagination;