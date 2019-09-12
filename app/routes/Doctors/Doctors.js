import React from "react";
import { getAllDoctors, updateDoctor } from "./actions/doctor-actions";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container, Row, Col, ButtonGroup, Button } from "./../../components";

import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";

import { CustomExportCSV } from "./components/CustomExportButton";
import { CustomSearch } from "./components/CustomSearch";

const sortCaret = order => {
  if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
  if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

const LazyLoad = ({ totalSize, page, sizePerPage, ...rest }) => (
  <div>
    <BootstrapTable
      remote
      keyField="id"
      pagination={paginationFactory({
        page,
        sizePerPage,
        showTotal: true,
        totalSize
      })}
      {...rest}
    />
  </div>
);

class Doctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: [],
      meta: {},
      order: "ASC",
      sortBy: "name",
      filterById: "",
      filterByName: "",
      filterByProviderNumber: "",
      filterbyLocation: "",
      sizePerPage: 10,
      page: 1,
      isLoading: false,
      actionModal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  async componentDidMount() {
    console.log("componentDidMount");
    const {
      data: { resource, meta }
    } = await getAllDoctors();

    this.setState({ resource, meta });
  }

  getCurrentPage(offset, sizePerPage) {
    if (offset === 0) return offset + 1;
    return offset / sizePerPage + 1;
  }

  getPageOffset(page, sizePerPage) {
    if (page === 1) return page - 1;
    return (page - 1) * sizePerPage;
  }

  handleDeleteRow() {
    console.log("deleted");
    console.log(
      "this.resource",
      this.state.resource,
      this.state.page,
      this.state.meta
    );
  }

  handlePageChange = async (page, sizePerPage) => {
    this.setState({ isLoading: true });

    const { order, sortBy } = this.state;

    const offset = this.getPageOffset(page, sizePerPage);

    const params = {
      offset,
      order,
      sortBy,
      limit: sizePerPage
    };

    const {
      data: { resource, meta }
    } = await getAllDoctors(params);

    this.setState({ resource: resource, meta: meta, page: page });
    this.setState({ isLoading: false });
  };

  handleCellEdit = async (collection, cell) => {
    const { dataField, newValue, rowId } = cell;

    this.setState({ isLoading: true });

    const rowData = collection.find(element => element.id === rowId);
    rowData[dataField] = newValue;

    const { data } = await updateDoctor(rowData);
    console.log("Update return");
    this.setState({ isLoading: false });
  };

  handleTableSearch = async searchText => {
    this.setState({ isLoading: true });
    try {
      const { sizePerPage, order, sortBy } = this.state;
      let filterParam = "";

      if (searchText) {
        filterParam = `
        (((id CONTAINS ${searchText}) OR (name CONTAINS ${searchText}) OR (providernumber CONTAINS ${searchText}) OR (location CONTAINS ${searchText}) OR (practice CONTAINS ${searchText})))
        `;
      }
      const params = {
        order,
        sortBy,
        limit: sizePerPage,
        offset: 0,
        filter: filterParam
      };

      const {
        data: { resource, meta }
      } = await getAllDoctors(params);
      this.setState({ resource: resource, meta: meta });
    } catch (error) {
      console.log("handleTableSearch | ERROR", error);
    }
    this.setState({ isLoading: false });
  };

  handleTableChange = async (type, newState) => {
    console.log("type", type, newState);
    if (type === "pagination") {
      const { page, sizePerPage } = newState;
      await this.handlePageChange(page, sizePerPage);
    }
    if (type === "cellEdit") {
      const { data, cellEdit } = newState;
      await this.handleCellEdit(data, cellEdit);
    }
    if (type === "search") {
      const { searchText } = newState;
      await this.handleTableSearch(searchText);
    }
  };

  toggle() {
    this.setState(prevState => ({
      actionModal: !prevState.actionModal
    }));
  }

  handleTableClick = (e, row, rowIndex) => {
    console.log("handleTableClick", e, row, rowIndex);
  };

  render() {
    const {
      resource,
      meta,
      order,
      sortBy,
      page,
      sizePerPage,
      isLoading
    } = this.state;

    if (resource.length < 1) {
      return "LOADING...";
    }

    const columns = [
      {
        dataField: "name",
        text: "Name",
        sort: true,
        sortCaret,
        formatter: cell => <span className="text-inverse">{cell}</span>
      },
      {
        dataField: "providernumber",
        text: "Provider Number",
        sort: true,
        sortCaret
      },
      {
        dataField: "location",
        text: "Location",
        sort: true,
        sortCaret
      },
      {
        dataField: "practice",
        text: "Practice",
        sort: true,
        sortCaret
      },
      {
        dataField: "verified",
        text: "Verified",
        sort: true,
        sortCaret
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
        sortCaret
      },
      {
        text: "Edit",
        dataField: "id",
        formatter: cell => (
          <i
            className="fa fa-fw fa-edit"
            style={{ cursor: "pointer" }}
            onClick={this.toggle}
          />
        )
      }
    ];

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
                <h5 className="my-0">Doctors</h5>
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
              <LazyLoad
                // classes="table-responsive"
                bordered={false}
                responsive
                striped
                loading={isLoading}
                totalSize={meta.count}
                page={page}
                sizePerPage={sizePerPage}
                rowEvents={{ onClick: this.handleTableClick }}
                onTableChange={this.handleTableChange}
                overlay={overlayFactory({
                  styles: {
                    overlay: base => ({
                      ...base,
                      background: "rgba(255, 255, 255, 0.5)"
                    })
                  }
                })}
                {...props.baseProps}
              />
              <Modal
                isOpen={this.state.actionModal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>
                    Do Something
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              {/* END Table */}
            </Container>
          </React.Fragment>
        )}
      </ToolkitProvider>
    );
  }
}

export default Doctors;
