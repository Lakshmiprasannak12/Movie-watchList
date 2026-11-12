import React,{useState,useEffect}from "react";
import "./App.css";
function App(){
  const[title,setTitle]=useState("");
  const[genre,setGenre]=useState("");
  const[rating,setRating]=useState("");
  const [status, setStatus] = useState("Plan to Watch");
  const[movies,setMovies]=useState([]);
  const[editId,setEditId]=useState(null);
  const[search,setSearch]=useState("");
  const[filtergenre,setFilterGenre]=useState("All");
  const[filterstatus,setFilterStatus]=useState("All");
  

  const getMovies = async () => { 
    const response = await fetch("http://localhost:3000/movies");
    const data = await response.json(); 
    setMovies(data); 
  };
  useEffect(() => { 
    getMovies(); 
  }, 
  []);
  const addMovie = async (e) => {
     e.preventDefault(); 
     const movie = {
      title: title,
      genre: genre, 
      rating: Number(rating),
      status: status
     };
     if(editId){
      await fetch("http://localhost:3000/movies/" + editId, {
         method: "PUT", 
         headers: {
           "Content-Type": "application/json"
          }, 
         body: JSON.stringify(movie) 
        });
        setEditId(null);
      }
      else{
      await fetch("http://localhost:3000/movies",
       {
         method: "POST", 
         headers: {
           "Content-Type": "application/json"
          }, 
         body: JSON.stringify(movie) 
        });
      }
    
        setTitle(""); 
        setGenre(""); 
        setRating("");
        setStatus("Plan to Watch");
        getMovies(); 
      };
      const editMovie=(movie)=>{
        setTitle(movie.title);
        setGenre(movie.genre);
        setRating(movie.rating);
        setStatus(movie.status);
        setEditId(movie._id);
      };
      const deleteMovie = async (id) => { 
        await fetch("http://localhost:3000/movies/" + id, { 
          method: "DELETE" }); 
          getMovies(); 
        };
  return(
    <div className="container">
      <h2>Movie Watchlist</h2>
        <form onSubmit={addMovie} className="movie-form">
        <input
        type="text"
        placeholder="enter movie title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        required
        />
        <input
        type="text"
        placeholder="enter genre"
        value={genre}
        onChange={(e)=>setGenre(e.target.value)}
        required
        />
        <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e)=>setRating(e.target.value)}
        required
        />
        <select className="movie"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Plan to Watch">Plan to Watch</option>
          <option value="Watching">Watching</option>
          <option value="Watched">Watched</option>
        </select>
        <div className="filter-box">
          <select className="filter"
            value={filtergenre}
            onChange={(e)=>setFilterGenre(e.target.value)}
            >
              <option value="All">All Genre</option>
              <optoin value="horror">horror</optoin>
              <option value="thriller">thriller</option>
              <optin value="comedy">comedy</optin>
              <option  value="sci-Fi">sci-Fi</option>
              <option value="drama">drama</option>
              <option value="Fantasy">Fantasy</option>
          </select>
          <select className="filter"
          value={filterstatus}
          onChange={(e)=>setFilterStatus(e.target.value)}
          >
            <option value="All">All status</option>
            <option value="plan to watch">plane to watch</option>
            <option value="Watching">Watching</option>
            <option value="Watched">Watched</option>
          </select>
        </div>
        <button type="submit">
          {editId ? "Update Movie" : "Add Movie"}
        </button>
      </form>
      <div className="search-box">
        <input
        type="text"
        placeholder="search movie by title"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
        </div>
      <h2>My Movies</h2>
      <div className="list">
        {movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
  )
    .filter((movie)=>
      filtergenre ==="All"||
      movie.genre.toLowerCase()===filtergenre.toLowerCase()
    )
    .filter((movie)=>
      filterstatus==="All"||
    movie.status.toLowerCase()===filterstatus.toLowerCase()
    )
         .map((movie)=>(
          <div className="card"key={movie._id}>
            <h3>{movie.title}</h3>
            <p>Genre:{movie.genre}</p>
            <p>Rating:{movie.rating}</p>
            <p>Status:{movie.status}</p>
            <button
              type="button"
              onClick={()=>editMovie(movie)}>
                Edit
            </button>
            <button 
            type="button"
            onClick={()=>deleteMovie(movie._id)}>
              Delete
            </button>
            </div>
        ))}
      </div>
    </div>
  );
}
export default App;