import React, { useState } from 'react';
import { Navbar, Nav, Form, Container, Button, NavDropdown } from 'react-bootstrap';
import Link from "next/link";
import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";


function MainNav() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsExpanded(false);

    console.log(event);
    router.push(`/artwork?title=true&q=${searchText}`);
    let queryString = `title=true&q=${searchText}`;
    setSearchText("");
    setSearchHistory((current) => [...current, queryString]);
  };

  const updateSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLinkClick = () => {
    setIsExpanded(false);
  };


  return (
    <>
    <Navbar expand="lg" className="bg-dark navbar-dark fixed-top nav-bar">
      <Container>
        <Navbar.Brand>Chaeyoung Park</Navbar.Brand>
        <Navbar.Toggle onClick={handleToggle} aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
          <Link href="/" passHref legacyBehavior>
            <Nav.Link active={router.pathname === "/"} onClick={handleLinkClick}>
            Home
            </Nav.Link>
          </Link>
            <Link href="/search" passHref legacyBehavior>
            <Nav.Link active={router.pathname === "/search"} onClick={handleLinkClick}>
            Advanced Search
            </Nav.Link>
            </Link>
            </Nav>
          {}
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={updateSearchText}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
     
          <Nav>
          <NavDropdown title="User Name" id="basic-nav-dropdown">
            <Link href="/favourites" passHref legacyBehavior>
              <Nav.Link>
              <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)} href="#action/3.1">
                Favourites
                </NavDropdown.Item>
                </Nav.Link>
                </Link>
            <Link href="/history" passHref legacyBehavior>
              <Nav.Link><NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)} href="#action/3.2">
                History
                </NavDropdown.Item>
                </Nav.Link>
                </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br />
    </>
  );
}


  export default MainNav;
