import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { repaymentUploadAction } from '../redux/actions/repaymentUploadAction';
import { Container, Form, Button } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import { MessageDialog } from '../components/MessageDialog';

export const RepaymentUploadView = (props) => {

  const [CustomerID, setCustomerID] = useState('');
  const [Amount, setAmount] = useState('');
  const [SeasonID, setSeasonID] = useState('');

  const repaymentUpload = useSelector(state => state.repaymentUpload);
  const { loading, error, data } = repaymentUpload;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(repaymentUploadAction({ CustomerID, SeasonID, Amount }));
  };

  useEffect(() => {
    if (data && data.data.length !== 0) {
      props.history.push(`/${data.data[0].id}`);
    }
  }, [dispatch, props.history, data]);


  return loading ? <Spinner /> :
    <>
      <h2 className="title-spacing">Seasonless Payment Portal</h2>

      <Container className="d-flex justify-content-center mb-4">
        <Form onSubmit={submitHandler} className="form rounded ">
          {error && <MessageDialog className="danger">{error.length > 0 && typeof error !== "string" ? error.map(item => item + '\n') : error}</MessageDialog>}

          <Form.Group controlId="CustomerID" className="mb-2">
            <Form.Label>CustomerID</Form.Label>
            <Form.Control type="text" value={CustomerID || ''} placeholder="Enter CustomerID" onChange={(e) => setCustomerID(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="Amount" className="mb-2">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="text" value={Amount || ''} placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="SeasonID" className="mb-2">
            <Form.Label>SeasonID</Form.Label>
            <Form.Control type="text" value={SeasonID || ''} placeholder="Enter SeasonID" onChange={(e) => setSeasonID(e.target.value)} />
          </Form.Group>


          <Button variant="secondary" type="submit" className="font-weight-bold w-100 mt-2">Pay</Button>

        </Form>
      </Container>


    </>
}