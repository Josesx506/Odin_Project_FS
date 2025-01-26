function Circle() {
    return (
    <>
    <h1>Test title</h1>
    <div className="container*">
        <svg>
            <circle cx="25" cy="75" r="20" stroke="green" fill="white" strokeWidth="6" style={{color: "white"}} />
        </svg>
    </div>
    <form>
        <input type="text" />
    </form>
    </>
    );
}

export { Circle }