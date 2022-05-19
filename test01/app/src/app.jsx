import React from 'react';
import css from './app.module.css';
import css2 from'./app.module.less';
import css3 from'./app.module.scss';
import './app.css';
import './app.less';
import './app.scss';
import 'antd/dist/antd.css';
export class App extends React.Component{
  render(){
    // ${css.test} ${css2.test} ${css3.test}
    return (
      <div className={`${css.test} ${css2.test} ${css3.test} test testless testsass`} />
    );
  }
}
