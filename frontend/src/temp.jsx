const Temp = ({data}) => {
  return (<div className='border rounded-2xl p-4 m-4'>
    <p className='text-2xl'>温度: {data.temp} ℃</p>
    <p>天気: {data.description}</p>
    <p>湿度: {data.humidity} %</p>
  </div>);
}

export default Temp;