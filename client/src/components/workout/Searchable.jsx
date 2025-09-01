import { useEffect, useRef, useState } from "react"
import styles from "../../styles/Searchable.module.css"

function NewExercise(props) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])
  function getDisplayValue() {
    if (query) return query
    return props.selectedVal
  }
  function toggle(event) {
    setIsOpen(event && event.target === inputRef.current)
  }
  function filter(options) {
    return options.filter((option) => option[props.label].toLowerCase().includes(query.toLowerCase()))
  }
  function selectOption(option) {
    console.log(option.label)
    props.addNewExercise(option)
    setQuery("")
    props.handleChange(option[props.label])
    setIsOpen((isOpen) => !isOpen)

    if (props.onSelect) {
      props.onSelect(option)
    }
  }
  return (
    <div className={styles.dropdown}>
      <div className={styles.control}>
        <div className={styles.selectedValue}>
          <input
            placeholder="Select exercise"
            ref={inputRef}
            value={getDisplayValue()}
            type="text"
            name="searchTerm"
            onChange={(event) => {
              setQuery(event.target.value)
              props.handleChange(null)
            }}
            onClick={toggle}
          />
        </div>
      </div>
      <div className={`${styles.arrow} ${isOpen ? styles.open : ""}`} />
      <div className={`${styles.options} ${isOpen ? styles.open : ""}`}>
        {filter(props.options).map((option, index) => {
          return (
            <div
              onClick={() => {
                selectOption(option)
              }}
              className={`${styles.option} ${option[props.label] === props.selectedVal ? styles.selected : ""}`}
              key={`${props.id}-${index}`}
            >
              {option[props.label]}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default NewExercise
