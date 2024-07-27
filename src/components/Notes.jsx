import React, { useMemo, useState } from "react";
import styled from "styled-components";
import NoteItem from "./NoteItem";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import { mobile } from "../responsive";
import { tabs } from "../responsive";


const OuterContainer = styled.div`
  position: relative;
  width: 50%;
  min-height: calc(100vh - 80px);
  margin: 0 auto;
  background-color: black;
  ${mobile({
    width: '100%',
  })}
  ${tabs({
    width: '100%',
  })}
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  /* min-height: calc(100vh - 80px); */
  background-color: black;
  width: 100%;
  margin: 0 auto;
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const AddButton = styled.div`
  position: fixed;
  bottom: 1vh;
  margin-left: 1vh;
  z-index: 1;
  border: none;
  border-radius: 50%;
  background-color: #1b1b1b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: white;
  height: 50px;
  width: 50px;
  cursor: pointer;
`;

let PageSize = 10

const Notes = ({text}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const notes = useSelector(store => store.note.notes)
  const [filteredDataLength,setFilteredDataLength] = useState(0)
  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1)*PageSize
    const lastPageIndex = firstPageIndex + PageSize
    setFilteredDataLength(0)
    if(text) {
      return notes.filter(note => {
        if(note.title.toLowerCase().match(text.toLocaleLowerCase()) || note.details?.toLowerCase()?.match(text.toLocaleLowerCase())) {
          setFilteredDataLength(prev => prev+1)
          return note
        }
      }).slice(firstPageIndex, lastPageIndex)
    } else {
      return notes.slice(firstPageIndex, lastPageIndex)
    }
  },[currentPage,notes,text])
  return (
    <OuterContainer>
      <Pagination className="pagination-bar" onPageChange={page => setCurrentPage(page)} currentPage={currentPage} totalCount={!text ? notes.length : filteredDataLength} pageSize={PageSize}/>
      <Container>
        {currentPageData.map((note) => (
            <NoteItem note={note} key={note.id}/>
        ))}
      </Container>
      {text && filteredDataLength === 0 && <span style={{color:'#464646',alignSelf: 'center'}}>No match found :(</span>}
      {notes.length === 0 && <span style={{color:'#464646',alignSelf: 'center'}}>Click on the + icon below to create a note.</span>}
      <Link className="link" to="/newNote">
      <AddButton>
        <Add fontSize="inherit" />
      </AddButton>
      </Link>
    </OuterContainer>
  );
};

export default Notes;
