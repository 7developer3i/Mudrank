import React, { useState } from "react";
import image from './bg-1.png'
// F:\Hemanshi 3i\mudrank-completed\frontendtwo\frontendtwo\public\tree-736885_1280.jpg
import './rezorpay.css'
import axios from "axios";
import { BaseUrl } from "./apis/contant";

export const Rezorpay =()=>{
  const [book,setBook] = useState({
    name:"the fault in our stars",
    author:"hemanshi patel",
    img: image,
    price:250
  })
  const initPayment = (data)=>{
    const options ={
        key:"rzp_test_Yrx5VEaNzf52bB",
        amount: 100, // Minimum amount in paise (1 INR)
  currency: "INR",
  name: book.name,
  description: "test transaction",
        image:book.img,
        order_id:data.id,
        handler:async(responce)=>{
            try {
                axios.post(`${BaseUrl.url}verify`).then((res)=>{
                    console.log(responce.data,"resss");
                })
            } catch (error) {
                console.log(error);
            }
        },
        theme:{
            color:"#3399cc"
        },
    }
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

  }
  const handlePayment = ()=>{
    console.log("payment button called");
    axios.post(`${BaseUrl.url}orders`,{amount:book.price}).then((res)=>{
        console.log(res.data,"resdata");
        initPayment(res.data)
    }).catch((err)=>{
        console.log(err,"err");
    })
  }
  return<>
<div className="App">
			<div className="book_container">
				<img src={book.img} alt="book_img" className="book_img" />
				<p className="book_name">{book.name}</p>
				<p className="book_author">By {book.author}</p>
				<p className="book_price">
					Price : <span>&#x20B9; {book.price}</span>
				</p>
				<button onClick={handlePayment} className="buy_btn">
					buy now
				</button>
			</div>
		</div>

  </>
}