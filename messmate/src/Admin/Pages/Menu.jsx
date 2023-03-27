import React, { useState, useEffect } from "react";
import axios from "../../Api/axios";
import MultiSelect from "../Components/MultiSelect";

const Menu = () => {
  const [isSetMenu, setIsSetMenu] = useState(true);
  const [day, setDay] = useState("");

  const [menuB, setMenuB] = useState([]);
  const [menuL, setMenuL] = useState([]);
  const [menuD, setMenuD] = useState([]);
  const [menuS, setMenuS] = useState([]);

  // // fetch data
  // useEffect(() => {

  // }, [day])

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // if button enabled with JS hack
    const l1 = menuB.length > 0;
    const l2 = menuL.length > 0;
    const l3 = menuD.length > 0;
    if (!l1 || !l2 || !l3) {
      console.log(
        "Breakfast Lunch and Dinner atleat have one value if not than write None"
      );
      return;
    }
    try {
      const response = await axios.post(
        "/menu/addMenu",
        JSON.stringify({
          menu_day: day,
          menu_breakfast: menuB,
          menu_lunch: menuL,
          menu_dinner: menuD,
          special_menu: menuS,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));
      alert(response.data.message);
      //clear state and controlled inputs
      setDay("");
      setMenuB([]);
      setMenuL([]);
      setMenuD([]);
      setMenuS([]);
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else if (err.response?.status === 409) {
        alert("Username Taken");
      } else {
        alert("Registration Failed");
      }
    }
  };

  // const handleday = (e) => {
  //   console.log("in the handle day ");
  //   console.log(e);
  // };
  const handleSub = () => {
    console.log("enter the subscribtion zone");
  };
  return (
    <div>
      <div className="flex items-center justify-center w-full p-3 gap-[4rem] ">
        <div className="flex gap-3 items-center justify-center">
          <input
            type="radio"
            id="html"
            name="fav_language"
            value="Menu Add"
            defaultChecked
            onChange={() => setIsSetMenu(true)}
          />
          <label className="text-[1.3rem]">Menu Add</label>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <input
            type="radio"
            id="css"
            name="fav_language"
            value="Subscription Add"
            onChange={() => setIsSetMenu(false)}
          />
          <label className="text-[1.3rem]">Subscription Add</label>
        </div>
      </div>
      <hr />
      {isSetMenu ? (
        <div className="p-3 mt-1 flex flex-col justify-between min-h-[85vh] ">
          <h1 className="text-[2rem] text-center">Add the Menu</h1>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                           Day select                                           */
          /* ---------------------------------------------------------------------------------------------- */}

          <div className="dayselect flex gap-3 mb-3 ">
            <label
              for="countries"
              class="block mb-2 text-sm min-w-fit m-2  font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              id="day"
              name="menu_day"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option selected>Choose a Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">WednesDay</option>
              <option value="Thuesday">ThuesDay</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                            menu part                                           */
          /* ---------------------------------------------------------------------------------------------- */}

          <div className="menu grid grid-cols-3 bg-orange-300 min-h-[40vh] p-3">
            <MultiSelect thing={"Breakfast"} setMenu={setMenuB} Menu={menuB} />
            <MultiSelect thing={"Lunch"} setMenu={setMenuL} Menu={menuL} />
            <MultiSelect thing={"Dinner"} setMenu={setMenuD} Menu={menuD} />
            <MultiSelect
              thing={"SpecialDinner"}
              setMenu={setMenuS}
              Menu={menuS}
            />
          </div>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                           submit part                                          */
          /* ---------------------------------------------------------------------------------------------- */}

          <div className="menusubmit flex justify-center">
            <button
              type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-[75vh] justify-between px-4 mt-2">
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                        Header                                                  */
          /* ---------------------------------------------------------------------------------------------- */}
          <div className="head">
            <h1 className="text-center  m-2 text-xl"> Select Subscription</h1>
          </div>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                             Bottom                                             */
          /* ---------------------------------------------------------------------------------------------- */}

          <div className="innerpart mt-4 flex flex-row gap-5 ">
            <div className="rightpart flex-[1]">
              <img
                className="bg-gray-300 min-h-[60vh]"
                src=""
                alt="Photo is coming "
              ></img>
            </div>

            <div className="sidepart flex flex-col  flex-[1] pl-4">
              {/* ---------------------------------------------------------------------------------------------- */
              /*                                           Header part                                          */
              /* ---------------------------------------------------------------------------------------------- */}

              <div className="subscribtion_header">
                <div className="dayselect flex flex-row">
                  <label
                    for="countries"
                    class="block mb-2 text-sm min-w-fit m-2  font-medium text-gray-900 dark:text-white"
                  >
                    Select an option
                  </label>
                  <select
                    id="sub"
                    class=" max-w-[15rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={() => handleSub}
                    required
                  >
                    <option selected disabled>
                      Select a plan
                    </option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>

              {/* ---------------------------------------------------------------------------------------------- */
              /*                                           bottom part                                          */
              /* ---------------------------------------------------------------------------------------------- */}
              <div className="bottompart mt-4 min-h-[40vh]">
                {/* <input className="bg-slate-600" type="text" name="" id="" value={"hello"} /> */}
                <div className="relative mb-4 max-w-screen-sm">
                  <label
                    htmlFor="full-name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Enter the Plane Detail
                  </label>
                  <textarea
                    cols="5"
                    type="text-area"
                    id="plan_desc"
                    name="plan_desc"
                    // onChange={(e) => setName(e.target.value)}
                    // value={name}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4 max-w-screen-sm">
                  <label
                    htmlFor="full-name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Enter the Price
                  </label>
                  <input
                    type="number"
                    id="plan_price"
                    name="plan_price"
                    // onChange={(e) => setName(e.target.value)}
                    // value={name}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                {/* <input type="number" name="" id="" /> */}
              </div>

              <div className="submit-sub my-4 mx-auto ">
                <button
                  type="button"
                  class=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
