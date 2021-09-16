import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import { getCustomerRepaymentAction } from '../redux/actions/repaymentUploadAction';
import { MessageDialog } from '../components/MessageDialog';

export const RepaymentDetailsView = (props) => {
  const customerRepaymentDetails = useSelector(state => state.customerRepaymentDetails);
  const { loading, data , error } = customerRepaymentDetails;

  const CustomerID = props.match.url && props.match.url.split('/')[2];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data && CustomerID) {
      dispatch(getCustomerRepaymentAction(CustomerID));
    }
  }, [dispatch, data, CustomerID]);


  return loading ? <Spinner /> :
    <>
      <h4 className="title-spacing font-weight-bolder">Repayment Record Details</h4>

      {error && <MessageDialog className="danger">{error.length > 0 && typeof error !== "string" ? error.map(item => item + '\n') : error}</MessageDialog>}

      <Container className="d-flex flex-wrap justify-content-center mb-4">
        {data && data.data.map(item =>
          <Row key={item.RepaymentID} className="p-2">
       
              <h5>Repayment Details</h5>
              <ul className="w-100 list-unstyled">
                <li className="">RepaymentID = {item.RepaymentID}</li>
                <li className="">CustomerID = {item.CustomerID}</li>
                <li className="">Season = {item.SeasonID}</li>
                <li className="">Amount = {Number(item.Amount)}</li>
                <li className="">Date = {new Date(item.Date).toDateString() + ' ' + new Date(item.Date).toLocaleTimeString()}</li>
                <li className="">ParentID = {item.ParentID}</li>  
              </ul>
            
          </Row>
        )}

      </Container>

    </>
}