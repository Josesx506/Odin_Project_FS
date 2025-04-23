function isClickInBox(clickX, clickY, imageWidth, imageHeight, box) {
    const percentX = (clickX / imageWidth) * 100;
    const percentY = (clickY / imageHeight) * 100;

    return (
        percentX >= box.left &&
        percentX <= box.left + box.width &&
        percentY >= box.top &&
        percentY <= box.top + box.height
    );
}