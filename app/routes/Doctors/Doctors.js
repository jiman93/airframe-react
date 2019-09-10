import React from "react";
import { getAll } from "./actions/doctor-actions";

import BootstrapTable from "react-bootstrap-table-next";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Table
} from "./../../components";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";

import { TrTableHoverable } from "./components/TrTableHoverable";

class Doctors extends React.Component {
  state = {
    resource: [],
    meta: {}
  };

  async componentDidMount() {
    const {
      data: { resource, meta }
    } = await getAll();

    this.setState({ resource, meta });
  }

  render() {
    const { resource, meta } = this.state;
    console.log("resource", resource);

    const columns = [
      {
        dataField: "name",
        text: "Name"
      },
      {
        dataField: "providernumber",
        text: "Provider Number"
      },
      {
        dataField: "location",
        text: "Location"
      },
      {
        dataField: "practice",
        text: "Practice"
      },
      {
        dataField: "verified",
        text: "Verified"
      },
      {
        dataField: "status",
        text: "status"
      }
    ];

    const paginationOption = {
      custom: true,
      totalSize: meta.count
    };

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col lg={12}>
              <Card className="mb-3" style={{ padding: "20px" }}>
                <CardBody>
                  <CardTitle tag="h6">
                    Table Hoverable
                    <span className="small ml-1 text-muted">#4.01</span>
                  </CardTitle>
                  <p className="mb-0">
                    Use <code>hover</code> to add zebra-striping to any table
                    row within the <code>&lt;tbody&gt;</code>.
                  </p>
                </CardBody>
                {/* START Table */}

                {resource.length > 0 && (
                  <PaginationProvider
                    pagination={paginationFactory(paginationOption)}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <div>
                        <BootstrapTable
                          keyField="id"
                          hover
                          data={resource}
                          columns={columns}
                          {...paginationTableProps}
                        />
                        <Row>
                          <Col lg={{ size: 4, offset: 3 }}>
                            <Row>
                              <PaginationListStandalone {...paginationProps} />
                              {console.log({ ...paginationProps })}
                              <SizePerPageDropdownStandalone
                                {...paginationProps}
                                variation={"dropup"}
                              />
                            </Row>
                          </Col>
                          {/* <Col lg={2}>
                            
                          </Col> */}
                          <Col lg={4}>
                            <PaginationTotalStandalone {...paginationProps} />
                          </Col>
                        </Row>
                      </div>
                    )}
                  </PaginationProvider>
                )}

                {/* END Table */}
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Doctors;
