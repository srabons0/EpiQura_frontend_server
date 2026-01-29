import React from 'react';
import BangladeshMap from './BangladeshMap';
import { useLoaderData } from 'react-router';


const Coverage = () => {
    const serviceCenters = useLoaderData();
    // console.log(serviceCenters);
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 mt-20">
            <h2 className="text-2xl lg:text-4xl  font-extrabold text-gray-900 text-center mb-6">
  Available Across <span className="text-blue-600">All Key Areas of Dhaka</span>
</h2>
<p className="text-center text-gray-600 text-sm lg:text-lg max-w-xl mx-auto mb-10">
  From Uttara to Banani, Mirpur to Motijheel — we cover every corner of Dhaka city with reliable services and on-demand support.
</p>
            <BangladeshMap serviceCenters={serviceCenters} />
        </div>
    );
};

export default Coverage;