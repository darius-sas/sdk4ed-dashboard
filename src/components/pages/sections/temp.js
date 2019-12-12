import React, {Component} from "react";
import {MDBCol, MDBRow} from "mdbreact";

<React.Fragment>
    {this.state.characteristics.map(characteristics => (
        <SmellCharacteristics
            pageRankAvrg={characteristics.pageRankAvrg}
            shape={characteristics.shape}
            avrgEdgeWeight={characteristics.avrgEdgeWeight}
            overlapRatio={characteristics.overlapRatio}
            numOfPrivateUseEdges={characteristics.numOfPrivateUseEdges}
            pageRankMax={characteristics.pageRankMax}
            numOfInheritanceEdges={characteristics.numOfInheritanceEdges}
            numOfEdges={characteristics.numOfEdges}
            affectedDesignLevel={characteristics.affectedDesignLevel}
            size={characteristics.size}
            affectedComponentType={characteristics.affectedComponentType}
            avrgNumOfChanges={characteristics.avrgNumOfChanges}
            numOfPublicUseEdges={characteristics.numOfPublicUseEdges}
            parentCentrality={characteristics.parentCentrality}
        />
    ))}
</React.Fragment>


class SmellCharacteristics extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };

    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }
    render() {
        return (
            <React.Fragment>
                <MDBRow>
                    <MDBCol md="2">
                        <h5>Page rank average: {this.props.pageRankAvrg}</h5>
                    </MDBCol>
                </MDBRow>
            </React.Fragment>

        );
    }
}

<React.Fragment>
    {this.props.characteristics.map(item =>(
        <MDBRow>
            <MDBCol md="2">{item.pageRankAvrg}</MDBCol>
            <MDBCol md="2">moi</MDBCol>
        </MDBRow>
    ))}
</React.Fragment>