import React, { useRef, useEffect, useState} from 'react'

import market from '../assets/landscapes/market.png'
import "../stylesheets/infoHUD.css"





export default function InfoHUD(props) {	

  const [state, setState] = useState(props.info)

  // console.log(`upper state`, state)
  
  // useEffect(() => {
  //   if(props.info.name) {
  //     setState((prev) => {
  //       prev = props.info
  //       console.log(`useEffect set state`, state)
  //     })
  //   }
  // })
  
  /**
   * Hook that alerts clicks outside of the passed ref
   */
  // function useOutsideAlerter(ref) {
  //   useEffect(() => {
  //     /**
  //      * Alert if clicked on outside of element
  //      */
  //       function handleClickOutside(event) {
  //         if (ref.current && !ref.current.contains(event.target)) {
  //           // alert("You clicked outside of me!");
  //           setState({})
  //           console.log(`click outside`)
  //         }
  //       }
  //       document.addEventListener("mousedown", handleClickOutside);
  //       return () => {
  //         // Unbind the event listener on clean up
  //         document.removeEventListener("mousedown", handleClickOutside);
  //       };
      
  //     // Bind the event listener
  //   }, [ref]);
  // }

  
  // const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef);
  // <div ref ={wrapperRef} className='infoHUD'>
  
  // Assign props
  let name = props.info.name;
  let animation = props.info.animation;
  let image = props.info.thumbnail;
  let perma = props.info.perma;
  let ethPrice = props.info.eth_price;
  let usdPrice = props.info.usd_price;
  
   
  
  // console.log(`props.name`, props)
  // console.log(`state`, state)
  
  // if(state.name) {
    return (
      <div className='infoHUD'>
        <img src={market} id='market'></img>
          <h5>{name}</h5>
          <a href={perma} target="_blank"><img src={image} id='nftImage'></img></a>
          <h5>{ethPrice}</h5>
          <h5>{usdPrice}</h5>
      </div>
    )
  // }

  // if(state === null) {
  //   return <></>
  // }
}