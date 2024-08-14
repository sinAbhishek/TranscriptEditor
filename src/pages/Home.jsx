import React, { useEffect, useRef, useState } from "react";
import { initialTranscript } from "../data/transcriptdata";
import ModalCom from "../components/Modal";
const Home = () => {
  const [timeindex, settimeindex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newtext, setnewtext] = useState("");
  const [selectedtext, setselectedtext] = useState(0);
  const [play, setplay] = useState(false);
  let time = useRef(0);
  let interval = useRef(null);
  let timeinterval = useRef(null);

  const [data, setdata] = useState(initialTranscript);
  const totalreadtime =
    (data[data.length - 1].start_time + data[data.length - 1].duration) / 1000;
  useEffect(() => {
    interval.current = setInterval(() => {
      if (timeindex < data.length - 1 && play) {
        settimeindex((prev) => prev + 1);
      }
    }, data[timeindex].duration);

    return () => clearInterval(interval.current);
  }, [timeindex, play]);
  useEffect(() => {
    timeinterval.current = setInterval(() => {
      if (time.current < totalreadtime) {
        time.current = time.current + 1;
      }
    }, 1000);
    return () => {
      clearInterval(timeinterval.current);
    };
  }, [play]);

  //setting intervals again after pause
  const fire = () => {
    interval.current = setInterval(() => {
      if (timeindex < data.length - 1) {
        settimeindex((prev) => prev + 1);
      }
    }, data[timeindex].duration);
    timeinterval.current = setInterval(() => {
      if (time.current < totalreadtime) {
        time.current = time.current + 1;
      }
    }, 1000);
  };

  const handleChange = (e) => {
    setnewtext(e.target.value);
  };

  // correcting only the selected text
  const correct = () => {
    const updatedtext = data.map((c, i) =>
      i === selectedtext
        ? { ...c, word: newtext.length === 0 ? c.word : newtext }
        : c
    );
    setdata(updatedtext);
  };
  // correcting all text that matches the selected text
  const correctAll = () => {
    const selectedword = data[selectedtext].word;
    const updatedtext = data.map((c) =>
      c.word === selectedword
        ? { ...c, word: newtext.length === 0 ? c.word : newtext }
        : c
    );
    setdata(updatedtext);
  };

  const handlestart = () => {
    setplay(true);
    if (timeindex !== 0 && timeindex !== data.length - 1) {
      fire();
    } else {
      settimeindex(0);
      time.current = 0;
    }
  };
  const handlestop = () => {
    clearInterval(interval.current);
    clearInterval(timeinterval.current);
  };
  const handlereset = () => {
    setplay(false);
    clearInterval(interval.current);
    clearInterval(timeinterval.current);
    settimeindex(0);
    time.current = 0;
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-black">
        <h1 className=" font-bold text-3xl text-slate-300 mb-6">
          Transcript Editor
        </h1>
        <div className=" max-[768px]:w-[90%] overflow-auto p-4 w-[60%] h-[50%] border border-slate-900 bg-slate-900">
          <p className="flex flex-wrap">
            {data.map((c, i) => (
              <span
                key={i}
                className={`inline-block mx-1 my-1 hover:cursor-pointer ${
                  i == timeindex && "bg-slate-200"
                }`}
                onClick={() => {
                  setselectedtext(i);
                  setnewtext(data[i].word);
                  handleOpen();
                }}
                style={{ color: i === timeindex ? "black" : "red" }}
              >
                {c.word}
              </span>
            ))}
          </p>
        </div>
        <div className=" max-[768px]:w-[90%] flex justify-center items-center w-[60%] gap-4 p-4">
          <p className=" max-[480px]:text-sm text-slate-200 font-medium text-xl">
            Time:
            <span className=" text-red-500 ml-1">{time.current}</span> seconds
          </p>
          <button
            onClick={() => handlestart()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start
          </button>
          <button
            onClick={() => handlestop()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Stop
          </button>
          <button
            onClick={() => handlereset()}
            className="bg-white text-black px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </div>

      <ModalCom
        handleChange={handleChange}
        correct={correct}
        correctAll={correctAll}
        open={open}
        handleClose={handleClose}
        newtext={newtext}
      />
    </>
  );
};

export default Home;
