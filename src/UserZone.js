import React, {useEffect, useState} from "react"
import './App.css';
import ringer1 from "./Background.mp3";
import axios from "axios";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Switch,
    BrowserRouter,
    NavLink,
    Outlet,
    Navigate
} from "react-router-dom";
import Cookies from "universal-cookie";

import DashBoard from "./Dashboard";
import Logout from "./Logout";
import Bet from "./Bet";
import Login from "./Login";
import Signup from "./Signup";
function UserZone (){
    const [username, setUsername] = useState('');
    const [money, setMoney] = useState(0);
    const [secret,setSecret,] = useState(null);
    const [email,setEmail]=useState('');
    const [navTo, setNavTo] = useState(false);
    const [errorCode, setErrorCode] = useState(null);
    const [BGAudio,setBGAudio]=useState(new Audio(ringer1));
    // BGAudio:
    useEffect(() => {
        const cookies = new Cookies();
        const getCookies = () => {
            try {
                setUsername(cookies.get('username') || '');
                setMoney(cookies.get('money') || '');
                setSecret(cookies.get('secret') || '');
                setEmail(cookies.get('email')||'');

            } catch (error) {
                console.error('Error getting cookies:', error);
            }
        };
        const enter=()=>{const secret1=cookies.get('secret');if (secret1!=""&&secret1!=undefined&&secret1!=null){setNavTo(false)}else {setNavTo(true)}}
        getCookies();
        updateStats();
        const intervalId = setInterval(getCookies, 1000); // Check every second
        const intervalId2=setInterval(enter,2000);
        const intervalId3= setInterval(updateStats,1000);
        return () =>{clearInterval(intervalId);clearInterval(intervalId2); clearInterval(intervalId3)};  // Cleanup on unmount
    }, []);
    const sound=(audio)=>{
        audio.autoplay=true;
        audio.play();
    }

    const updateStats=()=>{

        axios.get("http://localhost:9124/constant-update",{params:{
                secret:secret
            }}).then(res=>{
            const update=res.data;console.log(update);
            //const getChoices=update.games.map((q)=>{return q.game_id+": "+q.game_name});
            if (update.success){

                const cookies=new Cookies(null, { path: '/' });
                cookies.set('username',update.user.username);
                cookies.set("email",update.user.email);
                cookies.set("secret",update.user.secret);
                cookies.set("money",update.user.money);
                setUsername(update.user.username);
                setEmail(update.user.email);
                setSecret(update.user.secret);
                setMoney(update.user.money);
                console.log(money);
            }else {
                setErrorCode(update.errorCode);
            }

        });
    };
    const errorMessage=()=>{
        let message="";
        if(errorCode!=null){
            if(errorCode==5){
                message="email or password are wrong ";
            }else if(errorCode==9){
                message="email is already taken";
            }else if(errorCode==14){
                message="password does not match as requested";
            }else if(errorCode==16){
                message="no email";
            }else if(errorCode==2){
                message="no password";
            }else if(errorCode==16){
                message="no email";
            }else if(errorCode==7){
                message="no relevant cookies";
            }else if(errorCode==13){
                message="game already started";
            }else if(errorCode==10){
                message="invalid guess";
            }else if(errorCode==11){
                message="game not available";
            }else if (errorCode==8){
                message="no such user";
            }alert("error: "+message);
            setErrorCode(null);
            setUsername("");

        }

    }



    return (
            <div className="App">
                {updateStats()}
                {(navTo)&&<Navigate to={"/"}/>}
                    <div align={"horizontal"}>
                        <h1>Welcome {username}</h1>
                        <h3>balance:{money}</h3>
                        <div className={"input"}>
                            <NavLink className={"value"} to={'/user-zone/dashboard'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="svg8">
                                    <g transform="translate(-33.022 -30.617)" id="layer1">
                                        <path
                                            d="m49.021 31.617c-2.673 0-4.861 2.188-4.861 4.861 0 1.606.798 3.081 1.873 3.834h-7.896c-1.7 0-3.098 1.401-3.098 3.1s1.399 3.098 3.098 3.098h4.377l.223 2.641s-1.764 8.565-1.764 8.566c-.438 1.642.55 3.355 2.191 3.795s3.327-.494 3.799-2.191l2.059-5.189 2.059 5.189c.44 1.643 2.157 2.631 3.799 2.191s2.63-2.153 2.191-3.795l-1.764-8.566.223-2.641h4.377c1.699 0 3.098-1.399 3.098-3.098s-1.397-3.1-3.098-3.1h-7.928c1.102-.771 1.904-2.228 1.904-3.834 0-2.672-2.189-4.861-4.862-4.861zm0 2c1.592 0 2.861 1.27 2.861 2.861 0 1.169-.705 2.214-1.789 2.652-.501.203-.75.767-.563 1.273l.463 1.254c.145.393.519.654.938.654h8.975c.626 0 1.098.473 1.098 1.1s-.471 1.098-1.098 1.098h-5.297c-.52 0-.952.398-.996.916l-.311 3.701c-.008.096-.002.191.018.285 0 0 1.813 8.802 1.816 8.82.162.604-.173 1.186-.777 1.348s-1.184-.173-1.346-.777c-.01-.037-3.063-7.76-3.063-7.76-.334-.842-1.525-.842-1.859 0 0 0-3.052 7.723-3.063 7.76-.162.604-.741.939-1.346.777s-.939-.743-.777-1.348c.004-.019 1.816-8.82 1.816-8.82.02-.094.025-.189.018-.285l-.311-3.701c-.044-.518-.477-.916-.996-.916h-5.297c-.627 0-1.098-.471-1.098-1.098s.472-1.1 1.098-1.1h8.975c.419 0 .793-.262.938-.654l.463-1.254c.188-.507-.062-1.07-.563-1.273-1.084-.438-1.789-1.483-1.789-2.652.001-1.591 1.271-2.861 2.862-2.861z"
                                            id="path26276" fill="#7D8590"></path>
                                    </g>
                                </svg>
                                dashboard</NavLink>
                            <NavLink className={"value"} to={'/user-zone/bet'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="svg8">
                                    <g transform="translate(-33.022 -30.617)" id="layer1">
                                        <path
                                            d="m49.021 31.617c-2.673 0-4.861 2.188-4.861 4.861 0 1.606.798 3.081 1.873 3.834h-7.896c-1.7 0-3.098 1.401-3.098 3.1s1.399 3.098 3.098 3.098h4.377l.223 2.641s-1.764 8.565-1.764 8.566c-.438 1.642.55 3.355 2.191 3.795s3.327-.494 3.799-2.191l2.059-5.189 2.059 5.189c.44 1.643 2.157 2.631 3.799 2.191s2.63-2.153 2.191-3.795l-1.764-8.566.223-2.641h4.377c1.699 0 3.098-1.399 3.098-3.098s-1.397-3.1-3.098-3.1h-7.928c1.102-.771 1.904-2.228 1.904-3.834 0-2.672-2.189-4.861-4.862-4.861zm0 2c1.592 0 2.861 1.27 2.861 2.861 0 1.169-.705 2.214-1.789 2.652-.501.203-.75.767-.563 1.273l.463 1.254c.145.393.519.654.938.654h8.975c.626 0 1.098.473 1.098 1.1s-.471 1.098-1.098 1.098h-5.297c-.52 0-.952.398-.996.916l-.311 3.701c-.008.096-.002.191.018.285 0 0 1.813 8.802 1.816 8.82.162.604-.173 1.186-.777 1.348s-1.184-.173-1.346-.777c-.01-.037-3.063-7.76-3.063-7.76-.334-.842-1.525-.842-1.859 0 0 0-3.052 7.723-3.063 7.76-.162.604-.741.939-1.346.777s-.939-.743-.777-1.348c.004-.019 1.816-8.82 1.816-8.82.02-.094.025-.189.018-.285l-.311-3.701c-.044-.518-.477-.916-.996-.916h-5.297c-.627 0-1.098-.471-1.098-1.098s.472-1.1 1.098-1.1h8.975c.419 0 .793-.262.938-.654l.463-1.254c.188-.507-.062-1.07-.563-1.273-1.084-.438-1.789-1.483-1.789-2.652.001-1.591 1.271-2.861 2.862-2.861z"
                                            id="path26276" fill="#7D8590"></path>
                                    </g>
                                </svg>
                                bet</NavLink>
                            <NavLink className="value" to={"/user-zone/edit"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Line">
                                    <path
                                        d="m17.074 30h-2.148c-1.038 0-1.914-.811-1.994-1.846l-.125-1.635c-.687-.208-1.351-.484-1.985-.824l-1.246 1.067c-.788.677-1.98.631-2.715-.104l-1.52-1.52c-.734-.734-.78-1.927-.104-2.715l1.067-1.246c-.34-.635-.616-1.299-.824-1.985l-1.634-.125c-1.035-.079-1.846-.955-1.846-1.993v-2.148c0-1.038.811-1.914 1.846-1.994l1.635-.125c.208-.687.484-1.351.824-1.985l-1.068-1.247c-.676-.788-.631-1.98.104-2.715l1.52-1.52c.734-.734 1.927-.779 2.715-.104l1.246 1.067c.635-.34 1.299-.616 1.985-.824l.125-1.634c.08-1.034.956-1.845 1.994-1.845h2.148c1.038 0 1.914.811 1.994 1.846l.125 1.635c.687.208 1.351.484 1.985.824l1.246-1.067c.787-.676 1.98-.631 2.715.104l1.52 1.52c.734.734.78 1.927.104 2.715l-1.067 1.246c.34.635.616 1.299.824 1.985l1.634.125c1.035.079 1.846.955 1.846 1.993v2.148c0 1.038-.811 1.914-1.846 1.994l-1.635.125c-.208.687-.484 1.351-.824 1.985l1.067 1.246c.677.788.631 1.98-.104 2.715l-1.52 1.52c-.734.734-1.928.78-2.715.104l-1.246-1.067c-.635.34-1.299.616-1.985.824l-.125 1.634c-.079 1.035-.955 1.846-1.993 1.846zm-5.835-6.373c.848.53 1.768.912 2.734 1.135.426.099.739.462.772.898l.18 2.341 2.149-.001.18-2.34c.033-.437.347-.8.772-.898.967-.223 1.887-.604 2.734-1.135.371-.232.849-.197 1.181.089l1.784 1.529 1.52-1.52-1.529-1.784c-.285-.332-.321-.811-.089-1.181.53-.848.912-1.768 1.135-2.734.099-.426.462-.739.898-.772l2.341-.18h-.001v-2.148l-2.34-.18c-.437-.033-.8-.347-.898-.772-.223-.967-.604-1.887-1.135-2.734-.232-.37-.196-.849.089-1.181l1.529-1.784-1.52-1.52-1.784 1.529c-.332.286-.81.321-1.181.089-.848-.53-1.768-.912-2.734-1.135-.426-.099-.739-.462-.772-.898l-.18-2.341-2.148.001-.18 2.34c-.033.437-.347.8-.772.898-.967.223-1.887.604-2.734 1.135-.37.232-.849.197-1.181-.089l-1.785-1.529-1.52 1.52 1.529 1.784c.285.332.321.811.089 1.181-.53.848-.912 1.768-1.135 2.734-.099.426-.462.739-.898.772l-2.341.18.002 2.148 2.34.18c.437.033.8.347.898.772.223.967.604 1.887 1.135 2.734.232.37.196.849-.089 1.181l-1.529 1.784 1.52 1.52 1.784-1.529c.332-.287.813-.32 1.18-.089z"
                                        id="XMLID_1646_" fill="#7D8590"></path>
                                    <path
                                        d="m16 23c-3.859 0-7-3.141-7-7s3.141-7 7-7 7 3.141 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                                        fill="#7D8590" id="XMLID_1645_"></path>
                                </svg>
                                edit profile
                            </NavLink>
                            <NavLink className={"value"} to={'/user-zone/logout'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="svg8">
                                    <g transform="translate(-33.022 -30.617)" id="layer1">
                                        <path
                                            d="m49.021 31.617c-2.673 0-4.861 2.188-4.861 4.861 0 1.606.798 3.081 1.873 3.834h-7.896c-1.7 0-3.098 1.401-3.098 3.1s1.399 3.098 3.098 3.098h4.377l.223 2.641s-1.764 8.565-1.764 8.566c-.438 1.642.55 3.355 2.191 3.795s3.327-.494 3.799-2.191l2.059-5.189 2.059 5.189c.44 1.643 2.157 2.631 3.799 2.191s2.63-2.153 2.191-3.795l-1.764-8.566.223-2.641h4.377c1.699 0 3.098-1.399 3.098-3.098s-1.397-3.1-3.098-3.1h-7.928c1.102-.771 1.904-2.228 1.904-3.834 0-2.672-2.189-4.861-4.862-4.861zm0 2c1.592 0 2.861 1.27 2.861 2.861 0 1.169-.705 2.214-1.789 2.652-.501.203-.75.767-.563 1.273l.463 1.254c.145.393.519.654.938.654h8.975c.626 0 1.098.473 1.098 1.1s-.471 1.098-1.098 1.098h-5.297c-.52 0-.952.398-.996.916l-.311 3.701c-.008.096-.002.191.018.285 0 0 1.813 8.802 1.816 8.82.162.604-.173 1.186-.777 1.348s-1.184-.173-1.346-.777c-.01-.037-3.063-7.76-3.063-7.76-.334-.842-1.525-.842-1.859 0 0 0-3.052 7.723-3.063 7.76-.162.604-.741.939-1.346.777s-.939-.743-.777-1.348c.004-.019 1.816-8.82 1.816-8.82.02-.094.025-.189.018-.285l-.311-3.701c-.044-.518-.477-.916-.996-.916h-5.297c-.627 0-1.098-.471-1.098-1.098s.472-1.1 1.098-1.1h8.975c.419 0 .793-.262.938-.654l.463-1.254c.188-.507-.062-1.07-.563-1.273-1.084-.438-1.789-1.483-1.789-2.652.001-1.591 1.271-2.861 2.862-2.861z"
                                            id="path26276" fill="#7D8590"></path>
                                    </g>
                                </svg>
                                log out</NavLink>
                            <div>
                                <label>Background music:</label>
                            </div>
                            <button
                                onClick={() => {
                                    BGAudio.loop = true;
                                    BGAudio.autoplay = true;
                                    BGAudio.play();
                                }}
                            >Play
                            </button>
                            <button onClick={() => (BGAudio.pause())}>Pause</button>
                        </div>
                        <div><Outlet/></div>
                    </div>


            </div>
    );


}

export default UserZone;