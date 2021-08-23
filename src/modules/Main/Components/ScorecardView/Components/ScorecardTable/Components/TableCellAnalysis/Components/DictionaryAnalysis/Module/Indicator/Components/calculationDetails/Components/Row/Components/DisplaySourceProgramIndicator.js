

export default function DisplaySourceProgramIndicator(props){

    const title=props.title;
    const data=props.data;


    return <>

        <h4>{title}</h4>
        <ul>
            {data.map((el)=>{
                return<li  key={el.id}>
                    <h5>{el?.val}</h5>
                    <p><b>source:</b> {el?.sources?.displayName}</p>
                </li>
            })}
        </ul>

    </>
}