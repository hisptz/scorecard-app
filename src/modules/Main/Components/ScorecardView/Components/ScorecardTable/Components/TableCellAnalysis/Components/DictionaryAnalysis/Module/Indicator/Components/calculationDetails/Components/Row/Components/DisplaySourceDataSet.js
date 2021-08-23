

export default function DisplaySourceDataSet(props){
    const title=props.title;
    const data=props.data;

    return <>

        <h5>{title}</h5>

        <ul>
            {data.map((el)=>{
                return <li key={el.id}> {el.val} </li>
            })}
        </ul>


    </>}
