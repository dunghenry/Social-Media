import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const LoadingToRedirect = () => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        count === 0 && navigate('/login')
        return () => clearInterval(interval)
    }, [count, navigate])
  return (
      <div className="text-center text-lg" style={{marginTop: "120px"}}>
          <h5 className="text-gray-500">Redirecting you in <span className="underline hover:underline-offset-4 font-semibold text-orange-400">{"0" + count}</span> seconds</h5>
    </div>
  )
}

export default LoadingToRedirect