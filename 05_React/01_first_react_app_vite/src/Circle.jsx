function Circle() {
    return (
    <>
    <div className="container">
        <svg width="50px" height="50px">
            <circle cx="50%" cy="50%" r="20" stroke="green" fill="white" 
            strokeWidth="6" style={{color: "white", margin:0}} />
        </svg>
    </div>
    <form>
        <input type="text" />
    </form>
    </>
    );
}

export { Circle }