import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { RootState } from "../../modules";
import {
  MandalartState,
  setIsOpenedMandalartDetail,
} from "../../modules/mandalartReducer";
import { CloseBtn } from "./CreateMandalart";

const Base = styled.div`
  height: 100%;
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;
const DetailContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: grid;
  grid-template-areas:
    "first_goal second_goal third_goal"
    "fourth_goal main_goal fifth_goal"
    "sixth_goal seventh_goal eighth_goal";
  gap: 10px;
  margin: 0 auto;
  & > div:nth-child(1) {
    grid-area: main_goal;
  }
  & > div:nth-child(2) {
    grid-area: first_goal;
  }
  & > div:nth-child(3) {
    grid-area: second_goal;
  }
  & > div:nth-child(4) {
    grid-area: third_goal;
  }
  & > div:nth-child(5) {
    grid-area: fourth_goal;
  }
  & > div:nth-child(6) {
    grid-area: fifth_goal;
  }
  & > div:nth-child(7) {
    grid-area: sixth_goal;
  }
  & > div:nth-child(8) {
    grid-area: seventh_goal;
  }
  & > div:nth-child(9) {
    grid-area: eighth_goal;
  }
`;

const MainGoal = styled.div`
  display: grid;
  grid-template-areas:
    "first_goal second_goal third_goal"
    "fourth_goal main_goal fifth_goal"
    "sixth_goal seventh_goal eighth_goal";
  gap: 5px;
  & > textarea,
  & > div {
    width: 60px;
    height: 60px;
    text-align: center;
    border-radius: 10px;
    outline: none;
    border: none;
    color: ${(props) => props.theme.color.fontPrimary};
    padding: 2px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  & > div {
    grid-area: main_goal;
  }
  & > textarea:nth-child(2) {
    grid-area: first_goal;
  }
  & > textarea:nth-child(3) {
    grid-area: second_goal;
  }
  & > textarea:nth-child(4) {
    grid-area: third_goal;
  }
  & > textarea:nth-child(5) {
    grid-area: fourth_goal;
  }
  & > textarea:nth-child(6) {
    grid-area: fifth_goal;
  }
  & > textarea:nth-child(7) {
    grid-area: sixth_goal;
  }
  & > textarea:nth-child(8) {
    grid-area: seventh_goal;
  }
  & > textarea:nth-child(9) {
    grid-area: eighth_goal;
  }
`;
const MandalartAlias = styled.div<{
  selectedMandalart: MandalartState["selectedMandalart"];
}>`
  background-color: ${(props) => props.selectedMandalart.color};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: 700;
  display: flex;
  align-items: center;
`;
const GoalInput = styled.textarea`
  background-color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.fontSize.base};

  &::placeholder {
    color: ${(props) => props.theme.color.lightGray};
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;
const Todo = styled.div`
  background-color: ${(props) => props.theme.color.white};
  font-weight: 300;
  font-size: ${(props) => props.theme.fontSize.sm};
`;
const GoalWrapper = styled.div`
  transition: all 0.5s ease-in-out;
  display: grid;
  grid-template-areas:
    "first_todo second_todo third_todo"
    "fourth_todo main_todo fifth_todo"
    "sixth_todo seventh_todo eighth_todo";
  gap: 5px;
  opacity: ${(props) => (props.id === "" ? 0.5 : 1)};
  & > ${Todo} {
    cursor: ${(props) => (props.id === "" ? "defalut" : "pointer")};
  }
  & div {
    width: 60px;
    height: 60px;
    text-align: center;
    border-radius: 10px;
    outline: none;
    border: none;
    white-space: pre-wrap;
    color: ${(props) => props.theme.color.fontPrimary};
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::-webkit-scrollbar {
      display: none;
    }

    &:nth-child(1) {
      grid-area: main_todo;
    }
    &:nth-child(2) {
      grid-area: first_todo;
    }
    &:nth-child(3) {
      grid-area: second_todo;
    }
    &:nth-child(4) {
      grid-area: third_todo;
    }
    &:nth-child(5) {
      grid-area: fourth_todo;
    }
    &:nth-child(6) {
      grid-area: fifth_todo;
    }
    &:nth-child(7) {
      grid-area: sixth_todo;
    }
    &:nth-child(8) {
      grid-area: seventh_todo;
    }
    &:nth-child(9) {
      grid-area: eighth_todo;
    }
  }
`;
const GoalText = styled.div<{
  selectedMandalart: MandalartState["selectedMandalart"];
}>`
  background-color: ${(props) => props.selectedMandalart.color};
  filter: brightness(1.2) saturate(0.8);
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: 500;
`;

type GoalProps = {
  id: number;
  text: string;
  todos: TodoProps[];
};
type TodoProps = {
  id: number;
  text: string;
  emoji: string;
  multiple: boolean;
  period: string;
  periodText: string;
  periodRange: string;
  periodNumber: number;
};

export default function MandalartDetail() {
  const dispatch = useDispatch();

  const selectedMandalart = useSelector(
    (state: RootState) => state.mandalartReducer.selectedMandalart,
  );

  const [goals, setGoals] = useState<GoalProps[]>(selectedMandalart.goals);

  console.log(selectedMandalart);

  const onCloseBtnClick = () => {
    dispatch(setIsOpenedMandalartDetail());
  };
  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    goalId: number,
  ) => {
    const {
      target: { value },
    } = e;

    const copiedGoals = [...goals];
    copiedGoals[goalId - 1].text = value;
    setGoals(copiedGoals);
  };
  const onTodoClick = (
    e: React.SyntheticEvent<HTMLDivElement>,
    todo: TodoProps,
    goal: GoalProps,
  ) => {
    if (e.target instanceof Element) {
      if (e.target.id !== "") {
        alert(goal.text);
      }
    }
  };
  return (
    <Base>
      <CloseBtn className="material-symbols-rounded" onClick={onCloseBtnClick}>
        close
      </CloseBtn>
      <DetailContainer>
        <MainGoal>
          <MandalartAlias selectedMandalart={selectedMandalart}>
            {selectedMandalart.alias}
          </MandalartAlias>
          {goals.map((goal) => (
            <GoalInput
              key={goal.id}
              value={goal.text}
              spellCheck={false}
              placeholder={"Goal" + goal.id}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange(e, goal.id)
              }
            />
          ))}
        </MainGoal>
        {goals.map((goal) => (
          <GoalWrapper key={goal.id} id={goal.text}>
            <GoalText selectedMandalart={selectedMandalart}>
              {goal.text}
            </GoalText>
            {goal.todos.map((todo) => (
              <Todo
                key={todo.id}
                onClick={(e: React.SyntheticEvent<HTMLDivElement>) =>
                  onTodoClick(e, todo, goal)
                }
                id={goal.text}
              >
                {todo.text}
              </Todo>
            ))}
          </GoalWrapper>
        ))}
      </DetailContainer>
    </Base>
  );
}
