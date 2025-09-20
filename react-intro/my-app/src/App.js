/* 在 React 17 以及之后的版本, import React from 'react' 通常已经不再必须.
原因是 React 引入了新的 JSX 转换机制 (JSX Transform)
1. 以前 (React 16 及更早版本) 
  - JSX 会被编译成 React.createElement(...) 调用
  - 所以必须 import React from 'react', 否则 JSX 无法工作
2. 现在 (React 17+)
  - JSX 转换器会自动引入必要的函数, 不再依赖全局 React
  - 所以即使没有 import React, JSX 也能正常工作
3. 什么时候还需要写
  - 直接用到 React 对象, 比如 React.useState, React.Component
  - 在一些老的工具链或特殊配置中
为了 鲁棒性, 还是加上比较好
*/
import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App(props) {
  const subject = "React";
  console.log(props);
  const firstProp = props.subject;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello, {subject}!</p>
        <p>First Prop: {firstProp}</p>
      </header>
    </div>
  );
}

export default App;
