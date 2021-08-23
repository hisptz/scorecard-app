import Introduction from "./Components/introduction/introduction";
import DataSource from "./Components/DataSource/dataSource";


export default function DataElementPage(props){
    const id=props.id


    return (<div style={{display:"flex",flexDirection:"column"}}>
        <Introduction id={id} />

            {/*<DataSource />*/}

    </div>
    )

}