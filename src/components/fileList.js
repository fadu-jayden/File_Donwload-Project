import React from 'react'
import { Checkbox, List } from 'semantic-ui-react'
import '../css/fileItem.css'

const ListExampleSelection = () => (
  <List selection verticalAlign='middle'>
    <List.Item class ="group_fileItem" >
      <List.Content>
        <Checkbox label='FileName1' />
      </List.Content>
    </List.Item>
    <List.Item class ="group_fileItem" >
      <List.Content>
        <Checkbox label='FileName1' />
      </List.Content>
    </List.Item>
    <List.Item class ="group_fileItem" >
      <List.Content>
        <Checkbox label='FileName1' />
      </List.Content>
    </List.Item>
  </List>
)

export default ListExampleSelection
