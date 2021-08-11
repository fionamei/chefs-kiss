import React from 'react';


export const Restaurants = ({ restaurant }) => {
    // console.log(restaurant);
    return (
        <div>
            <h1>List of Restaurants:</h1>
            {restaurant.map((res, index) => (
                <div>
                    <h2 key={index}>{res.name} — {res.price}</h2>
                    <div>
                        {res.location.map((loc, i) => (
                            <p key={i}>
                                {loc}
                            </p>
                        ))}
                    </div>
                </div>
            ))}
            {/* <h1>asdkja</h1> */}
        </div>
    )
}