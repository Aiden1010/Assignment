import { useEffect, useState, useMemo } from "react";
import "./App.css";
import Character from "./components/Character/Character";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [originalCharactersList, setOriginalCharactersList] = useState([]);
  const [charactersList, setCharactersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [selectedOption, setSelectedOption] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 20;
  const dropDownOptions = ["All", "Alive", "Dead", "Unknown"];

  useEffect(() => {
    retrieveCharacters(pageNo);
  }, [pageNo]);

  useEffect(() => {
    setCharactersList(originalCharactersList);
  }, [originalCharactersList]);

  const retrieveCharacters = async (page) => {
    setLoading(true);
    let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    console.log(url);
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setCharactersList([]);
          setTotalPages(0);
          setPageNo(1);
        } else {
          const totalCount = data.info.count;
          const pages = Math.ceil(totalCount / itemsPerPage);
          setTotalPages(pages);
          setCharactersList(data.results);
          setOriginalCharactersList(data.results);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const filteredCharacters = useMemo(() => {
    return originalCharactersList.filter(
      (character) =>
        character.name.toLowerCase().includes(searchInput.toLowerCase()) &&
        (selectedOption === "All" ||
          character.status.toLowerCase() === selectedOption.toLowerCase())
    );
  }, [originalCharactersList, searchInput, selectedOption]);

  useEffect(() => {
    setCharactersList(filteredCharacters);
  }, [filteredCharacters]);

  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue === "") {
      setCharactersList(originalCharactersList);
    }
  };

  const handleDropdownChange = (e) => {
    const { value } = e.target;
    setSelectedOption(value);
  };

  return (
    <div className="character-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search character..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select value={selectedOption} onChange={handleDropdownChange}>
          {dropDownOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="character-grid">
        {charactersList.length > 0 ? (
          charactersList.map(({ id, name, image, status }) => (
            <Character key={id} name={name} image={image} status={status} />
          ))
        ) : (
          <p className="no-characters">No characters found.</p>
        )}
      </div>
      <Pagination
        loading={loading}
        pageNo={pageNo}
        setPageNo={setPageNo}
        totalPages={totalPages}
      />
    </div>
  );
}

export default App;
