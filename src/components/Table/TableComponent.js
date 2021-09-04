

import { Header, Table, Container } from "semantic-ui-react";

const TableComponent = ({ data }) => {
  const renderTransactions =
    data &&
    data.map((transaction, index) => (
      <Table.Row key={index}>
        <Table.Cell textAlign="left">{transaction.id}</Table.Cell>
        <Table.Cell singleLine>{transaction.text}</Table.Cell>
      </Table.Row>
    ));

  return (
    <div data-testid='table'>
      {data.length > 0 ? (
        <Container
          textAlign="center"
          style={{ width: "50%", marginTop: "80px" }}
        >
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{renderTransactions}</Table.Body>
          </Table>
        </Container>
      ) : (
        <Header style={{ margin: "10px" }} as="h3">
          There is no transactions.
        </Header>
      )}
    </div>
  );
};

export default TableComponent;
