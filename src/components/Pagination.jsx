import React from 'react'
import { usePagination, DOTS } from '../usePagination'
import styled from 'styled-components'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'

const List = styled.ul`
    display: flex;
    list-style-type: none;
    color: white;

    &.pagination-bar {
        width: 100%;
        display: flex;
        justify-content: center;
        color: white
    }
`

const ListItem = styled.li`
    padding: 0 12px;
    height: 32px;
    text-align: center;
    margin: auto 4px;
    /* color: rgba(0,0,0,0.87); */
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    letter-spacing: 0cap.01071em;
    border-radius: 16px;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;
    color: white;

    &.dots:hover {
        background-color: transparent;
        cursor: default;
    }

    &:hover {
        background-color: #1b1b1b;
        cursor: pointer;
    }
`

const Pagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount,
        currentPage,
        pageSize,
        className,
    } = props

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    })

    if(currentPage === 0 || paginationRange?.length < 2) {
        return null
    }

    const onNext = () => {
        onPageChange(currentPage+ 1)
    }
    const onPrevious = () => {
        onPageChange(currentPage- 1)
    }

    let lastPage = paginationRange[paginationRange?.length - 1]
    return (
        <List className={className ? `${className}` : ""}>
            <ListItem className='pagination-item' style={currentPage === 1 ? {display: "none"} : {display: 'inherit'}} onClick={onPrevious}>
                <ArrowLeftOutlined />
            </ListItem>
            {paginationRange.map((pageNumber,i) => {
                if(pageNumber === DOTS) {
                    return <ListItem key={i} className='pagination-item dots'>&#8230;</ListItem>
                }

                return (
                    <ListItem key={i} style={pageNumber === currentPage ? {backgroundColor: '#1b1b1b'} : {backgroundColor: 'inherit'}} onClick={() => onPageChange(pageNumber)} className='pagination-item' selected={pageNumber === currentPage}>
                        {pageNumber}
                    </ListItem>
                )
            })}
            <ListItem className='pagination-item' style={currentPage === lastPage ? {display: "none"} : {display: 'inherit'}}onClick={onNext}>
                <ArrowRightOutlined />
            </ListItem>
        </List>
    )
}

export default Pagination
