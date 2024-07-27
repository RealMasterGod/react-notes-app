import { ArrowBack } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addNote } from "../features/note/noteSlice";
import { mobile } from "../responsive";
import { tabs } from "../responsive";

const Container = styled.div`
  height: 100vh;
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

const SaveButton = styled.button`
  padding: 10px;
  background-color: rebeccapurple;
  color: white;
  border: none;
  width: 80px;
  border-radius: 15px;
  cursor: pointer;
`;

const BottomForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* gap: 15px; */
  height: calc(100vh - 80px);
  /* padding-top: 20px; */
  padding-bottom: 5px;
`;

const Input = styled.input`
  padding: 25px 15px;
  background-color: transparent;
  border: none;
  /* border-bottom: 1px solid white; */
  font-size: 36px;
  color: white;
  ${mobile({
    fontSize: '28px',
  })}
  ${tabs({
    fontSize: '28px',
  })}
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  background-color: transparent;
  border: none;
  color: white;
  padding: 25px 15px;
  font-size: 20px;
  max-height: calc(100vh - 80px - 100px);
  ${mobile({
    fontSize: '16px',
  })}
  ${tabs({
    fontSize: '18px',
  })}
  &:focus {
    outline: none;
  }
`;

const NewNote = () => {
  const [title, setTitle] = useState("")
  const [details,setDetails] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
    const id = Date.now()
    const date = new Date(Date.now()).toLocaleDateString("en-US",options)
    dispatch(addNote({id,title,details,date}))
    navigate("/")
  }
  return (
    <Container>
      <Top>
        <Link className="link" to="/">
          <BackIcon>
            <ArrowBack fontSize="inherit" />
          </BackIcon>
        </Link>
        <SaveButton type="submit" form="new-note-form">Save</SaveButton>
      </Top>
      <BottomForm id='new-note-form' onSubmit={handleSubmit}>
        <Input type="text" required placeholder="Title" onChange={e => setTitle(e.target.value)} />
        <TextArea rows={28} placeholder="More details..." onChange={e => setDetails(e.target.value)}/>
      </BottomForm>
    </Container>
  );
};

export default NewNote;
