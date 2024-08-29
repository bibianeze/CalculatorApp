import React, { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import calculatorimg from "../assets/illustration-empty.svg";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema using Yup
const schema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  interest: yup
    .number()
    .typeError("Interest rate must be a number")
    .min(0, "Interest rate must be a positive number")
    .required("Interest rate is required"),
  years: yup
    .number()
    .typeError("Years must be a number")
    .min(1, "Years must be at least 1")
    .required("Years are required"),
  type: yup.string().required("Please select a mortgage type"),
});

const MortgageCalculator = () => {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleReset = () => {
    reset();
    setShowResult(false);
  };

  // function to calculate mortgage

  const calculateMortgage = (amount, interest, years, type) => {
    let monthlyInterest = interest / 100 / 12;
    let monthlyPayment =
      amount *
      (monthlyInterest +
        monthlyInterest / Math.pow(1 + monthlyInterest, -years * 12));
    return monthlyPayment.toFixed(2);
  };
  const formatPrice = (result) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GBP",
    }).format(result);
  };
  const onSubmit = (data) => {
    let M;
    let total;
    console.log("form submitted", data);
    // formular
    // let FinalResult = data.amount * 3

    const amount = data.amount;
    const interest = data.interest;
    const years = data.years;

    if (amount && interest && years) {
      M = calculateMortgage(amount, interest, years);
      total = M * years * 12;
    }

    setMonthlyPayment(Math.round(M));
    setTotalPayment(Math.round(total));

    setShowResult(true);
  };

  console.log(monthlyPayment, totalPayment);

  return (
    <div className=" rounded-xl p-7  md:flex md:flex-row flex flex-col justify-center md:w-[1000px] my-10 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-7 rounded-t-lg md:rounded-tl-lg md:rounded-bl-lg w-full md:w-auto"
      >
        <div className="flex justify-between">
          <h1 className="font-bold lg:text-xl">Mortgage Calculator</h1>
          <button type="button" onClick={handleReset}>
            <p className="underline text-xs text-sky-200">Clear all</p>
          </button>
        </div>

        {/* Input 1: Mortgage Amount */}
        <section className="my-3">
          <label className="block text-sm font-medium text-gray-700">
            Mortgage Amount
          </label>
          <div className={errors.amount ? "border border-red-700" : "border"}>
            <button
              type="button"
              className={errors.amount ? `bg-red-500 p-2` : `p-2 bg-sky-100`}
            >
              &pound;
            </button>
            <input
              className="outline-none px-2"
              type="text"
              id="amount"
              {...register("amount")}
            />
          </div>
          {errors.amount && (
            <p className="text-red-700">{errors.amount.message}</p>
          )}
        </section>

        {/* Input 2: Mortgage Term & Interest Rate */}
        <section className="md:flex md:flex-row flex-col gap-2 my-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mortgage Term
            </label>
            <div
              className={
                errors.amount
                  ? "border border-red-700 flex"
                  : "border rounded-md flex"
              }
            >
              <input
                className="outline-none"
                type="text"
                id="years"
                {...register("years")}
              />
              <button
                type="button"
                className={
                  errors.amount
                    ? `bg-red-500 p-2`
                    : `p-2 ml-auto md:ml-0 bg-sky-100 rounded-md`
                }
              >
                years
              </button>
            </div>
            {errors.years && (
              <p className="text-red-700">{errors.years.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Interest Rate
            </label>
            <div
              className={
                errors.interest
                  ? "border border-red-700 flex"
                  : "border rounded-md flex"
              }
            >
              <input
                className="outline-none"
                type="number"
                id="interest"
                {...register("interest")}
              />
              <button
                type="button"
                className={
                  errors.interest
                    ? `bg-red-500 p-2`
                    : `p-2 ml-auto md:ml-0 bg-sky-100 rounded-md`
                }
              >
                %
              </button>
            </div>
            {errors.interest && (
              <p className="text-red-700">{errors.interest.message}</p>
            )}
          </div>
        </section>

        {/* Radio Buttons: Mortgage Type */}
        <section className="flex flex-col gap-3">
          <label className="block text-sm font-medium text-gray-700">
            Mortgage Type
          </label>
          <div className="p-3 border rounded-md flex gap-3">
            <input
              name="type"
              type="radio"
              value="Repayment"
              {...register("type")}
            />
            <p>Repayment</p>
          </div>
          <div className="p-3 border rounded-md flex gap-3">
            <input
              name="type"
              type="radio"
              value="Interest Only"
              {...register("type")}
            />
            <p>Interest Only</p>
          </div>
          {errors.type && <p className="text-red-700">{errors.type.message}</p>}
        </section>

        <button className="my-4 justify-center flex items-center gap-2 bg-lime-300 rounded-2xl w-[70%] p-3 text-sm">
          <FaCalculator />
          <span>Calculate Repayment</span>
        </button>
      </form>
      <DevTool control={control} />

      {showResult ? (
        <div>
          <div className="bg-sky-950 h-full text-center rounded-b-lg md:rounded-bl-3xl md:rounded-br-lg md:rounded-tr-lg md:relative right-4 flex flex-col gap-3 text-white p-3 justify-center items-center">
            <div className="">
              <h2 className="text-l font-bold text-white my-3">Your results</h2>
              <p className="text-xs text-slate-300">
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                “calculate repayments” again.
              </p>
            </div>
            <div className="bg-slate-900 w-[70%] p-6 my-10 border-t-8 border-lime-300 rounded-t-lg rounded-bl-3xl rounded-br-lg">
              <p className="text-xs text-slate-300">Your Monthly Repayment</p>
              <h1 className="text-lime-300 my-2 text-3xl">
                {formatPrice(monthlyPayment)}
              </h1>
              <hr className="text-lime-300 my-4" />
              <p className="text-xs text-slate-300">
                Total you'll repay over the term
              </p>
              <h1 className="text-white my-4 text-xl">
                {formatPrice(totalPayment)}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-sky-950 w-full md:w-[50%] text-center rounded-b-lg md:rounded-bl-3xl md:rounded-br-lg md:rounded-tr-lg  md:relative right-4 flex flex-col gap-3 text-white p-6 md:p-3 justify-center items-center">
          <img src={calculatorimg} className="w-40 h-f" alt="" />
          <h2 className="font-bold text-xl">Results shown here</h2>
          <p className="text-xs">
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </div>
      )}
      {/* {showResult && <Results />} */}
    </div>
  );
};

export default MortgageCalculator;
