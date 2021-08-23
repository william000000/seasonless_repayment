import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import { getCustomerSummariesAction } from '../redux/actions/repaymentUploadAction';
import { MessageDialog } from '../components/MessageDialog';

export const CustomerSummaryView = (props) => {

  const getCustomerSummaries = useSelector(state => state.getCustomerSummaries);
  const { loading, error, data } = getCustomerSummaries;

  const repaymentUpload = useSelector(state => state.repaymentUpload);
  const { data: updatedData } = repaymentUpload;

  const updatedSummaryID = props.match.url && props.match.url.split('/')[1];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(getCustomerSummariesAction());
    }
  }, [dispatch, data]);

  const updatedSummaryData = updatedSummaryID ? updatedData && updatedData.data.find(item => item.id === Number(updatedSummaryID)) : '';

  return loading ? <Spinner /> :
    <>
      <h2 className="title-spacing font-weight-bolder">Welcome to Seasonless Payment App</h2>
      <h4 className="title-spacing font-weight-bolder">Customer Summaries</h4>

      {error && <MessageDialog className="danger">{error.length > 0 && typeof error !== "string" ? error.map(item => item + '\n') : error}</MessageDialog>}

      <Container className="d-flex flex-wrap justify-content-center mb-4">
        {!updatedSummaryData && data && data.data.map((item, index) =>
          <Row key={index} className="p-2">
            <h5>CustomerSummary ({item.overPaid && item.overPaid !== 0 ? `Client is overpaid by ${item.overPaid}` : !item.debt ? `Client is fully repaid for this season` : `Client is owes ${item.debt} for this season`})</h5>
            <ul className="w-100 list-unstyled">
              <li className="">CustomerName = {item.CustomerName}</li>
              <li className="">CustomerID = {item.CustomerID}</li>
              <li className="">Season = {item.SeasonID}</li>
              <li className="">TotalRepaid = {item.TotalRepaid}</li>
              <li className="">TotalCredit = {item.TotalCredit}</li>

            </ul>
          </Row>
        )}

        {updatedData && updatedData.data.map(item => <Row className="p-2">
          <h5>CustomerSummary ({item.overPaid && item.overPaid !== 0 ? `Client is overpaid by ${item.overPaid}` : !item.debt ? `Client is fully repaid for this season` : `Client is owes ${item.debt} for this season`})</h5>
          <ul className="w-100 list-unstyled">
            <li className="">CustomerName = {item.CustomerName}</li>
            <li className="">CustomerID = {item.CustomerID}</li>
            <li className="">Season = {item.SeasonID}</li>
            <li className="">TotalRepaid = {item.TotalRepaid}</li>
            <li className="">TotalCredit = {item.TotalCredit}</li>
          </ul>
        </Row>)}


      </Container>


    </>
}