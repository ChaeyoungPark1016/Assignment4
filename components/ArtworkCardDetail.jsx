import React from "react";
import Card from "react-bootstrap/Card";
import useSWR from "swr";
import Error from "next/error";

function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
    if (error) {
      return <Error statusCode={404} />;
    } 
    else {
      if (!data || data.length === 0) {
        return null;
      } 
      else {
        return (
          <Card className="hero-card" style={{ width: "18rem" }}>
            {data.primaryImageSmall && <Card.Img variant="top" src={data.primaryImage} />}
            <Card.Body>
              {data.title ? (
                <Card.Title className="card-title">{data.title}</Card.Title>
              ) : (
                <Card.Title>N/A</Card.Title>
              )}
              <Card.Text>
                {data.objectDate ? <p><strong>Date:</strong> {data.objectDate}</p> : <p><strong>Date:</strong> N/A</p>}
                {data.classification ? <p><strong>Classification:</strong> {data.classification}</p> : <p><strong>Classification:</strong> N/A</p>}
                {data.medium ? <p><strong>Medium:</strong> {data.medium}</p> : <p><strong>Medium:</strong> N/A</p>}
                <br />
                <br />
                {data.artistDisplayName ? <p><strong>Artist:</strong> {data.artistDisplayName}</p> : <p><strong>Artist:</strong> N/A</p>}
                {data.creditLine ? <p><strong>Credit Line:</strong> {data.creditLine}</p> : <p><strong>Credit Line:</strong> N/A</p>}
                {data.dimensions ? <p><strong>Dimensions:</strong> {data.dimensions}</p> : <p><strong>Dimensions:</strong> N/A</p>}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      }
    }
  }

  export default ArtworkCardDetail;