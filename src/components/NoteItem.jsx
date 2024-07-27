import { Delete } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteNote } from "../features/note/noteSlice";
import { tabs } from "../responsive";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 10px;
  background-color: lightgreen;
  min-height: 30vh;
  ${tabs({
    minHeight: '40vh',
  })}
  &:nth-child(7n + 1),
  &:nth-child(7n + 2),
  &:nth-child(7n + 5),
  &:nth-child(7n + 6) {
    grid-area: span 1 / span 1;
    & span {
      -webkit-line-clamp: 2;
    }
  }
  &:nth-child(7n + 3),
  &:nth-child(7n + 7) {
    grid-area: span 1 / span 2;
    & p {
      align-self: flex-end;
    }
    & span {
      
      ${tabs({
        "-webkit-line-clamp": '10',
      })}
      ${mobile({
        "-webkit-line-clamp": '2',
      })}
    }
  }
  &:nth-child(7n + 4) {
    grid-area: span 2 / span 1;
    & p {
      align-self: flex-end;
    }
    & span {
      -webkit-line-clamp: 14;
      ${tabs({
        "-webkit-line-clamp": '27',
      })}
      ${mobile({
        "-webkit-line-clamp": '12',
      })}

    }
  }
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TopCon = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
`;

const DeleteIcon = styled.div`
  color: #383838;
  position: relative;
  font-size: 22px;
  max-height: 25%;
  z-index: 1;
  ${tabs({
    fontSize: '30px',
  })}
`

const Title = styled.h4`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 22px;
  -webkit-box-orient: vertical;
  ${tabs({
    fontSize: '26px',
  })}
`;

const Desc = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  overflow: hidden;
  -webkit-box-orient: vertical;
  ${tabs({
    fontSize: '18px',
    "-webkit-line-clamp": '4',
  })}
`;



const Date = styled.p`
  font-size: 13px;
`;

const NoteItem = ({ note }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <Container onClick={() => navigate(`/singleNote/${note.id}`, {state: {note}})}>
      <Top>
        <TopCon>
          <Title>{note.title}</Title>
          <DeleteIcon onClick={(e) => {e.stopPropagation();dispatch(deleteNote(note.id))}} >
            <Delete fontSize='inherit'/>
          </DeleteIcon>
        </TopCon>
        <Desc>{note.details}</Desc>
      </Top>
      <Date>{note.date}</Date>
    </Container>
  );
};

export default NoteItem;
