import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"
import Img from './../../common/Img';

function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <div className='hover:scale-[1.03] transition-all duration-200 z-50 bg-richblack-800 rounded-xl p-4 min-w-[400px] mx-4'>
      <Link to={`/courses/${course._id}`}>
        <div className="flex flex-col">
          <div className="w-full h-[200px] rounded-lg overflow-hidden">
            <Img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="w-full h-full rounded-xl object-cover hover:scale-110 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col gap-3 px-4 py-4">
            <p className="text-xl font-semibold text-richblack-5 line-clamp-2">{course?.courseName}</p>
            <p className="text-base text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-lg text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-sm text-richblack-400">
                {course?.ratingAndReviews?.length} Đánh giá
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-25">{course?.studentsEnrolled?.length || 0}</span>
              <span className="text-richblack-300">học viên</span>
            </div>
            <p className="text-xl font-bold text-richblack-5">
              {course?.price === 0 ? "Miễn phí" : `${course?.price} VNĐ`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_Card
