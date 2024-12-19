import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

// Danh sách thẻ có sẵn
const AVAILABLE_TAGS = [
  "Web Development",
  "App Development", 
  "Game Development",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Cloud Computing",
  "Cyber Security",
  "Blockchain",
  "Mobile Development",
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Database",
  "Programming Languages",
  "Software Testing",
  "UI/UX Design",
  "Digital Marketing",
  "Business",
  "Other"
]

export default function ChipInput({ label, name, placeholder, register, errors, setValue }) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [chips, setChips] = useState([])
  const [selectedTag, setSelectedTag] = useState("")

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag)
    }
    register(name, { 
      required: true,
      validate: (value) => {
        if (!value || value.length === 0) {
          return "Vui lòng chọn ít nhất một thẻ"
        }
        return true
      }
    })
  }, [])

  useEffect(() => {
    setValue(name, chips)
  }, [chips])

  const handleTagSelect = (e) => {
    const tag = e.target.value
    if (tag && !chips.includes(tag)) {
      const newChips = [...chips, tag]
      setChips(newChips)
      setValue(name, newChips)
      setSelectedTag("") // Reset selection
    }
  }

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
    setValue(name, newChips)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-col gap-y-2">
        <select
          value={selectedTag}
          onChange={handleTagSelect}
          className="form-style w-full cursor-pointer"
        >
          <option value="">Chọn thẻ</option>
          {AVAILABLE_TAGS.map((tag) => (
            <option key={tag} value={tag} disabled={chips.includes(tag)}>
              {tag}
            </option>
          ))}
        </select>

        <div className="flex w-full flex-wrap gap-2">
          {chips?.map((chip, index) => (
            <div
              key={index}
              className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
            >
              {chip}
              <button
                type="button"
                className="ml-2 focus:outline-none"
                onClick={() => handleDeleteChip(index)}
              >
                <MdClose className="text-sm" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {errors[name]?.message || `${label} là bắt buộc`}
        </span>
      )}
    </div>
  )
}
