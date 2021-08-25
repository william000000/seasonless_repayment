import React, { useEffect, useState } from 'react';
import {
  Nav, Navbar, Container, Form, InputGroup
} from 'react-bootstrap';
import logo from '../assets/pay_logo.png';
import { withRouter, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { getCustomerSummariesAction } from '../redux/actions/repaymentUploadAction';

const NavigationBar = (props) => {

  const [searchQuery, setSearchQuery] = useState({})
  const [isSelected, setIsSelected] = useState(false);

  const getCustomerSummaries = useSelector(state => state.getCustomerSummaries);
  const { data } = getCustomerSummaries;

  const dispatch = useDispatch();

  const handleOnSearch = (string, results) => setIsSelected(false);

  const handleOnHover = (result) => { }

  const handleOnSelect = (item) => {
    setSearchQuery(item.CustomerID)
    setIsSelected(true);
  }

  const handleOnFocus = () => { }

  useEffect(() => {
    dispatch(getCustomerSummariesAction());
  }, [dispatch])

  return (
    <>
        {isSelected && <Redirect to={`/repayment/${searchQuery}`} />}

          <Navbar collapseOnSelect expand="lg" variant="light" className="main-nav bg-white" >
            <Container className="nav-container d-flex align-items-center">
              <Navbar.Brand href="/">
                <img src={logo} className="d-inline-block align-top logo" alt="logo" />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" className="searchNavContainer">
                <FontAwesomeIcon icon={faSearch} className="searchIcon" />
              </Navbar.Toggle>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />

              <Navbar.Collapse className="responsive-navbar-nav">

                <Nav className="mx-auto nav-style" activekey="/">
                  <Nav.Link eventkey="/" className="mr-3 navlink" href="/">Home</Nav.Link>
                  <Nav.Link eventkey="/payment" className="navlink" href="/payment">Pay</Nav.Link>
                </Nav>

                <Form inline className="my-sm-3 my-lg-0 search-form">
                  <InputGroup className="d-flex align-items-center flex-nowrap">

                      <div className="search-container">
                        <ReactSearchAutocomplete
                          items={data && data.data}
                          onSearch={handleOnSearch}
                          onHover={handleOnHover}
                          onSelect={handleOnSelect}
                          onFocus={handleOnFocus}
                          showIcon={false}
                          placeholder="Type CustomerID to see more details"
                          autoFocus
                          className="pl-4 searchInputField"
                          fuseOptions={{ keys: ["CustomerID"] }}
                          resultStringKeyName="CustomerID"
                        />
                      </div>

                  </InputGroup>
                </Form>

              </Navbar.Collapse>
            </Container>
          </Navbar>
    </>
  )
}

export const NavWithRouter = withRouter(NavigationBar);
