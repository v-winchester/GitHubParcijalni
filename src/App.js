import {useState} from 'react';

const App = () => {
  const [username, setData] = useState({username: []});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  

  const handleClick = async () => {
    setIsLoading(true);

    try {
      

      // -- pass user input to url??
      const response = await fetch('https://api.github.com/users/'+{username}, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div style={{textAlign: "center"}}>

      <form />
      <label for="username">GitHub username:</label><br/>
      <input type="text" id="username" placeholder='e.g. facebook'/><br/>

      <button onClick={handleClick}>Go !</button>

      {isLoading && <h3>Loading...</h3>}
      {err && <h2>{err}</h2>}

      <div key={username.name}>
            <li>{username.avatar_url}</li>
            <li>{username.location}</li>
            <li>{username.bio}</li>
    </div>
    </div>
  );
};

export default App;
