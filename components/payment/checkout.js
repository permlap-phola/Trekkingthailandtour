import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import Loading from "../status/loading";
import { CreatePayment } from "@/services/payment";
import { useRouter } from "next/router";

function Checkout({ setTiggerCheckOut, selectTour }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState(1);
  const [fullPrice, setFullPrice] = useState(selectTour.price[0].price);
  const [deposit, setDeposit] = useState(selectTour.price[0].price * 0.3);

  const handleOnChangePrice = (e) => {
    const { name, value } = e.target;
    const people = parseInt(value);
    setPeople(() => value);
    for (let i = 1; i <= selectTour.price.length; i++) {
      if (people === i) {
        const deposit = selectTour.price[i - 1].price * people * 0.3;
        const fullPrice = selectTour.price[i - 1].price * people;
        setFullPrice(() => selectTour.price[i - 1].price * people);
        setDeposit(() => selectTour.price[i - 1].price * people * 0.3);
      } else if (people > selectTour.price.length) {
        const deposit =
          selectTour.price[selectTour.price.length - 1].price * people * 0.3;
        const fullPrice =
          selectTour.price[selectTour.price.length - 1].price * people;
        setFullPrice(
          () => selectTour.price[selectTour.price.length - 1].price * people
        );
        setDeposit(
          () =>
            selectTour.price[selectTour.price.length - 1].price * people * 0.3
        );
      }
    }
  };

  const handleMakePayment = async () => {
    try {
      setLoading(() => true);

      const response = await CreatePayment({
        people: people,
        price: fullPrice,
        name: selectTour.title,
        images: [selectTour.images[0].coverImage.asset.url],
      });

      setLoading(() => false);
      router.push(response.url);
    } catch (err) {
      setLoading(() => false);
      console.log(err);
    }
  };
  return (
    <div className="fixed z-[100] font-Poppins w-screen h-screen flex justify-center items-center">
      <div className="md:w-5/12 w-11/12 h-5/6 gap-5 bg-white flex p-5 flex-col items-center justify-center">
        <div className="font-semibold w-10/12 text-center text-xl">
          <h2 className="text-main-color">{selectTour.title}</h2>
          <div className="w-full h-[1px] bg-main-color mt-2"></div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <h3 className="font-semibold text-xl text-main-color">
            How many people?
          </h3>
          <TextField
            onChange={handleOnChangePrice}
            defaultValue={people}
            autoFocus
            type="number"
            value={people}
            name="people"
            label="people"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </div>
        <div className="flex flex-col justify-center gap-10 items-center">
          <span className="font-medium text-xl">
            The full package price is{" "}
            <span className="font-bold text-supper-main-color">
              {fullPrice.toLocaleString()}
            </span>{" "}
            baht
          </span>
          <span>
            We kindly request a deposit of{" "}
            <span className="font-bold text-supper-main-color">
              {deposit.toLocaleString()}{" "}
            </span>
            baht (30% of the total price) to secure your booking. The remaining
            amount can be settled at the start of the tour. The full package
            price is {fullPrice.toLocaleString()} baht for {people} people.
          </span>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <button
            onClick={handleMakePayment}
            className="w-max h-max px-5 py-2 rounded-lg bg-supper-main-color text-white font-semibold active:ring-2 border-solid ring-supper-main-color
         hover:bg-main-color transition duration-100 drop-shadow-md hover:scale-105"
          >
            PAY NOW
          </button>
        )}
      </div>
      <div
        onClick={() => {
          setTiggerCheckOut(() => false);
          document.body.style.overflow = "auto";
        }}
        className="w-screen h-screen fixed right-0 left-0 top-0 bottom-0  m-auto -z-10 bg-main-color/80"
      ></div>
    </div>
  );
}

export default Checkout;
