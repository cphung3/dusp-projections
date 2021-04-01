import React, { useRef, useState, useEffect } from 'react'
import { timer, drag, select, geoPath, geoOrthographic } from "d3";

/**
 * Snippet from https://dev.to/muratkemaldar/interactive-world-map-with-d3-geo-498
 * 
 * @param {Object} data GeoJson map
 * @param {Integer} size parameter used for width and height
 * @returns 
 */
export default function Map({data, size}) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [isRotating, setIsRotating] = useState(true)

    const sensitivity = 75
    // function stopRotate() {
    //     setIsRotating(false)
    //     // isRotating.stop();
    // }
    // function resumeRotate() {
    //     setIsRotating(true)
    //     // isRotating.restart();
    // }

    useEffect(() => {
        const svg = select(svgRef.current);

        const projection = geoOrthographic().fitSize([size, size], data);
        let path = geoPath().projection(projection);

        svg
            .selectAll('.country')
            .data(data.features)
            .join("path")
            .on("click", feature => {
                setSelectedCountry(selectedCountry === feature ? null : feature)
            })
            .attr("class", "country")
            .attr("d", feature => path(feature))
            
        svg.call(drag().on('drag', (event) => {
            const rotate = projection.rotate()
            const k = sensitivity / projection.scale()
            projection.rotate([
                rotate[0] + event.dx * k,
            ])
            path = geoPath().projection(projection)
            svg.selectAll("path").attr("d", feature => path(feature))
            rotateTimer.stop()
            }))
            // .call(d3.zoom().on('zoom', () => {
            // if(d3.event.transform.k > 0.3) {
            //     projection.scale(initialScale * d3.event.transform.k)
            //     path = d3.geoPath().projection(projection)
            //     svg.selectAll("path").attr("d", path)
            //     globe.attr("r", projection.scale())
            // }
            // else {
            //     d3.event.transform.k = 0.3
            // }
            // }))

        function rotateFunction(elapsed) {
            const rotate = projection.rotate()
            const k = sensitivity / projection.scale()
            projection.rotate([
                rotate[0] + 1 * k,
            ])
            path = geoPath().projection(projection)
            svg.selectAll("path").attr("d", feature => path(feature))
            }
        const rotateTimer = timer(rotateFunction,200)
        // setIsRotating(rotateTimer);
        // if (!isRotating) {
        //     rotateTimer.stop();
        // } else {
        //     rotateTimer.restart(rotateFunction, 200);
        // }
    }, [data, isRotating])

    return (
        <div id="globe" ref={wrapperRef} >
            <svg
                // onMouseEnter={stopRotate} 
                // onMouseLeave={resumeRotate} 
                width={size} 
                height={size} 
                ref={svgRef}></svg>
        </div>
    )
}
