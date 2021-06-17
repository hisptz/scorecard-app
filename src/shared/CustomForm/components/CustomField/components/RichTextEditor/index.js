import {Field} from '@dhis2/ui'
import JoditEditor from "jodit-react";
import PropTypes from "prop-types";
import React, { useRef} from 'react';


export default function RichTextEditor({input, ...props}){
    const editorRef = useRef(null);
    const {name, label,value, onChange,} = input
    const config = {
        readonly: false,
        defaultFontSizePoints: 'pt'
    }
    return(
        <Field name={name} label={label} value={value} {...props}>
            <JoditEditor ref={editorRef}  value={value} onBlur={onChange} config={config}   />
        </Field>
    )
}

RichTextEditor.propTypes = {
    input: PropTypes.object
};
