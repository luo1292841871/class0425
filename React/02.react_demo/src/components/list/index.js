import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import axios from 'axios';

export default class List extends Component {
  // 2.再初始化数据为空
  state = {
    users: [], // 控制成功状态，为了遍历上来不报错，要让它是个空数组
    firstView: true, // 7.控制初始化状态，设置首页的页面,一上来就要显示，所以为true
    error: ''  // 8.控制错误状态
  };

  // 1.先订阅一次
  componentDidMount() {
    PubSub.subscribe('SEARCH', (mes, name) => {
      // console.log(name);

      // 6.更新为loading
      this.setState({
        users: [], // 因为再次搜索的时候不会显示loading页面，用新的值去替换了旧的值，原来的值还是在的，一直都有值，就不会有loading，所以要更新状态为空，只要再次点击，就会有loading
        firstView: false, // 7.1取消初始化显示
        error: '' // 8.1
      });


      // 1.1发送请求搜索github users
      axios.get(`https://api.github.com/search/users?q=${name}`)
        .then((response) => {
          // console.log(response.data); // 打印的是数据，名字，头像和主页等多个
          // 1.2遍历只显示数据，数据是名字，头像和主页(提取数据)
          const users = response.data.items.map((item) => {
            return {
              name: item.login,
              url: item.html_url,
              img: item.avatar_url
            }
          });
          console.log(users);
          // 3.更新状态
          this.setState({
            users
          })

        })
        .catch((error) => {
          this.setState({
            error: '网络出现故障，刷新试试' // 8.1设置错误的信息
          })
        })
    })
  }

  render() {
    // 5.判断users的长度
    const { users, firstView, error } = this.state;

    // 7.1 它的优先级最高
    if (firstView) {
      return <h1>enter name to search</h1> // 只要return了后面的代码就不会执行了
    }

    // 8.2如果有错误就显示错误内容
    if (error) {
      return <h1>{error}</h1>
    }

    // 5.1
    if (users.length) {
      return <div className="row">
        { // 4.更新状态之后，就要遍历展示，div要遍历生成，遍历生成的元素都要添加一个有唯一的值，所以设置了key
          this.state.users.map((user, index) => {
            return <div className="card" key={index}>
              <a href={user.url} target="_blank">
                <img src={user.img} style={{width: 100}}/>
              </a>
              <p className="card-text">{user.name}</p>
            </div>
          })
        }
      </div>
    }

    return <h1>loading...</h1>


  }
}