
import { useSelector, useDispatch } from "react-redux"
import { changeFilter } from "../../redux/filtersSlice"
import styles from "./SearchBox.module.css"


const SearchBox = () => {
  const filter = useSelector(state => state.filters.name)
  const dispatch = useDispatch()

  return (
    <div className={styles.searchBox}>
      <label htmlFor="search">Find contacts by name</label>
      <input
        className={styles.input}
        id="search"
        type="text"
        value={filter}
        onChange={e => dispatch(changeFilter(e.target.value))}
        placeholder="Enter name to search..."
      />
    </div>
  )
}

export default SearchBox
