import i18n from "@dhis2/d2-i18n";


export default function DisplaySourceProgramIndicator(props){

    const title=props.title;
    const data=props.data;


    return <>

        <h4>{title}</h4>
        <ul>
            {data.map((el)=>{
                return<li  key={el.id}>
                    <h5>{el?.val}</h5>
                    <p><b>{i18n.t("source")}:</b> {el?.sources?.displayName}</p>
                </li>
            })}
        </ul>

    </>
}