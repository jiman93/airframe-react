import React from "react";
import { getAll } from "./actions/doctor-actions";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Container, Row, Col, ButtonGroup, Button } from "./../../components";

import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";

import { buildCustomTextFilter } from "./filters";
import { CustomExportCSV } from "./components/CustomExportButton";
import { CustomSearch } from "./components/CustomSearch";
const sortCaret = order => {
  if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
  if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

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

  handleDeleteRow() {
    console.log("deleted");
  }

  render() {
    const { resource, meta } = this.state;
    console.log("resource", resource);

    const columns = [
      {
        dataField: "name",
        text: "Name",
        sort: true,
        sortCaret,
        formatter: cell => <span className="text-inverse">{cell}</span>,
        ...buildCustomTextFilter({
          placeholder: "Filter by name",
          getFilter: filter => {
            this.nameFilter = filter;
          }
        })
      },
      {
        dataField: "providernumber",
        text: "Provider Number",
        sort: true,
        sortCaret,
        formatter: cell => <span>{cell}</span>,
        ...buildCustomTextFilter({
          placeholder: "Filter by provider no",
          getFilter: filter => {
            this.providerNumberFilter = filter;
          }
        })
      },
      {
        dataField: "location",
        text: "Location",
        sort: true,
        sortCaret,
        formatter: cell => <span>{cell}</span>,
        ...buildCustomTextFilter({
          placeholder: "Filter by location",
          getFilter: filter => {
            this.locationFitler = filter;
          }
        })
      },
      {
        dataField: "practice",
        text: "Practice",
        sort: true,
        sortCaret,
        formatter: cell => <span className="text-inverse">{cell}</span>,
        ...buildCustomTextFilter({
          placeholder: "Filter by practice",
          getFilter: filter => {
            this.practiceFilter = filter;
          }
        })
      },
      {
        dataField: "verified",
        text: "Verified",
        sort: true,
        sortCaret,
        formatter: cell => cell,
        ...buildCustomTextFilter({
          placeholder: "Filter by verified",
          getFilter: filter => {
            this.verifiedFilter = filter;
          }
        })
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
        sortCaret,
        formatter: cell => cell,
        ...buildCustomTextFilter({
          placeholder: "Filter by status",
          getFilter: filter => {
            this.statusFilter = filter;
          }
        })
      }
    ];

    const paginationOption = {
      custom: true,
      totalSize: meta.count
    };

    return (
      <ToolkitProvider
        keyField="id"
        data={resource}
        columns={columns}
        search
        exportCSV
      >
        {props => (
          <React.Fragment>
            <Container>
              <div className="d-flex justify-content-end align-items-center mb-2">
                <h6 className="my-0">Doctors</h6>
                <div className="d-flex ml-auto">
                  <CustomSearch className="mr-2" {...props.searchProps} />
                  <ButtonGroup>
                    <CustomExportCSV {...props.csvProps}>
                      Export
                    </CustomExportCSV>
                    <Button
                      size="sm"
                      outline
                      onClick={this.handleDeleteRow.bind(this)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="sm"
                      outline
                      onClick={this.handleDeleteRow.bind(this)}
                    >
                      <i className="fa fa-fw fa-plus"></i>
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              {/* START Table */}

              {resource.length > 0 && (
                <PaginationProvider
                  pagination={paginationFactory(paginationOption)}
                >
                  {({ paginationProps, paginationTableProps }) => (
                    <div>
                      <BootstrapTable
                        classes="table-responsive"
                        striped
                        responsive
                        filter={filterFactory()}
                        bordered={false}
                        {...paginationTableProps}
                        {...props.baseProps}
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
                        <Col lg={4}>
                          <PaginationTotalStandalone {...paginationProps} />
                        </Col>
                      </Row>
                    </div>
                  )}
                </PaginationProvider>
              )}

              {/* END Table */}
            </Container>
          </React.Fragment>
        )}
      </ToolkitProvider>
    );
  }
}

export default Doctors;
