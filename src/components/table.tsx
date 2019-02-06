import * as React from 'react'
import { Table, Rate } from 'antd'
interface repoInterface {
  key: string
  name: string
  forks: number
}
export default class TableRepos extends React.Component {
  private dataSource: Array<repoInterface>
  private dataSourceArray = []
  private columns: Object[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Forks',
      dataIndex: 'forks',
      key: 'forks',
    },
  ]
  constructor(props) {
    super(props)
    this.dataSource = []
  }

  fetchRepos() {
    console.log(1)
    return new Promise((resolve, reject) => {
      const query = `repository(name: react, owner: facebook) {id,name,description,forkCount,isFork}`
      fetch(`https://api.github.com/graphql`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 629d55696f1dba34344fd945a74afcd42da11260',
          'Content-Type': 'Application/json',
        },
        body: `{ "query": "query { ${query} }" }`,
      })
        .then(async res => {
          const response = await res.json()
          console.log(response)
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  componentDidMount() {
    this.fetchRepos()
  }

  render() {
    return <Table dataSource={this.dataSourceArray} columns={this.columns} />
  }
}
