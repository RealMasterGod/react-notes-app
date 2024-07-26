import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteNote, editNote } from "../features/note/noteSlice";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import { tabs } from "../responsive";

const Container = styled.div`
  min-height: 100vh;
  width: 50%;
  margin: 0 auto;
  ${mobile({
    width: '100%',
  })}
  ${tabs({
    width: '100%',
  })}
  /* border: 1px solid white; */
  background-color: black;
  color: white;
`;

const Top = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  /* padding-left: 1px; */
  /* border: 1px solid white; */
`;

const BackIcon = styled.button`
  font-size: 30px;
  background-color: #1b1b1b;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const SaveButton = styled.button`
  padding: 10px;
  background-color: rebeccapurple;
  color: white;
  border: none;
  width: 80px;
  border-radius: 15px;
  cursor: pointer;
`;

const EditButton = styled.button`
  padding: 12px;
  background-color: #1b1b1b;
  color: white;
  border: none;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  /* width: 30px; */
  /* height: 50%; */
  border-radius: 50%;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* gap: 15px; */
  min-height: calc(100vh - 80px);
  /* padding-top: 20px; */
  padding-bottom: 5px;
`;

const Input = styled.input`
  padding: 25px 15px;
  background-color: transparent;
  border: none;
  /* border-bottom: 1px solid white; */
  ${mobile({
    fontSize: '28px',
  })}
  ${tabs({
    fontSize: '28px',
  })}
  font-size: 36px;
  color: white;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  background-color: transparent;
  border: none;
  color: white;
  padding: 25px 15px;
  max-height: calc(100vh - 80px - 100px);
  /* border: 1px solid white; */
  ${mobile({
    fontSize: '16px',
  })}
  ${tabs({
    fontSize: '18px',
  })}
  max-width: 100%;
  font-size: 20px;
  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  padding: 25px 15px;
  font-weight: 600;
  background-color: transparent;
  ${mobile({
    fontSize: '28px',
  })}
  ${tabs({
    fontSize: '28px',
  })}
  border: none;
  color: white;
  /* border-bottom: 1px solid white; */
  font-size: 36px;
`;

const Details = styled.p`
  padding: 25px 15px;
  background-color: transparent;
  border: none;
  color: white;
  ${mobile({
    fontSize: '16px',
  })}
  ${mobile({
    fontSize: '18px',
  })}
  /* border-bottom: 1px solid white; */
  font-size: 20px;
`;

const SingleNote = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [note, setNote] = useState(location.state.note);
  const [edit, setEdit] = useState(false);
  const [title,setTitle] = useState(note.title)
  const [details,setDetails] = useState(note.details)
  const dispatch = useDispatch()
  const handleClick = (e) => {
    e.preventDefault()
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
    const date = new Date(Date.now()).toLocaleDateString("en-US",options)
    dispatch(editNote({id: note.id,title,details,date}))
    setEdit(false)
    navigate('.', {state: {note: {id:note.id,title,details,date}}})
    setNote({id:note.id,title,details,date})
  }
  return (
    <Container>
      <Top>
        <Link className="link" to="/">
          <BackIcon>
            <ArrowBack fontSize="inherit" />
          </BackIcon>
        </Link>
        {!edit && (
          <IconContainer>
            <EditButton onClick={() => setEdit(true)}>
              <Edit />
            </EditButton>
            <DeleteButton onClick={() => {dispatch(deleteNote(note.id)); navigate("/")}}>
              <Delete />
            </DeleteButton>
          </IconContainer>
        )}
        {edit && <SaveButton onClick={handleClick}>save</SaveButton>}
      </Top>
      <Bottom>
        {edit ? (
          <Input autoFocus type="text" onChange={e => setTitle(e.target.value)} value={title} placeholder="Title" />
        ) : (
          <Title>{note.title}</Title>
        )}
        {edit ? (
          <TextArea
            autoFocus
            rows={28}
            value={details}
            placeholder="More details..."
            onChange={e => setDetails(e.target.value)}
          />
        ) : (
          <Details>{note.details}</Details>
        )}
      </Bottom>
    </Container>
  );
};

export default SingleNote;
