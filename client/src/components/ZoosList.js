import React from 'react';

const ZoosList = (props) => {
  return ( 
    <div>
      {props.zoos.map(zoo => <div className={"zoo"} key={zoo.id} zoo={zoo} >
            <p>{zoo.name}</p>
          </div>)}
    </div>
   );
}
 
export default ZoosList ;