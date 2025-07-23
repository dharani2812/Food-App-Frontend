const HomeCard = ({imgsrc,imgalt,content,className}) => {
    return (
       <div className= {`font-heading flex flex-col items-center bg-gray-200 px-20 py-20 rounded-3xl lg:rounded-full ${className}` }>
            <img src={imgsrc} alt={imgalt} width={100} height={100} />
            <h2 className="mt-5 font-medium text-center break-words">{content}</h2>
            
          </div>
    )
}

export default HomeCard;