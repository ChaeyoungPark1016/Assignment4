import React from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Container, Card, Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <Container>
      {favouritesList.length === 0 ? (
        <Card>
          <Card.Body>
            <Card.Title>Nothing Here</Card.Title>
            <Card.Text>Try searching for some artwork</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {favouritesList.map((objectID) => (
            <Col key={objectID} sm={6} md={4} lg={3}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
