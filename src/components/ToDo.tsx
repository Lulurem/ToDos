import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";
import { styled } from "styled-components";

const Li = styled.li`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 30px;
  span {
    margin-right: 20px;
  }
  button {
    padding: 5px 15px;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = (toDoName: string) => {
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(oldToDo => oldToDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <Li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button name={"TO_DO"} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DOING" && (
        <button name={"DOING"} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name={"DONE"} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={() => deleteToDo(text)}>delete</button>
    </Li>
  );
}

export default ToDo;
