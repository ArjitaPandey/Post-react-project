import React from 'react'
import {TailSpin} from "react-loader-spinner";


function Loader() {
  return (
    <div className="w-full py-8 mt-4 text-center min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center space-y-6">
                <TailSpin color="#9149ff" radius={"5px"} />
            </div>
    </div>
  );
}

export default Loader;
