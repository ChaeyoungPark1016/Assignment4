import React, { useState } from "react";
import useSWR from "swr";
import Error from "next/error";

import { Card, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store:";

function ArtworkCardDetail({ objectID }) {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favourites.includes(objectID) ? true : false);

  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

  const favouritesClicked = () => {
    if (showAdded) {
      setFavourites(favourites => favourites.filter(fav => fav !== objectID));
      setShowAdded(false);
    } else {
      setFavourites(favourites => [...favourites, objectID]);
      setShowAdded(true);
    }
  };

  if (error) {
    return <Error statusCode={404} />;
  } else {
    if (!data || data.length === 0) {
      return null;
    } else {
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
            <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          </Card.Body>
        </Card>
      );
    }
  }
}

export default ArtworkCardDetail;
