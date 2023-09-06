import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import {
  Categories,
  categoriesState,
  categoryState,
  toDoSelector,
} from "../atoms";
import ToDo from "./ToDo";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Header = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 35px;
  height: 10vh;
  font-weight: 400;
`;

const Select = styled.select`
  padding: 10px 68px;
`;

const Input = styled.input`
  padding: 10px 42px;
`;

const Button = styled.button`
  padding: 10px 40px;
`;

interface ICategory {
  newCategory: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm();
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const onValid = () => {
    setValue("newCategory", "");
  };
  const addCategory = () => {
    setCategories(["newCategory", ...categories]);
  };
  return (
    <Container>
      <Header>To Dos</Header>
      <div>
        <Select value={category} onInput={onInput}>
          <option value={"TO_DO"}>To Do</option>
          <option value={"DOING"}>Doing</option>
          <option value={"DONE"}>Done</option>
        </Select>
        <form onSubmit={handleSubmit(onValid)}>
          <Input {...register("newCategory")} placeholder="카테고리 추가" />
          <Button onClick={addCategory}>Add Category</Button>
        </form>
        <hr />
        <CreateToDo />
        {toDos?.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </div>
    </Container>
  );
}

export default ToDoList;
