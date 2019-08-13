import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Search extends Component{
  state = {
    searchName: ''
  };

  // 收集input的值
  handleChange = (e) => {
    this.setState({
      searchName: e.target.value
    })
  };

  search = () => {
    // 解构赋值
    const { searchName } = this.state;
    if (!searchName) return alert('请输入搜索名称');
    // 再发布消息
    PubSub.publish('SEARCH', searchName);
  };

  render() {
    return <section className="jumbotron">
      <h3 className="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" placeholder="enter the name you search" onChange={this.handleChange}/>
        <button onClick={this.search}>Search</button>
      </div>
    </section>
  }
}