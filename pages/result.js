
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Result() {
  const router = useRouter()
  const { jobId } = router.query
  const [data, setData] = useState(null)

  useEffect(() => {
    if (jobId) {
      fetch(`/api/job?jobId=${jobId}`)
        .then(res => res.json())
        .then(setData)
    }
  }, [jobId])

  const share = (platform) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent("Schau dir mein KI-generiertes Traumbild an!")
    if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
    if (platform === 'whatsapp') window.open(`https://wa.me/?text=${text}%20${url}`, '_blank')
    if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-gray-100">
      <div className="flex flex-col items-center justify-center flex-1 p-4 md:p-8 space-y-6">
        <motion.h1 className="text-2xl md:text-3xl font-bold text-center" initial={{opacity:0}} animate={{opacity:1}}>Dein Traumbild</motion.h1>
        {data?.image ? (
          <motion.img 
            src={data.image} 
            alt="Traumbild" 
            className="mb-6 max-w-full md:max-w-md border-8 border-white dark:border-gray-700 rounded-lg shadow-lg"
            initial={{scale:0.9, opacity:0}} 
            animate={{scale:1, opacity:1}}
            transition={{duration:0.6}}
          />
        ) : (
          <p className="italic">Lade Bild...</p>
        )}
        <motion.div 
          className="w-full max-w-2xl text-left bg-white dark:bg-gray-800 p-4 md:p-6 rounded shadow space-y-3"
          initial={{opacity:0, y:20}} 
          animate={{opacity:1, y:0}}
          transition={{delay:0.3}}
        >
          <h2 className="text-lg md:text-xl font-semibold flex items-center space-x-2">
            <span>🌙</span><span>Traumdeutung</span>
          </h2>
          <p className="text-sm md:text-base">{data?.interpretation || 'Keine Traumdeutung vorhanden.'}</p>
        </motion.div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
          <button className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 w-full sm:w-auto">High-Res Download</button>
          <button className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700 w-full sm:w-auto">Poster bestellen</button>
        </div>
        <div className="flex space-x-2 sm:space-x-4 mt-4">
          <button onClick={()=>share('twitter')} className="px-4 py-2 bg-blue-400 rounded text-white">Twitter</button>
          <button onClick={()=>share('whatsapp')} className="px-4 py-2 bg-green-500 rounded text-white">WhatsApp</button>
          <button onClick={()=>share('facebook')} className="px-4 py-2 bg-blue-800 rounded text-white">Facebook</button>
        </div>
      </div>
    </div>
  )
}
