import { useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import ChangeMode from './ChangeMode';


const Calculator = () => {

  let [miror, setMiror] = useState("0")
  const store = useRef([]);

  const handleNumberClick = (num) => {
    setMiror((prevMiror) => {
      if (prevMiror == "0" && prevMiror.length == 1 && num !== ".") {
        return num;
      } else if (prevMiror.length < 9) {
        return prevMiror + num;
      } else {
        return prevMiror;
      }
    });

  };
  const handleSigns = (sign) => {
    if (miror !== "0" && miror !== "") {
      store.current.push(miror);
      store.current.push(sign);
      setMiror("0");
    }
  };


  const handleBackSpace = () => {
    setMiror((prevMiror) => prevMiror.length > 1 ? prevMiror.slice(0, -1) : "0");
  };


  const handleClear = () => {
    setMiror("0")
    store.current = []
  }


  const handleCalculation = () => {
    if (store.current.length != 0) {

      store.current.push(miror);

      for (let i = 0; i < store.current.length; i += 2) {
        store.current[i] = parseFloat(store.current[i])
      }

      for (let i = 1; i < store.current.length - 1; i += 2) {
        if (store.current[i] == "*") {
          store.current[i - 1] = store.current[i - 1] * store.current[i + 1];
          store.current.splice(i, 2);
          i -= 2;
        } else if (store.current[i] == "/") {
          store.current[i - 1] = store.current[i - 1] / store.current[i + 1];
          store.current.splice(i, 2);
          i -= 2;
        }
      }

      for (let i = 1; i < store.current.length - 1; i += 2) {
        if (store.current[i] == "+") {
          store.current[i - 1] = store.current[i - 1] + store.current[i + 1];
          store.current.splice(i, 2);
          i -= 2;
        } else if (store.current[i] == "-") {
          store.current[i - 1] = store.current[i - 1] - store.current[i + 1];
          store.current.splice(i, 2);
          i -= 2;
        }
      }

      setMiror((store.current[0] + "").length > 10 ? store.current[0].toExponential(4) : store.current[0])
      store.current = []
    }
  }


  const handleKeyDown = (e) => {
    const key = e.key;

    if ((key >= '0' && key <= '9') || key === '.') {
      handleNumberClick(key);
    }

    if (key === '/' || key === '*' || key === '+' || key === '-') {
      handleSigns(key);
    }

    if (key === 'Backspace') {
      handleBackSpace();
    }

    if (key === 'Escape') {
      handleClear();
    }

    if (key === 'Enter') {
      handleCalculation();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [miror]);



  return (
    <div className='flex flex-col p-6 bg-gradient-to-br from-blue-50 via-blue-300 to-blue-500 dark:bg-gradient-to-bl dark:from-blue-800 dark:via-gray-900 dark:to-black bg-[length:200%_200%] animate-gradientMove w-[320px] h-[580px] rounded-3xl'>
      <div className="w-full h-full flex flex-col">

        <div className="h-[200px] flex flex-col justify-center relative">
          <ChangeMode />
          <div className="w-full h-[50px] flex items-end overflow-hidden justify-end tracking-wide text-gray-500">{store.current.map((item, index) => {
            if (index % 2 == 1) {
              return <span key={index} className='text-blue-500'>{item}</span>
            } return <span key={index}>{item}</span>
          })}</div>
          <div className="w-full h-[80px]  text-5xl font-semibold flex items-center justify-end text-gray-900 dark:text-white overflow-hidden tracking-w">{miror}</div>
        </div>
        <div className="flex-1 grid grid-cols-4 gap-3 animate-colorChange dark:animate-colorChangeDark place-items-center text-3xl">
          <button
            className="w-14 h-14 rounded-xl bg-blue-200  text-blue-400 dark:text-gray-300 dark:bg-gray-600 shadow-light-shadow dark:shadow-dark-shadow flex items-center justify-center transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-700 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={handleClear}>
            AC
          </button>
          <button
            className="w-14 h-14  rounded-xl bg-blue-200 text-blue-400 dark:text-gray-300 dark:bg-gray-600 flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-700 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={handleBackSpace}>
            <BackspaceOutlinedIcon />
          </button>
          <button
            className="w-14 h-14 rounded-xl bg-blue-300 dark:bg-blue-600 text-blue-500 dark:text-blue-100 flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-blue-700 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={() => handleSigns("/")}>
            /
          </button>
          <button
            className="w-14 h-14 rounded-xl bg-blue-300 dark:bg-blue-600 text-blue-500 dark:text-blue-100 flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-blue-700 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={() => handleSigns("*")}>
            <CloseIcon />
          </button>
          <button
            className="w-14 h-14 rounded-xl bg-blue-200 dark:bg-darkBg flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-800 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={(e) => handleNumberClick(e.target.innerHTML)}>
            7
          </button>
          <button
            className="w-14 h-14 rounded-xl bg-blue-200 dark:bg-darkBg flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-800 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={(e) => handleNumberClick(e.target.innerHTML)}>
            8
          </button>
          <button
            className="w-14 h-14 rounded-xl bg-blue-200 dark:bg-darkBg flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-800 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={(e) => handleNumberClick(e.target.innerHTML)}>
            9
          </button>
          <button className="w-14 h-14 rounded-xl bg-blue-300 dark:bg-blue-600 text-blue-500 dark:text-blue-100 flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-blue-700 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={() => handleSigns("-")}>
            -
          </button>
          <button className="w-14 h-14 rounded-xl bg-blue-200 dark:bg-darkBg flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-800 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={(e) => handleNumberClick(e.target.innerHTML)}>
            4
          </button>
          <button className="w-14 h-14 rounded-xl bg-blue-200 dark:bg-darkBg flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-800 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={(e) => handleNumberClick(e.target.innerHTML)}>
            5
          </button>
          <button className="w-14 h-14 rounded-xl bg-blue-200 dark:bg-darkBg flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-800 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:over:scale-105"
            onClick={(e) => handleNumberClick(e.target.innerHTML)}>
            6
          </button>
          <div className="w-full h-full row-span-3 flex flex-col gap-3 py-1">
            <button className="flex-1 h-14 rounded-xl bg-blue-300 dark:bg-blue-600 text-blue-500 dark:text-blue-100 flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-blue-700 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
              onClick={() => handleSigns("+")}>
              +
            </button>
            <button className="flex-1 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-blue-700 lg:hover:text-blue-800 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
              onClick={handleCalculation}>
              =
            </button>
          </div>
          <button className="w-14 h-14 rounded-xl bg-blue-200 dark:bg-darkBg flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-800  lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={(e) => handleNumberClick(e.target.innerHTML)}>
            1
          </button>
          <button className="w-14 h-14 rounded-xl bg-blue-200 dark:bg-darkBg flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-800  lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={(e) => handleNumberClick(e.target.innerHTML)}>
            2
          </button>
          <button className="w-14 h-14 rounded-xl bg-blue-200 dark:bg-darkBg flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-800  lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
            onClick={(e) => handleNumberClick(e.target.innerHTML)}>
            3
          </button>
          <div className="w-full pe-[2px] h-14 col-span-3 flex gap-3 justify-between">
            <button className="flex-1 max-w-[124px] h-14 rounded-xl bg-blue-200 dark:bg-darkBg flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-800 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
              onClick={(e) => handleNumberClick(e.target.innerHTML)}>
              0
            </button>
            <button className="w-14 h-14 rounded-xl bg-blue-200 dark:bg-darkBg flex items-center justify-center shadow-light-shadow dark:shadow-dark-shadow transition duration-200 ease-in-out transform lg:hover:bg-blue-400 lg:dark:hover:bg-gray-900 lg:hover:text-blue-700 lg:dark:hover:text-blue-200 lg:hover:shadow-lg lg:hover:scale-105"
              onClick={(e) => handleNumberClick(e.target.innerHTML)}
            >
              .
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator