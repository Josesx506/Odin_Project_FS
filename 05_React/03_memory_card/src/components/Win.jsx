import Confetti, { useDimensions } from 'react-confetti'
import { useWindowSize } from 'react-use'
import '@/styles/Win.css'

export default function Win() {
    const { width, height } = useWindowSize();

    // confetti https://www.npmjs.com/package/react-confetti
    // wavy animation - https://www.youtube.com/watch?v=m1ZKHPbnyjo
    return (
        <div className="win-cntr">
            <Confetti width={width} height={height} />
            <div className="win-game">
                <span style={{ "--i": 1 }}>Y</span>
                <span style={{ "--i": 2 }}>o</span>
                <span style={{ "--i": 3 }}>u</span>
                <span style={{ "--i": 4 }}>&nbsp;</span>
                <span style={{ "--i": 5 }}>w</span>
                <span style={{ "--i": 6 }}>o</span>
                <span style={{ "--i": 7 }}>n</span>
                <span style={{ "--i": 8 }}>!</span>
                <span style={{ "--i": 9 }}>!</span>
                <span style={{ "--i": 10 }}>!</span>
                <span style={{ "--i": 11 }}>!</span>
            </div>
        </div>
    )
}
