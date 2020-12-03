import React, { useEffect } from "react"
import { Button, Container, Jumbotron } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchUserById } from "../../store/userInfo/actions";
import { selectUserInfo } from "../../store/userInfo/selectors";
import UpdateStoreForm from "../../components/UpdateStoreForm/index"
import UpdateUserForm from "../../components/UpdateUserForm/index"

import "./storeInfo.css";

export default function StoreInfo() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const userInfo = useSelector(selectUserInfo)

    console.log("This is userInfo", userInfo)

    useEffect(() => {
        dispatch(fetchUserById(id));
      }, [dispatch, id]);
    return (
    <>    
        {userInfo.map(user => {
            return (
            <Container key={user.id}>
             <Jumbotron>
              <div className="info-title">     
                 <h1>{user.name}'s Profile</h1>
             </div>
             </Jumbotron>
             <Jumbotron>
              <div className="user-info">
                  <h2>Your user info</h2>     
                 <p><strong>Name:</strong> { " " } 
                 <span style={{fontSize: 25}}>{user.name}</span></p>
                 <p><strong>Email:</strong> { " " } 
                 <span style={{fontSize: 25}}>{user.email}</span></p>
                 <p><strong>Phone number:</strong> { " " } 
                 <span style={{fontSize: 25}}>{user.phone}</span></p>
                 <p><strong>Is a store owner:</strong> { " " } 
                 <span style={{fontSize: 25}}>{user.isOwner.toString()}</span></p>
             </div>
             <UpdateUserForm />
             </Jumbotron>
             <Jumbotron> 
                <div className="info-store-title">
                 <h1>{user.store.name}</h1>
                </div>
                <div className="info-image">
                 <img src={user.store.image} alt="info-image"/>
                </div>
                <div className="info-address">
                 <p><strong>country: </strong>
                 {user.store.country} <br />
                 <strong>city: </strong>
                 {user.store.city} <br />
                 <strong>address: </strong>
                 {user.store.address}<br />
                 <strong>zip code: </strong>
                 {user.store.postCode}</p>
                </div>
                <div className="info-description">
                 <p><strong>description:</strong><br />
                 {user.store.description} </p>
                </div>
                <Link to={`/store/${user.store.id}`} >
                        <Button>Go to store</Button>
                </Link>
                    <UpdateStoreForm /> 
             </Jumbotron>
            </Container>  
                )   
            })}
        <div>
        </div>
    </>        
    )
}