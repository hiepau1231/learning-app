import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const defaultImg = "https://res.cloudinary.com/dxrqvqyzn/image/upload/v1709133099/Study-Notion/default-thumbnail_iqpx6e.jpg"

const Img = ({ src, className, alt }) => {
    const [imgSrc, setImgSrc] = useState(defaultImg)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if (src) {
            // Validate and clean the URL
            const url = src.trim()
            if (url) {
                setImgSrc(url)
            }
        }
    }, [src])

    const handleError = () => {
        console.log("Image failed to load:", src)
        setImgSrc(defaultImg)
        setLoading(false)
    }

    const handleLoad = () => {
        setLoading(false)
    }

    return (
        <div className={`relative ${className}`}>
            <LazyLoadImage
                className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'}`}
                alt={alt || 'Image'} 
                effect='blur'
                src={imgSrc}
                onError={handleError}
                onLoad={handleLoad}
                placeholderSrc={defaultImg}
                wrapperClassName="w-full h-full"
            />
            {loading && (
                <div className="absolute inset-0 bg-richblack-700 animate-pulse"></div>
            )}
        </div>
    )
}

export default Img