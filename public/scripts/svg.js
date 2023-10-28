function rotateSVG(svg) {
    const svgElement = svg.closest('.float, .clear').querySelector('svg');
    let degrees = 0;
    if (svgElement) {
        const currentRotation = svgElement.getAttribute('transform');
        let newRotation = '';

        if (currentRotation) {
            const openingParenthesisIndex = currentRotation.indexOf('(');
            const closingParenthesisIndex = currentRotation.indexOf(')');
            const currentRotationValue =
                currentRotation.slice(openingParenthesisIndex + 1, closingParenthesisIndex);
            if (currentRotationValue) {
                degrees = parseInt(currentRotationValue);
            }
        }
        newRotation = `rotate(${degrees + 90})`;
        svgElement.setAttribute('transform', newRotation);
    }
}
function requestSvgFullscreen(svg){
    const svgElement = svg.closest('.float, .clear').querySelector('svg');

    if (svgElement.requestFullscreen) {
        svgElement.requestFullscreen();
    } else if (svgElement.mozRequestFullScreen) { // Firefox
        svgElement.mozRequestFullScreen();
    } else if (svgElement.webkitRequestFullscreen) { // Chrome, Safari und Opera
        svgElement.webkitRequestFullscreen();
    } else if (svgElement.msRequestFullscreen) { // Internet Explorer
        svgElement.msRequestFullscreen();
    }
}