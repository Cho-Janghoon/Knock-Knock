import React from 'react'
import axios from 'axios'
import "./MyList.css"

const MyList = ( { myList,accessToken,handleWriteInfo } ) => {
     console.log(myList)
//     const list = myList.map((mylist,key)=>
//   // console.log(mylist)
//        ( <li key={key} >{mylist.name}</li>)
  //  )
  //  console.log(list)
    return (
        <ul className = '123'>
         {myList.map((mylist,key)=> 
         (<div>
         <span key={key}> {mylist.name},{mylist.address}</span>
         </div>))}
        </ul>
    )
} 

export default MyList
