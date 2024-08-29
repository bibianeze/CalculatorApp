import React from 'react'

const Results = () => {
  return (
    <div>
      Results
      <div className="bg-sky-950 w-[40%] p-8 flex flex-col justify-center mx-auto rounded-bl-3xl rounded-br-lg rounded-tr-lg relative right-4">
        <div className=''>
          <h2 className="text-l  font-bold text-white my-3">Your results</h2>
          <p className="text-xs text-slate-300 ">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
        </div>
        <div className="bg-slate-900   p-6 my-10 border-t-8 border-lime-300 rounded-t-lg rounded-bl-3xl rounded-br-lg">
          <p className="text-xs text-slate-300">Your Monthly Repayment</p>
          <h1 className="text-lime-300 my-2 text-3xl">&pound; 1,797.74</h1>
          <hr className="text-lime-300 my-4" />
          <p className="text-xs text-slate-300">Your Total Cost</p>
          <h1 className="text-white my-4 text-xl">&pound; 539,322.92</h1>
        </div>
      </div>
    </div>
  );
}

export default Results