import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './Pagination.css';

const pagination = () => (
    <Pagination size="sm">
        <PaginationItem disabled>
            <PaginationLink previous tag="button">
             Prev
            </PaginationLink>
        </PaginationItem>
        <PaginationItem active>
            <PaginationLink tag="button">
                1
            </PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink tag="button">
                2
            </PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink tag="button">
                3
            </PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink previous tag="button">
                Prev
            </PaginationLink>
        </PaginationItem>
    </Pagination>
)

export default pagination;