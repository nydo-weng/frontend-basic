import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

import { nanoid } from "nanoid";

import { useState, useRef, useEffect } from "react";

// 定义不同的过滤规则, 每个规则都是一个函数
const FILTER_MAP = {
  // All 过滤器显示所有任务, 所以对所有任务返回 true
  All: () => true,
  // Active 过滤器显示 completed 属性为 false 的任务
  Active: (task) => !task.completed,
  // Completed 过滤器显示 completed 属性为 true 的任务
  Completed: (task) => task.completed,
};

// 得到 FILTER_MAP 的所有 key, 也就是 all, active ,completed, 通常用于生成过滤按钮
const FILTER_NAMES = Object.keys(FILTER_MAP);
// 这里在 App 函数外定义, 如果在函数内部定义, 每次 App 重新渲染时都会重新计算它们.

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  /*  如果 props 中有 tasks, 对 tasks 进行 map 操作, 遍历 tasks 数组, 每个元素当做一个 task, 取出 task 中的 name 属性, 作为 taskList 数组的元素 但是这里不包含 html 结构 */
  // const taskList = props.tasks?.map((task) => task.name);

  /* 为了解决这个问题, map() 函数 return 一个 <Todo /> 组件, 但是现在还缺少自身的名字 等信息 */
  // const taskList = props.tasks.map((task) => <Todo />);

  /* 传入 id, name, completed 三个属性 */
  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(taskList.length);

  useEffect(() => {
    if (taskList.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [taskList.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      {/* 一个表单, input 用于写出一个新任务, 有一个按钮用于提交表单 */}
      <Form addTask={addTask} />

      {/* 一组按钮, 用于删选任务 */}
      <div className="filters btn-group stack-exception">{filterList}</div>

      {/* 一个标题, 用于显示还有多少任务 */}
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      {/* 三个任务, 安排在一个无需列表中, 每一项任务都是一个列表项 li, 有编辑和删除按钮, 还有一个复选框可以把它勾选为完成 */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {/* 用组件 Todo 来代替 列表项 li */}
        {/* <Todo name="Eat" completed={true} id="todo-0" />
        <Todo name="Sleep" completed={false} id="todo-1" />
        <Todo name="Repeat" completed={false} id="todo-2" /> */}

        {/* 用传来的 props 生成的 taskList 代替直接用 Todo*/}
        {taskList}
      </ul>
    </div>
  );
}

export default App;
