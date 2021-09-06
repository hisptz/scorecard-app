import PropTypes from "prop-types";
import React from 'react'
import AccessibilityAndSharing from "../../Shared/Componets/AccesibilityAndSharing";
import AnalyticsDetails from "./Components/AnalyticsDetails";
import DataSource from "./Components/DataSource/dataSource";
import Facts from "./Components/Facts";
import Introduction from "./Components/introduction/introduction";
import RelatedIndicator from "./Components/RelatedIndicator";


export default function DataElementPage(props){
    const id=props.id


    return (<div style={{display:"flex",flexDirection:"column"}}>
            <Introduction id={id} />
            <DataSource id={id}  />
            <Facts  id={id}  />
            <AnalyticsDetails id={id}/>
            <RelatedIndicator id={id} />
            <AccessibilityAndSharing id={id} resourceType={"dataElements"} />

    </div>
    )

}

DataElementPage.propTypes = {
    id: PropTypes.string.isRequired
};
