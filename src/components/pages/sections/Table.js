import React from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import ContentPanel from './ContentPanel'

const BasicTable = props => {
    var data = props.data
    var rows = []
    var uniqueId = 0
    for(var i in data.rows){
        var row = data.rows[i]
        var r = []
        for(var j in data.columns){
            var field = data.columns[j]['field']
            r.push(<td key={uniqueId++}>{row[field]}</td>)
        }
        rows.push(<tr key={uniqueId++}>{r}</tr>)
    }
    var header = []
    for(var h in data.columns)
        header.push(<th key={uniqueId++}>{data.columns[h]['label']}</th>)


    return(
        <ContentPanel title={props.title}>
            <MDBTable small responsive hover>
                <MDBTableHead><tr>{header}</tr></MDBTableHead>
                <MDBTableBody>{rows}</MDBTableBody>
            </MDBTable>
        </ContentPanel>
    )
}

export default BasicTable;