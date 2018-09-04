import React from 'react';
import styled from 'styled-components'; 

const AllDiv = styled.div`
  width: 100px;
  height: 50px; 
`;


class All extends React.Component {
    state = {

    }

    render () {
      const all = [...this.props.bears, ...this.props.zoos]
      console.log(all)
      return (
       <div>
           {all.map((item, i) => <AllDiv key = {i}>{item.name}</AllDiv>)}
       </div>
      )
    }
}

export default All; 