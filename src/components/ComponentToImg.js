import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { exportComponentAsPNG } from "react-component-export-image";
import './CoverImage.css'
import domtoimage from 'dom-to-image'
import { ImgContext } from '../utils/ImgContext'
import unsplash from '../utils/unsplashConfig'

function ComponentToImg(props) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const { unsplashImage } = useContext(ImgContext)
  const componentRef = React.createRef()

  async function saveImage(data) {
    const a = document.createElement('A')
    a.href = data
    a.download = 'cover.png'
    document.body.appendChild(a)
    setLoading(false)

    a.click()
    document.body.removeChild(a)
  }

  const downloadImage = async () => {
    // exportComponentAsPNG(componentRef, 'cover')
    setLoading(true)

    const element = componentRef.current

    // console.log(element)
    // console.log(element.offsetHeight)

    const data = await domtoimage.toPng(componentRef.current, {
      height: element.offsetHeight * 2,
      width: element.offsetWidth * 2,
      style: {
        transform: `scale(${2})`,
        transformOrigin: 'top left',
        width: `${element.offsetWidth}px`,
        height: `${element.offsetHeight}px`,
      },
    })

    // console.log(data)
    await saveImage(data)

    if (unsplashImage) {
      unsplash.photos.trackDownload({ downloadLocation: unsplashImage.downloadLink })
    }
  }

  return (
    <div className="md:w-2/3 flex m-6 flex-col items-center justify-center">
      <div className="w-full" ref={componentRef}>{props.children}</div>
      <button
        className="border p-2 bg-gray-700 hover:bg-gray-800 flex items-center text-white text-xl rounded-lg m-4 px-4"
        onClick={() => downloadImage()}
      >
        <span>
          {loading ? (
            <svg
              className="w-6 h-6 text-white animate animate-spin"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          )}
        </span>

        <span className="mx-2">{t('editor.downloadBtn')}</span>
      </button>
    </div>
  )
}

export default ComponentToImg
