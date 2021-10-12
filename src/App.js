import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Axios from 'axios';

import "./App.css";
function App() {
  const[usernameReg,setUsernameReg]= useState("");
  const[passwordReg,setPasswordReg]=useState("");

  const [username,setUsername]= useState("");
  const[password,setPassword]=useState("");
  const[loginStatus,setLoginStatus]=useState("");
  const register = ()=>{
    Axios.post("http://localhost3001/register",{
      username:usernameReg,
      password:passwordReg,

    }).then((response)=>{
      console.log(response);
    });
  };

  const Login= ()=>{
    Axios.post("http://localhost3001/Login",{
      username:username,
      password:password,

    }).then((response)=>{

      if(response.data.message){
      setLoginStatus(response.data.messaage);
    }else{
      setLoginStatus(response.data[0].username);
    }
      
    });
  };
 
	const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [search, SetSearch] = useState("");

	const GetTopAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
			.then(res => res.json());

		SetTopAnime(temp.top.slice(0, 5));
	}

	const HandleSearch = e => {
		e.preventDefault();

		FetchAnime(search);
	}

	const FetchAnime = async (query) => {
		const temp = await fetch("https://jikan.me/api/v1.1/manga/1/characters_staff")
    
			.then(res => res.json());

		SetAnimeList(temp.results);
	}

	useEffect(() => {
		GetTopAnime();
	}, []);
	
	return (
		<div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>UserName</label>
        <input type="text"
         onChange={(e)=>{
        setUsernameReg(e.target.value);
        }}
          />
        <label>Password</label>
        <input type="text"
        onChange={(e)=>{
          setUsernameReg(e.target.value);
          }}/>
        <button onClick={register}>Register</button>
        
        <div className="login">
          <h1>Login</h1>
          <input type="text" 
           placeholder="Username"/>
<input type="password"
 placeholder="password.."
 onChange={(e)=>{
   setUsername(e.target.value);
 }}
 />
 <input type="password"
 placeholder="Password.."
 onChange={(e)=>{
   setPassword(e.target.value);
 }}
   />
 <button onClick={Login}>Login</button>
        </div>
        </div>
        <h1>{loginStatus}</h1>



			<Header />
			<div className="content-wrap">
				<Sidebar 
					topAnime={topAnime} />
				<MainContent
					HandleSearch={HandleSearch}
					search={search}
					SetSearch={SetSearch}
					animeList={animeList} />
			</div>
		</div>
	);
}

export default App;