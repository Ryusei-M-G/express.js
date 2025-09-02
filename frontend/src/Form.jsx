import { useState } from "react";

const Form = ({onAdd}) => {
  const [inputValue, setValue] = useState('');
  const [inputValue2, setValue2] = useState('');
  const handleClick = () =>{
    onAdd(inputValue,inputValue2);
  }
return (
  <div className="text-center border rounded-2xl p-2 m-4">
    <p className="text-2xl">add db</p>
    <form>
      <label>
        <input type="text" className="border m-2" value={inputValue} onChange={e=>{setValue(e.target.value)}}></input>
        <input type="text" className="border m-2" value={inputValue2} onChange={e=>{setValue2(e.target.value)}}></input>
        <button type="button" className=" border-black rounded-2xl p-2 m-4 bg-blue-400 text-white hover:cursor-grab"
        onClick={handleClick}>ADD</button>
      </label>
    </form>
    1:{inputValue}
    2:{inputValue2}
  </div>
)
}

export default Form;