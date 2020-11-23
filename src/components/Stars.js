import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

function Stars(props) {
    const [countArray, setCountArray] = React.useState([])
    React.useEffect(() => {
        var array = []
        if (props.count > 0) {
            if (props.count % 1 === 0) {
                for (var i = 0; i < props.count; i++) {
                    setCountArray(countArray => [...countArray, <StarIcon color="primary" />])
                }
                for (var k = 0; k < (5 - props.count); k++) {
                    setCountArray(countArray => [...countArray, <StarBorderIcon color="primary" />])
                }
            } else {
                var starCount = props.count - (props.count % 1)
                for (var c = 0; c < starCount; c++) {
                    setCountArray(countArray => [...countArray, <StarIcon color="primary" />])
                }
                setCountArray(countArray => [...countArray, <StarHalfIcon color="primary" />])
                for (var t = 0; t < (4 - starCount); t++) {
                    setCountArray(countArray => [...countArray, <StarBorderIcon color="primary" />])
                }

            }
        }
    }, [])
    return (
        <>
            {countArray}
        </>
    )
}

export default Stars